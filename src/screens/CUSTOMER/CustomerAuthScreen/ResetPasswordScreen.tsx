import React from "react";
import dayjs from "dayjs";
import {splitAppTheme} from "@src/theme";
import {useTimer} from "react-timer-hook";
import {CustomerAuthStackRoutes} from "@constants/routes";
import {StackScreenProps} from "@react-navigation/stack";
import AppGradientButton from "@components/AppGradientButton";
import {CompositeScreenProps} from "@react-navigation/native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import {StyleSheet, Text, View, TextInput} from "react-native";
import {
  RootStackParamList,
  CustomerStackParamList,
  CustomerAuthStackParamList,
} from "@src/navigation";
import useAppToast from "@hooks/useAppToast";
import {Controller, useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {isResponseResultError} from "@utils/error-handling";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import useResetPasswordMutation from "@hooks/auth/useResetPasswordMutation";

type Props = CompositeScreenProps<
  CompositeScreenProps<
    StackScreenProps<
      CustomerAuthStackParamList,
      typeof CustomerAuthStackRoutes.RESET_PASSWORD
    >,
    StackScreenProps<CustomerStackParamList>
  >,
  StackScreenProps<RootStackParamList>
>;

const ResetPasswordScreen = ({navigation, route}: Props) => {
  const toast = useAppToast();

  const {
    mutate: resetPassword,
    isLoading: isSendingReq,
    data: fotgotPasswordResponse,
    error: sendReqError,
  } = useResetPasswordMutation();
  useHandleNonFieldError(sendReqError);
  useHandleResponseResultError(fotgotPasswordResponse);

  const {control, handleSubmit, setValue} = useForm({
    defaultValues: {
      otp: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  React.useEffect(() => {
    setValue("email", route.params.email);
  }, [route.params.email, setValue]);

  const handleVerify = handleSubmit(values => {
    resetPassword(values, {
      onSuccess(data) {
        if (!isResponseResultError(data)) {
          toast.success(data.success);
          navigation.navigate(CustomerAuthStackRoutes.SIGNIN);
        }
      },
    });
  });

  return (
    <View
      style={{
        padding: splitAppTheme.space[6],
        height: splitAppTheme.sizes.full,
        backgroundColor: splitAppTheme.colors.white,
      }}>
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

          <Controller
            name={"otp"}
            control={control}
            rules={{
              required: "This field is required",
            }}
            render={({field, formState: {errors}}) => (
              <React.Fragment>
                <OTPInputView
                  pinCount={4}
                  code={field.value}
                  autoFocusOnLoad
                  style={styles.otpInput}
                  onCodeChanged={field.onChange}
                  codeInputFieldStyle={styles.underlineStyleBase}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted}
                />

                <ErrorMessage
                  errors={errors}
                  name={field.name}
                  render={({message}) => (
                    <Text
                      style={{
                        color: splitAppTheme.colors.red[300],
                        marginTop: 5,
                      }}>
                      {message}
                    </Text>
                  )}
                />
              </React.Fragment>
            )}
          />
        </View>

        <Controller
          name={"password"}
          rules={{
            required: "This field is required",
          }}
          control={control}
          render={({field, formState: {errors}}) => (
            <React.Fragment>
              <View>
                <TextInput
                  secureTextEntry
                  placeholder="Password"
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  style={{flex: 1, paddingLeft: 20}}
                />
              </View>

              <ErrorMessage
                errors={errors}
                name={field.name}
                render={({message}) => (
                  <Text
                    style={{
                      color: splitAppTheme.colors.red[300],
                      marginTop: 5,
                    }}>
                    {message}
                  </Text>
                )}
              />
            </React.Fragment>
          )}
        />

        <Controller
          control={control}
          name={"password_confirmation"}
          rules={{
            required: "This field is required",
          }}
          render={({field, formState: {errors}}) => (
            <React.Fragment>
              <View>
                <TextInput
                  secureTextEntry
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  placeholder="Confirm Password"
                  style={{flex: 1, paddingLeft: 20}}
                />
              </View>

              <ErrorMessage
                errors={errors}
                name={field.name}
                render={({message}) => (
                  <Text
                    style={{
                      color: splitAppTheme.colors.red[300],
                      marginTop: 5,
                    }}>
                    {message}
                  </Text>
                )}
              />
            </React.Fragment>
          )}
        />

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
            touchableOpacityProps={{
              disabled: isSendingReq,
            }}
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
    color: splitAppTheme.colors.primary[300],
  },
  underlineStyleHighLighted: {
    width: 60,
    height: 60,
    borderWidth: 0,
    borderRadius: 30,
    borderBottomWidth: 1,
    borderColor: "#03DAC6",
    backgroundColor: "#F4F5F7",
    color: splitAppTheme.colors.primary[300],
  },
});

export default ResetPasswordScreen;
