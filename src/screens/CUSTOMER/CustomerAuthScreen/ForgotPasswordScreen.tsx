import React from "react";
import {splitAppTheme} from "@src/theme";
import {CustomerAuthStackRoutes} from "@constants/routes";
import {StackScreenProps} from "@react-navigation/stack";
import AppGradientButton from "@components/AppGradientButton";
import {CompositeScreenProps} from "@react-navigation/native";
import {StyleSheet, Text, View, TextInput, StatusBar} from "react-native";
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
import useForgotPasswordMutation from "@hooks/auth/useForgotPasswordMutation";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";

type Props = CompositeScreenProps<
  CompositeScreenProps<
    StackScreenProps<
      CustomerAuthStackParamList,
      typeof CustomerAuthStackRoutes.FORGOT_PASSWORD
    >,
    StackScreenProps<CustomerStackParamList>
  >,
  StackScreenProps<RootStackParamList>
>;

const ForgotPasswordScreen = ({navigation, route}: Props) => {
  const toast = useAppToast();

  const {
    mutate: fotgotPassword,
    isLoading: isSendingReq,
    data: fotgotPasswordResponse,
    error: sendReqError,
  } = useForgotPasswordMutation();
  useHandleNonFieldError(sendReqError);
  useHandleResponseResultError(fotgotPasswordResponse);

  const {control, handleSubmit} = useForm({
    defaultValues: {
      email: "",
    },
  });

  const handleVerify = handleSubmit(({email}) => {
    fotgotPassword(email, {
      onSuccess(data) {
        if (!isResponseResultError(data)) {
          toast.success(data.success);
          navigation.navigate(CustomerAuthStackRoutes.RESET_PASSWORD, {
            email,
          });
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
      <FocusAwareStatusBar
      // barStyle={"dark-content"}
      // backgroundColor={splitAppTheme.colors.white}
      />
      <View
        style={{
          width: splitAppTheme.sizes.full,
        }}>
        <View style={{alignItems: "center"}}>
          <Text
            style={{
              fontFamily: splitAppTheme.fontConfig.Roboto[400].normal,
              fontSize: splitAppTheme.fontSizes.md,
            }}>
            We will send a mail to
          </Text>
          <Text
            style={{
              fontFamily: splitAppTheme.fontConfig.Roboto[400].normal,
              fontSize: splitAppTheme.fontSizes.md,
            }}>
            the email address you registered
          </Text>
          <Text
            style={{
              fontFamily: splitAppTheme.fontConfig.Roboto[400].normal,
              fontSize: splitAppTheme.fontSizes.md,
            }}>
            to regain your password
          </Text>
        </View>

        <View
          style={{
            alignItems: "center",
            marginVertical: splitAppTheme.space[4],
          }}>
          <Controller
            name={"email"}
            control={control}
            rules={{
              required: "This field is required",
            }}
            render={({field, formState: {errors}}) => (
              <React.Fragment>
                <TextInput
                  onBlur={field.onBlur}
                  style={{
                    padding: splitAppTheme.space[4],
                    width: splitAppTheme.sizes.full,
                    borderTopRightRadius: splitAppTheme.radii.lg,
                    backgroundColor: splitAppTheme.colors.gray[100],
                    borderBottomRightRadius: splitAppTheme.radii.lg,
                  }}
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder={"Email Address"}
                  keyboardType={"email-address"}
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

        <View
          style={{
            width: splitAppTheme.sizes.full,
          }}>
          <AppGradientButton
            width={"100%"}
            title={"Send"}
            color={"primary"}
            variant={"solid"}
            touchableOpacityProps={{
              disabled: isSendingReq,
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

export default ForgotPasswordScreen;
