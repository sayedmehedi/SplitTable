import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {splitAppTheme} from "@src/theme";
import {StackScreenProps} from "@react-navigation/stack";
import {CustomerAuthStackRoutes} from "@constants/routes";
import AppGradientButton from "@components/AppGradientButton";
import {CompositeScreenProps} from "@react-navigation/native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import {
  CustomerAuthStackParamList,
  CustomerStackParamList,
  RootStackParamList,
} from "@src/navigation";

type Props = CompositeScreenProps<
  CompositeScreenProps<
    StackScreenProps<
      CustomerAuthStackParamList,
      typeof CustomerAuthStackRoutes.EMAIL_VERIFICATION
    >,
    StackScreenProps<CustomerStackParamList>
  >,
  StackScreenProps<RootStackParamList>
>;

const EmailVerificationScreen = ({navigation}: Props) => {
  const handleVerify = () => {
    navigation.navigate(CustomerAuthStackRoutes.LOCATION_ENABLE);
  };

  return (
    <View
      style={{
        height: splitAppTheme.sizes.full,
      }}>
      <View
        style={{
          width: splitAppTheme.sizes.full,
        }}>
        <View
          style={{
            alignItems: "center",
            padding: splitAppTheme.space[7],
            marginTop: splitAppTheme.space[7],
            backgroundColor: splitAppTheme.colors.white,
          }}>
          <Text
            style={{
              color: splitAppTheme.colors.blue[300],
              fontSize: splitAppTheme.fontSizes["2xl"],
              fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
            }}>
            Verification Code
          </Text>

          <Text
            style={{
              color: "#262B2E",
              marginVertical: splitAppTheme.space[2],
              fontSize: splitAppTheme.fontSizes["sm"],
              fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
            }}>
            An authentication code has been sent to
          </Text>

          <Text
            style={{
              color: splitAppTheme.colors.blue[300],
              marginVertical: splitAppTheme.space[2],
              fontSize: splitAppTheme.fontSizes["md"],
              fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
            }}>
            john..@gmail.com
          </Text>

          <OTPInputView
            pinCount={4}
            autoFocusOnLoad
            style={styles.otpInput}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={code => {
              console.log(`Code is $, you are good to go!`);
            }}
          />

          <Text
            style={{
              color: "#262B2E",
              marginVertical: splitAppTheme.space[2],
              fontSize: splitAppTheme.fontSizes["md"],
              fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
            }}>
            I didn't received code{" "}
            <Text
              style={{
                marginVertical: splitAppTheme.space[2],
                fontSize: splitAppTheme.fontSizes["md"],
                color: splitAppTheme.colors.primary[300],
                fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
              }}>
              Resend Code
            </Text>
          </Text>

          <Text
            style={{
              color: splitAppTheme.colors.red[300],
            }}>
            1:20 Sec left
          </Text>
        </View>

        <View
          style={{
            width: splitAppTheme.sizes.full,
          }}>
          <AppGradientButton
            width={"100%"}
            color={"primary"}
            variant={"solid"}
            title={"Verify Now"}
            onPress={handleVerify}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  otpInput: {width: "100%", height: 170, backgroundColor: "white"},
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: splitAppTheme.colors.primary[300],
  },

  underlineStyleBase: {
    width: 60,
    height: 60,
    borderWidth: 0,
    color: splitAppTheme.colors.primary[300],
    borderRadius: 30,
    borderBottomWidth: 1,
    backgroundColor: "#F4F5F7",
  },
  underlineStyleHighLighted: {
    width: 60,
    height: 60,
    borderWidth: 0,
    color: splitAppTheme.colors.primary[300],
    borderRadius: 30,
    borderBottomWidth: 1,
    borderColor: "#03DAC6",
    backgroundColor: "#F4F5F7",
  },
});

export default EmailVerificationScreen;
