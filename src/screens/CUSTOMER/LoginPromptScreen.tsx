import React from "react";
import {splitAppTheme} from "@src/theme";
import useAppToast from "@hooks/useAppToast";
import Feather from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";
import {StackScreenProps} from "@react-navigation/stack";
import AntDesign from "react-native-vector-icons/AntDesign";
import {isResponseResultError} from "@utils/error-handling";
import {CompositeScreenProps} from "@react-navigation/native";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import useAddAuthDataMutation from "@hooks/useAddAuthDataMutation";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";
import {CustomerStackRoutes, RootStackRoutes} from "@constants/routes";
import useGoogleLoginMutation from "@hooks/auth/useGoogleLoginMutation";
import {RootStackParamList, CustomerStackParamList} from "@src/navigation";
import useFacobookLoginMutation from "@hooks/auth/useFacobookLoginMutation";
import {Image, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import FastImage from "react-native-fast-image";

type Props = StackScreenProps<
  RootStackParamList,
  typeof RootStackRoutes.CUSTOMER_LOGIN_PROMPT
>;

const LoginPromptScreen = ({navigation}: Props) => {
  const toast = useAppToast();
  const handleEmailLogin = () => {
    navigation.navigate(RootStackRoutes.SIGNIN);
  };
  const {mutate: setAuthData} = useAddAuthDataMutation();

  const {
    error: fbError,
    data: fbLoginResponse,
    mutate: facebookLogin,
    isLoading: isLogginWithFb,
  } = useFacobookLoginMutation({
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
  useHandleNonFieldError(fbError);
  useHandleResponseResultError(fbLoginResponse);

  const {
    error: gglError,
    data: gglLoginResponse,
    mutate: googleLogin,
    isLoading: isLogginWithGgl,
  } = useGoogleLoginMutation({
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
  useHandleNonFieldError(gglError);
  useHandleResponseResultError(gglLoginResponse);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <FocusAwareStatusBar translucent backgroundColor="transparent" />

      <LinearGradient
        style={{
          flex: 1,
          alignItems: "center",
          paddingBottom: splitAppTheme.space[20],
        }}
        end={{x: 0, y: 0}}
        start={{x: 0, y: 1}}
        colors={["#DF3BC0", "#472BBE"]}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}>
          <FastImage
            style={{
              width: 160,
              height: 100,
            }}
            source={require("@assets/logo-white.png")}
          />
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "space-around",
            width: splitAppTheme.sizes.full,
            paddingHorizontal: splitAppTheme.space[6],
          }}>
          <View
            style={{
              marginBottom: splitAppTheme.space[5],
            }}>
            <Text
              style={{
                fontSize: 22,
                color: splitAppTheme.colors.white,
                fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
              }}>
              Welcome!
            </Text>
          </View>

          <View
            style={{
              width: splitAppTheme.sizes.full,
              marginBottom: splitAppTheme.space[2],
            }}>
            <View>
              <TouchableOpacity
                disabled={isLogginWithFb || isLogginWithGgl}
                style={{
                  padding: splitAppTheme.space[4],
                  width: splitAppTheme.sizes.full,
                  borderRadius: splitAppTheme.radii.lg,
                  borderColor: splitAppTheme.colors.white,
                  borderWidth: splitAppTheme.borderWidths[2],
                }}
                onPress={handleEmailLogin}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: splitAppTheme.fontSizes.lg,
                    color: splitAppTheme.colors.white,
                    fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                  }}>
                  Continue with email
                </Text>
              </TouchableOpacity>
            </View>

            {/* <View
              style={{
                marginTop: splitAppTheme.space[4],
              }}>
              <TouchableOpacity
                disabled={isLogginWithFb || isLogginWithGgl}
                style={{
                  padding: splitAppTheme.space[4],
                  width: splitAppTheme.sizes.full,
                  borderRadius: splitAppTheme.radii.lg,
                  backgroundColor: "rgba(255,255,255, 0.3)",
                }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: splitAppTheme.fontSizes.lg,
                    color: splitAppTheme.colors.white,
                    fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                  }}>
                  Continue with Phone Number
                </Text>
              </TouchableOpacity>
            </View> */}
          </View>

          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              marginVertical: splitAppTheme.space[5],
            }}>
            <View
              style={{
                height: 1,
                width: 100,
                backgroundColor: splitAppTheme.colors.white,
              }}
            />

            <Text
              style={{
                color: splitAppTheme.colors.white,
                marginHorizontal: splitAppTheme.space[5],
              }}>
              OR
            </Text>

            <View
              style={{
                height: 1,
                width: 100,
                backgroundColor: splitAppTheme.colors.white,
              }}
            />
          </View>

          <View
            style={{
              alignItems: "center",
            }}>
            <View
              style={{
                flexDirection: "row",
              }}>
              <TouchableOpacity
                disabled={isLogginWithFb || isLogginWithGgl}
                onPress={() => facebookLogin()}
                style={{
                  width: 50,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: splitAppTheme.radii.full,
                  backgroundColor: splitAppTheme.colors.white,
                }}>
                <Feather
                  size={30}
                  name={"facebook"}
                  color={splitAppTheme.colors.primary[300]}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => googleLogin()}
                disabled={isLogginWithFb || isLogginWithGgl}
                style={{
                  width: 50,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: splitAppTheme.radii.full,
                  marginHorizontal: splitAppTheme.space[5],
                  backgroundColor: splitAppTheme.colors.white,
                }}>
                <AntDesign
                  size={30}
                  name={"google"}
                  color={splitAppTheme.colors.primary[300]}
                />
              </TouchableOpacity>

              <TouchableOpacity
                disabled={isLogginWithFb || isLogginWithGgl}
                style={{
                  width: 50,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: splitAppTheme.radii.full,
                  backgroundColor: splitAppTheme.colors.white,
                }}>
                <Feather
                  size={30}
                  name={"instagram"}
                  color={splitAppTheme.colors.primary[300]}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: splitAppTheme.space[10],
              }}>
              <View>
                <Text
                  style={{
                    color: splitAppTheme.colors.white,
                    fontSize: splitAppTheme.fontSizes.lg,
                    fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
                  }}>
                  Don't have an account?{" "}
                </Text>
              </View>

              <View>
                <TouchableOpacity
                  disabled={isLogginWithFb || isLogginWithGgl}
                  onPress={() => {
                    navigation.navigate(RootStackRoutes.SIGNUP);
                  }}>
                  <Text
                    style={{
                      textDecorationLine: "underline",
                      color: splitAppTheme.colors.white,
                      fontSize: splitAppTheme.fontSizes.lg,
                      fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                    }}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingBottom: 20,
    alignItems: "center",
  },
});

export default LoginPromptScreen;
