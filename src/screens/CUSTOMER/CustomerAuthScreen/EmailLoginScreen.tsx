import React from "react";
import useAppToast from "@hooks/useAppToast";
import {ErrorMessage} from "@hookform/error-message";
import {Controller, useForm} from "react-hook-form";
import Entypo from "react-native-vector-icons/Entypo";
import {StackScreenProps} from "@react-navigation/stack";
import {CustomerAuthStackRoutes} from "@constants/routes";
import useLoginMutation from "@hooks/auth/useLoginMutation";
import AppGradientButton from "@components/AppGradientButton";
import {CompositeScreenProps} from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {addServerErrors, isResponseResultError} from "@utils/error-handling";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import {
  RootStackParamList,
  CustomerStackParamList,
  CustomerAuthStackParamList,
} from "@src/navigation";
import {splitAppTheme} from "@src/theme";
import {Text, TextInput, View} from "react-native";
import useAddAuthDataMutation from "@hooks/useAddAuthDataMutation";

type Props = CompositeScreenProps<
  CompositeScreenProps<
    StackScreenProps<
      CustomerAuthStackParamList,
      typeof CustomerAuthStackRoutes.SIGNIN
    >,
    StackScreenProps<CustomerStackParamList>
  >,
  StackScreenProps<RootStackParamList>
>;

const EmailLoginScreen = ({navigation}: Props) => {
  const toast = useAppToast();
  const {mutate: setAuthData} = useAddAuthDataMutation();

  const {control, handleSubmit, setError} = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    mutate: login,
    error: loginError,
    data: loginResponse,
    isError: isLoginError,
    isLoading: isLoggingIn,
  } = useLoginMutation();

  useHandleNonFieldError(loginError);
  useHandleResponseResultError(loginResponse);

  React.useEffect(() => {
    if (isLoginError) {
      addServerErrors(loginError.field_errors, setError);
    }
  }, [isLoginError, loginError, setError]);

  const handleSignin = handleSubmit(values => {
    login(values, {
      onSuccess(data) {
        if (!isResponseResultError(data)) {
          setAuthData(data.user, {
            onSuccess() {
              toast.success(data.success);
            },
          });
        }
      },
    });
  });

  return (
    <View
      style={{
        height: splitAppTheme.sizes.full,
      }}>
      <View style={{flex: 1}} />

      <View
        style={{
          paddingHorizontal: splitAppTheme.space[6],
        }}>
        <View>
          <View>
            <View
              style={{
                marginBottom: splitAppTheme.space["3.5"],
              }}>
              <Text
                style={{
                  textAlign: "center",
                  color: splitAppTheme.colors.blue[300],
                  fontSize: splitAppTheme.fontSizes["2xl"],
                  fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                }}>
                Login
              </Text>

              <Text
                style={{
                  color: "#262B2E",
                  textAlign: "center",
                  fontSize: splitAppTheme.fontSizes.lg,
                  marginVertical: splitAppTheme.space[1],
                  fontFamily: splitAppTheme.fontConfig.Roboto[400].normal,
                }}>
                With your email address
              </Text>
            </View>

            <View
              style={{
                width: splitAppTheme.sizes.full,
              }}>
              <Controller
                name={"email"}
                rules={{
                  required: "This field is required",
                }}
                control={control}
                render={({field, formState: {errors}}) => (
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: splitAppTheme.sizes.full,
                        borderRadius: splitAppTheme.radii.lg,
                        borderColor: splitAppTheme.colors.red[300],
                        borderWidth: !!errors.email
                          ? splitAppTheme.sizes[1]
                          : 0,
                      }}>
                      <View
                        style={{
                          paddingLeft: splitAppTheme.space[2],
                          borderTopLeftRadius: splitAppTheme.radii.lg,
                          borderBottomLeftRadius: splitAppTheme.radii.lg,
                          backgroundColor: splitAppTheme.colors.gray[100],
                        }}>
                        <Entypo size={30} name={"mail"} color={"black"} />
                      </View>

                      <View
                        style={{
                          flex: 1,
                        }}>
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
                          keyboardType={"email-address"}
                          placeholder={"Enter Your Name Here"}
                        />
                      </View>
                    </View>

                    <ErrorMessage
                      errors={errors}
                      name={"email"}
                      render={({message}) => {
                        return (
                          <Text
                            style={{
                              color: splitAppTheme.colors.red[300],
                              paddingVertical: splitAppTheme.space[1],
                            }}>
                            {message}
                          </Text>
                        );
                      }}
                    />
                  </View>
                )}
              />

              <Controller
                name={"password"}
                rules={{
                  required: "This field is required",
                }}
                control={control}
                render={({field, formState: {errors}}) => (
                  <View
                    style={{
                      marginTop: splitAppTheme.space[4],
                    }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: splitAppTheme.sizes.full,
                        borderRadius: splitAppTheme.radii.lg,
                        borderColor: splitAppTheme.colors.red[300],
                        borderWidth: !!errors.password
                          ? splitAppTheme.sizes[1]
                          : 0,
                      }}>
                      <View
                        style={{
                          paddingLeft: splitAppTheme.space[2],
                          borderTopLeftRadius: splitAppTheme.radii.lg,
                          borderBottomLeftRadius: splitAppTheme.radii.lg,
                          backgroundColor: splitAppTheme.colors.gray[100],
                        }}>
                        <FontAwesome5 size={30} name={"lock"} color={"black"} />
                      </View>

                      <View
                        style={{
                          flex: 1,
                        }}>
                        <TextInput
                          onBlur={field.onBlur}
                          style={{
                            padding: splitAppTheme.space[4],
                            width: splitAppTheme.sizes.full,
                            borderTopRightRadius: splitAppTheme.radii.lg,
                            borderBottomRightRadius: splitAppTheme.radii.lg,
                            backgroundColor: splitAppTheme.colors.gray[100],
                          }}
                          secureTextEntry
                          value={field.value}
                          placeholder={"Password"}
                          onChangeText={field.onChange}
                          underlineColorAndroid={"transparent"}
                        />
                      </View>
                    </View>

                    <ErrorMessage
                      errors={errors}
                      name={"password"}
                      render={({message}) => {
                        return (
                          <Text
                            style={{
                              color: splitAppTheme.colors.red[300],
                              paddingVertical: splitAppTheme.space[1],
                            }}>
                            {message}
                          </Text>
                        );
                      }}
                    />
                  </View>
                )}
              />
            </View>

            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                width: splitAppTheme.sizes.full,
                marginVertical: splitAppTheme.space[4],
                paddingHorizontal: splitAppTheme.space[2],
              }}>
              {/* <CheckView value={"one"} fontFamily={"Satoshi-Regular"}>
                Remember me
              </CheckView> */}

              <Text
                style={{
                  fontSize: splitAppTheme.fontSizes.md,
                  color: splitAppTheme.colors.primary[300],
                }}>
                Forget password?
              </Text>
            </View>

            <AppGradientButton
              width={"100%"}
              color={"primary"}
              variant={"solid"}
              title={"Sign in"}
              onPress={handleSignin}
              touchableOpacityProps={{
                disabled: isLoggingIn,
              }}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 1,
        }}
      />

      <Text
        style={{
          textAlign: "center",
          marginBottom: splitAppTheme.space[5],
          fontSize: splitAppTheme.fontSizes.md,
          color: splitAppTheme.colors.primary[300],
        }}>
        Don't have an account?{" "}
        <Text
          style={{
            color: splitAppTheme.colors.primary[300],
          }}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

export default EmailLoginScreen;
