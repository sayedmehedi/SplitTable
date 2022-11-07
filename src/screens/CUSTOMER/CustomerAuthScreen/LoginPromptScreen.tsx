import {CustomerAuthStackRoutes} from "@constants/routes";
import {useDimensions} from "@react-native-community/hooks";
import {CompositeScreenProps} from "@react-navigation/native";
import {StackScreenProps} from "@react-navigation/stack";
import React from "react";
import {
  Image,
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";

import {
  CustomerAuthStackParamList,
  CustomerStackParamList,
  RootStackParamList,
} from "@src/navigation";
import {splitAppTheme} from "@src/theme";

type Props = CompositeScreenProps<
  CompositeScreenProps<
    StackScreenProps<
      CustomerAuthStackParamList,
      typeof CustomerAuthStackRoutes.LOGIN_PROMPT
    >,
    StackScreenProps<CustomerStackParamList>
  >,
  StackScreenProps<RootStackParamList>
>;

const LoginPromptScreen = ({navigation}: Props) => {
  const {
    window: {width},
  } = useDimensions();

  const handleEmailLogin = () => {
    navigation.navigate(CustomerAuthStackRoutes.SIGNIN);
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" />

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
          <Image
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
            }}>
            <View>
              <TouchableOpacity
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

            <View
              style={{
                marginTop: splitAppTheme.space[4],
              }}>
              <TouchableOpacity
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
            </View>
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
                marginTop: splitAppTheme.space[10],
              }}>
              <Text
                style={{
                  color: splitAppTheme.colors.white,
                  fontSize: splitAppTheme.fontSizes.lg,
                  fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
                }}>
                Don't have an account?{" "}
                <Text
                  style={{
                    textDecorationLine: "underline",
                    color: splitAppTheme.colors.white,
                    fontSize: splitAppTheme.fontSizes.lg,
                    fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                  }}>
                  Sign Up
                </Text>
              </Text>
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
