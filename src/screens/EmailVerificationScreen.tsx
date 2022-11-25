import React from "react";
import dayjs from "dayjs";
import {splitAppTheme} from "@src/theme";
import {useTimer} from "react-timer-hook";
import useAppToast from "@hooks/useAppToast";
import {RootStackRoutes} from "@constants/routes";
import {RootStackParamList} from "@src/navigation";
import {StackScreenProps} from "@react-navigation/stack";
import {isResponseResultError} from "@utils/error-handling";
import AppGradientButton from "@components/AppGradientButton";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import useVerifyEmailMutation from "@hooks/auth/useVerifyEmailMutation";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import useResendEmailVerificationCodeMutation from "@hooks/auth/useResendEmailVerificationCodeMutation";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";

type Props = StackScreenProps<
  RootStackParamList,
  typeof RootStackRoutes.EMAIL_VERIFICATION
>;

const EmailVerificationScreen = ({navigation, route}: Props) => {
  const [otpCode, setOtpCode] = React.useState("");
  const toast = useAppToast();
  const {minutes, seconds, isRunning, restart} = useTimer({
    expiryTimestamp: dayjs().add(1, "minute").add(20, "seconds").toDate(),
  });

  const {
    error: resendError,
    data: resendResponse,
    mutate: resendEmailVerificationCode,
    isLoading: isResendingEmailVerificationCode,
  } = useResendEmailVerificationCodeMutation({
    onSuccess(data) {
      if (!isResponseResultError(data)) {
        toast.success(data.success);
        restart(dayjs().add(1, "minute").add(20, "seconds").toDate(), true);
      }
    },
  });
  useHandleNonFieldError(resendError);
  useHandleResponseResultError(resendResponse);

  const {
    mutate: verifyEmail,
    error: verifyError,
    data: verifyResponse,
    isLoading: isVerifying,
  } = useVerifyEmailMutation();
  useHandleNonFieldError(verifyError);
  useHandleResponseResultError(verifyResponse);

  const handleVerify = () => {
    if (otpCode === "") {
      toast.error("Please insert otp");
      return;
    }

    verifyEmail(
      {
        otp: otpCode,
        email: route.params.email,
      },
      {
        onSuccess(data) {
          if (!isResponseResultError(data)) {
            toast.success(data.success);
            navigation.navigate(RootStackRoutes.SIGNIN);
          }
        },
      },
    );
  };

  return (
    <View
      style={{
        padding: splitAppTheme.space[6],
        height: splitAppTheme.sizes.full,
        backgroundColor: splitAppTheme.colors.white,
      }}>
      <FocusAwareStatusBar
        barStyle={"dark-content"}
        backgroundColor={splitAppTheme.colors.white}
      />
      <View
        style={{
          width: splitAppTheme.sizes.full,
        }}>
        <View
          style={{
            alignItems: "center",
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
            {route.params.email}
          </Text>

          <OTPInputView
            pinCount={4}
            code={otpCode}
            autoFocusOnLoad
            editable={isRunning}
            style={styles.otpInput}
            onCodeChanged={setOtpCode}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginVertical: splitAppTheme.space[2],
            }}>
            <Text
              style={{
                color: "#262B2E",
                fontSize: splitAppTheme.fontSizes["md"],
                fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
              }}>
              I didn't received code{" "}
            </Text>

            <TouchableOpacity
              disabled={isResendingEmailVerificationCode}
              onPress={() => {
                resendEmailVerificationCode({
                  email: route.params.email,
                });
              }}>
              <Text
                style={{
                  fontSize: splitAppTheme.fontSizes["md"],
                  color: splitAppTheme.colors.primary[300],
                  fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                }}>
                Resend Code
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              color: splitAppTheme.colors.red[300],
            }}>
            {minutes}:{seconds} Sec left
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
            touchableOpacityProps={{
              disabled: !isRunning || isVerifying,
            }}
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
    borderRadius: 30,
    borderBottomWidth: 1,
    backgroundColor: "#F4F5F7",
    fontSize: splitAppTheme.fontSizes.xl,
    color: splitAppTheme.colors.primary[300],
    fontFamily: splitAppTheme.fontConfig.Roboto[700].normal,
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
