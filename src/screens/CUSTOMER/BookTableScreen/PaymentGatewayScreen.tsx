import React from "react";
import {
  CustomerStackRoutes,
  CustomerMainBottomTabRoutes,
} from "@constants/routes";
import {StackScreenProps} from "@react-navigation/stack";
import {CompositeScreenProps} from "@react-navigation/native";
import useGetPaymentUrlQuery from "@hooks/useGetPaymentUrlQuery";
import {View, Text, StyleSheet, ActivityIndicator, Modal} from "react-native";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";
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
  })
})();`;

const PaymentGatewayScreen = ({navigation, route}: Props) => {
  const webviewRef = React.useRef<WebView>(null!);
  const [isLoading, setIsLoading] = React.useState(true);

  const {isLoading: isPaymentUrlLoading, data: paymentUrl} =
    useGetPaymentUrlQuery({
      amount: route.params.amount,
      bookingId: route.params.bookingId,
      paymentMethod: route.params.paymentMethod,
    });

  if (isPaymentUrlLoading) {
    return <Text>Loading...</Text>;
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
  }

  function handleMessage(event: WebViewMessageEvent) {
    const payload = event.nativeEvent.data as "success" | "error";

    switch (payload) {
      case "success":
        {
          navigation.navigate(CustomerStackRoutes.CUSTOMER_MAIN_TAB, {
            screen: CustomerMainBottomTabRoutes.HOME,
          });
        }
        break;

      case "error":
        {
          navigation.goBack();
        }
        break;
    }
  }

  return (
    <View style={{flex: 1}}>
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
