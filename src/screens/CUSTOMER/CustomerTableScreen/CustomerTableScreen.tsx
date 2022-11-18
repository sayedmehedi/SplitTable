import React from "react";
import {splitAppTheme} from "@src/theme";
import {useTime} from "react-timer-hook";
import {
  BookTableIcon,
  JoinTableIcon,
  MapIcon,
  SplitTableIcon,
} from "@constants/iconPath";
import {
  RootStackRoutes,
  CustomerStackRoutes,
  CustomerMainBottomTabRoutes,
} from "@constants/routes";
import {AppTableListTypes} from "@constants/table";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import {StackScreenProps} from "@react-navigation/stack";
import LinearGradient from "react-native-linear-gradient";
import {useDimensions} from "@react-native-community/hooks";
import useGetAuthDataQuery from "@hooks/useGetAuthDataQuery";
import {CompositeScreenProps} from "@react-navigation/native";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  RootStackParamList,
  CustomerStackParamList,
  CustomerBottomTabParamList,
} from "@src/navigation";

type Props = CompositeScreenProps<
  CompositeScreenProps<
    BottomTabScreenProps<
      CustomerBottomTabParamList,
      typeof CustomerMainBottomTabRoutes.TABLE_SCREEN
    >,
    StackScreenProps<CustomerStackParamList>
  >,
  StackScreenProps<RootStackParamList>
>;

const CustomerTableScreen = ({navigation}: Props) => {
  const {hours} = useTime({format: "12-hour"});
  const {data: authData} = useGetAuthDataQuery();
  const {
    window: {height: WINDOW_HEIGHT},
  } = useDimensions();

  const handleGotoNotifications = () => {
    navigation.navigate(RootStackRoutes.NOTIFICATIONS);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar
        translucent={false}
        barStyle={"light-content"}
        backgroundColor={splitAppTheme.colors.secondary[600]}
      />

      <View>
        <LinearGradient
          end={{x: 0, y: 0}}
          start={{x: 0, y: 1}}
          style={{
            height: WINDOW_HEIGHT * 0.25,
          }}
          colors={["#DF3BC0", "#472BBE"]}>
          <SafeAreaView>
            <View
              style={{
                justifyContent: "flex-end",
                height: splitAppTheme.sizes.full,
                paddingVertical: splitAppTheme.space[2],
              }}>
              <View
                style={{
                  width: splitAppTheme.sizes.full,
                  marginBottom: splitAppTheme.space[1],
                  paddingHorizontal: splitAppTheme.space[6],
                }}>
                <View
                  style={{
                    width: splitAppTheme.sizes.full,
                  }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}>
                    <View>
                      <Text
                        style={{
                          color: splitAppTheme.colors.white,
                          fontSize: splitAppTheme.fontSizes.xl,
                          fontFamily:
                            splitAppTheme.fontConfig.Sathoshi[700].normal,
                        }}>
                        Good{" "}
                        {hours < 12
                          ? "Morning"
                          : hours < 18
                          ? "Afternoon"
                          : "Evening"}
                        !
                      </Text>

                      <Text
                        style={{
                          color: splitAppTheme.colors.white,
                          fontSize: splitAppTheme.fontSizes.md,
                          marginTop: splitAppTheme.space["0.5"],
                          fontFamily:
                            splitAppTheme.fontConfig.Sathoshi[700].normal,
                        }}>
                        {authData?.name}
                      </Text>
                    </View>

                    <View>
                      <TouchableOpacity
                        style={{
                          padding: splitAppTheme.space[1],
                          borderRadius: splitAppTheme.radii.full,
                          backgroundColor: "rgba(255,255,255,0.2)",
                        }}
                        onPress={handleGotoNotifications}>
                        <MaterialIcons
                          size={30}
                          color={"white"}
                          name={"notifications-none"}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      marginVertical: splitAppTheme.space["0.5"],
                    }}>
                    <TouchableOpacity
                      style={{
                        height: 50,
                        width: "100%",
                        borderRadius: 8,
                        paddingLeft: 15,
                        marginVertical: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: splitAppTheme.colors.white,
                      }}
                      onPress={() => {
                        navigation.navigate(CustomerStackRoutes.TABLE_SEARCH);
                      }}>
                      <Feather name="search" color={"#3B3B3B"} size={15} />
                      <Text
                        style={{
                          color: "#3B3B3B",
                          marginLeft: splitAppTheme.space[2],
                          fontSize: splitAppTheme.fontSizes.sm,
                        }}>
                        Find your restaurant
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}>
                    <MapIcon height={16} width={16} color={"white"} />
                    <Text
                      style={{
                        color: splitAppTheme.colors.white,
                        fontSize: splitAppTheme.fontSizes.sm,
                        marginLeft: splitAppTheme.space[2],
                        fontFamily:
                          splitAppTheme.fontConfig.Sathoshi[400].normal,
                      }}>
                      {authData?.location}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </View>

      <View
        style={{
          marginTop: splitAppTheme.space[6],
          paddingHorizontal: splitAppTheme.space[6],
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(CustomerStackRoutes.TABLE_LIST, {
              headerTitle: "Book Table",
              listType: AppTableListTypes.BOOKED,
            });
          }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: splitAppTheme.space[6],
              paddingRight: splitAppTheme.space[3],
              borderRadius: splitAppTheme.radii.xl,
              borderWidth: splitAppTheme.borderWidths[2],
              borderColor: splitAppTheme.colors.secondary[400],
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
              }}>
              <View>
                <LinearGradient
                  end={{x: 0, y: 0}}
                  start={{x: 0, y: 1}}
                  colors={[
                    splitAppTheme.colors.secondary[400],
                    splitAppTheme.colors.secondary[400],
                  ]}
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: splitAppTheme.radii.full,
                  }}>
                  <BookTableIcon />
                </LinearGradient>
              </View>

              <View
                style={{
                  marginLeft: splitAppTheme.space[5],
                }}>
                <Text
                  style={{
                    fontSize: splitAppTheme.fontSizes["2xl"],
                    color: splitAppTheme.colors.secondary[500],
                    fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                  }}>
                  Book Table
                </Text>
                <Text
                  style={{
                    marginTop: splitAppTheme.space["0.5"],
                    fontSize: splitAppTheme.fontSizes["md"],
                    fontFamily: splitAppTheme.fontConfig.Roboto[400].normal,
                  }}>
                  Whole table booking
                </Text>
              </View>
            </View>

            <View>
              <Entypo
                size={30}
                name={"chevron-right"}
                color={splitAppTheme.colors.secondary[500]}
              />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{marginTop: splitAppTheme.space[5]}}
          onPress={() => {
            navigation.navigate(CustomerStackRoutes.TABLE_LIST, {
              headerTitle: "Split Table",
              listType: AppTableListTypes.SPLIT,
            });
          }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: splitAppTheme.space[6],
              paddingRight: splitAppTheme.space[3],
              borderRadius: splitAppTheme.radii.xl,
              borderWidth: splitAppTheme.borderWidths[2],
              borderColor: splitAppTheme.colors.secondary[400],
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
              }}>
              <View>
                <LinearGradient
                  end={{x: 0, y: 0}}
                  start={{x: 0, y: 1}}
                  colors={[
                    splitAppTheme.colors.primary[400],
                    splitAppTheme.colors.secondary[400],
                  ]}
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: splitAppTheme.radii.full,
                  }}>
                  <SplitTableIcon />
                </LinearGradient>
              </View>

              <View
                style={{
                  marginLeft: splitAppTheme.space[5],
                }}>
                <Text
                  style={{
                    fontSize: splitAppTheme.fontSizes["2xl"],
                    color: splitAppTheme.colors.secondary[500],
                    fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                  }}>
                  Split Table
                </Text>
                <Text
                  style={{
                    marginTop: splitAppTheme.space["0.5"],
                    fontSize: splitAppTheme.fontSizes["md"],
                    fontFamily: splitAppTheme.fontConfig.Roboto[400].normal,
                  }}>
                  Share table booking
                </Text>
              </View>
            </View>

            <View>
              <Entypo
                size={30}
                name={"chevron-right"}
                color={splitAppTheme.colors.secondary[500]}
              />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{marginTop: splitAppTheme.space[5]}}
          onPress={() => {
            navigation.navigate(CustomerStackRoutes.TABLE_LIST, {
              headerTitle: "Join Table",
              listType: AppTableListTypes.JOIN,
            });
          }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: splitAppTheme.space[6],
              paddingRight: splitAppTheme.space[3],
              borderRadius: splitAppTheme.radii.xl,
              borderWidth: splitAppTheme.borderWidths[2],
              borderColor: splitAppTheme.colors.secondary[400],
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
              }}>
              <View>
                <LinearGradient
                  end={{x: 0, y: 0}}
                  start={{x: 0, y: 1}}
                  colors={[
                    splitAppTheme.colors.blue[400],
                    splitAppTheme.colors.secondary[400],
                  ]}
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: splitAppTheme.radii.full,
                  }}>
                  <JoinTableIcon />
                </LinearGradient>
              </View>

              <View
                style={{
                  marginLeft: splitAppTheme.space[5],
                }}>
                <Text
                  style={{
                    fontSize: splitAppTheme.fontSizes["2xl"],
                    color: splitAppTheme.colors.secondary[500],
                    fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                  }}>
                  Join Table
                </Text>
                <Text
                  style={{
                    marginTop: splitAppTheme.space["0.5"],
                    fontSize: splitAppTheme.fontSizes["md"],
                    fontFamily: splitAppTheme.fontConfig.Roboto[400].normal,
                  }}>
                  View your joining table
                </Text>
              </View>
            </View>

            <View>
              <Entypo
                size={30}
                name={"chevron-right"}
                color={splitAppTheme.colors.secondary[500]}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CustomerTableScreen;
