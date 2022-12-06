import React from "react";
import {
  CustomerStackRoutes,
  CustomerMainBottomTabRoutes,
} from "@constants/routes";
import {splitAppTheme} from "@src/theme";
import {QueryKeys} from "@constants/query-keys";
import {useQueryClient} from "@tanstack/react-query";
import {StackScreenProps} from "@react-navigation/stack";
import {CompositeScreenProps} from "@react-navigation/native";
import useGetPaymentUrlQuery from "@hooks/useGetPaymentUrlQuery";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";
import {
  View,
  Modal,
  Keyboard,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import WebView, {
  WebViewNavigation,
  WebViewMessageEvent,
} from "react-native-webview";

type Props = CompositeScreenProps<
  StackScreenProps<
    CustomerStackParamList,
    typeof CustomerStackRoutes.PAYMENT_GATEWAY
  >,
  StackScreenProps<RootStackParamList>
>;

const INJECTED_JAVASCRIPT = `(function() {
  const okButton = document.querySelector(".sc-ok");
  
  okButton.addEventListener("click", () => {
    window.ReactNativeWebView.postMessage("success")
  });

 
})();`;

const PaymentGatewayScreen = ({navigation, route}: Props) => {
  const queryClient = useQueryClient();
  const webviewRef = React.useRef<WebView>(null!);
  const [isLoading, setIsLoading] = React.useState(true);

  const {isLoading: isPaymentUrlLoading, data: paymentUrl} =
    useGetPaymentUrlQuery({
      amount: route.params.amount,
      bookingId: route.params.bookingId,
      paymentMethod: route.params.paymentMethod,
    });

  if (isPaymentUrlLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <ActivityIndicator size={"small"} />
      </View>
    );
  }

  function handleWebViewNavigationStateChange(newNavState: WebViewNavigation) {
    // newNavState looks something like this:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }
    const {title} = newNavState;

    const titleLowercase = title.toLowerCase();

    // if (titleLowercase.includes("success")) {
    //   webviewRef.current.injectJavaScript(`
    //     const okButton = document.querySelector(".sc-ok");

    //     okButton.addEventListener("click", () => {
    //       window.ReactNativeWebView.postMessage("success")
    //     })
    //   `);
    // }

    if (titleLowercase.includes("error payment")) {
      webviewRef.current.injectJavaScript(`
        const errorButton = document.querySelector(".sc-error");
      
        errorButton.addEventListener("click", () => {
          window.ReactNativeWebView.postMessage("error")
        })
      `);
    }

    if (titleLowercase.includes("payment")) {
      webviewRef.current.injectJavaScript(`
        const proceedBtn = document.querySelector(".btn.btn-primary");

        
        proceedBtn.addEventListener("click", () => {
          window.ReactNativeWebView.postMessage("proceed")
        });
      `);
    }
  }

  async function handleMessage(event: WebViewMessageEvent) {
    const payload = event.nativeEvent.data as "success" | "error" | "proceed";

    switch (payload) {
      case "success":
        {
          await queryClient.invalidateQueries([QueryKeys.BOOKING]);
          navigation.replace(CustomerStackRoutes.CUSTOMER_MAIN_TAB, {
            screen: CustomerMainBottomTabRoutes.HOME,
          });
        }
        break;

      case "error":
        {
          navigation.goBack();
        }
        break;

      case "proceed":
        {
          // console.log("closing keyboard");
          Keyboard.dismiss();
        }
        break;
    }
  }

  return (
    <View style={{flex: 1}}>
      <FocusAwareStatusBar
        barStyle={"dark-content"}
        backgroundColor={splitAppTheme.colors.white}
      />

      <Modal transparent visible={isPaymentUrlLoading || isLoading}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,00.5)",
          }}>
          <ActivityIndicator size={"small"} />
        </View>
      </Modal>

      {!!paymentUrl && (
        <WebView
          ref={webviewRef}
          source={{uri: paymentUrl}}
          onMessage={handleMessage}
          onLoadEnd={() => {
            setIsLoading(false);
          }}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          onNavigationStateChange={handleWebViewNavigationStateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  paymentContainer: {
    height: 50,
    padding: 10,
    width: "100%",
    borderRadius: 8,
    marginVertical: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(247,247,247,0.9)",
  },
});

export default PaymentGatewayScreen;
