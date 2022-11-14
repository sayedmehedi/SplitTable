import React from "react";
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ListRenderItem,
  TouchableOpacity,
} from "react-native";
import {ClubBooking} from "@src/models";
import {useTime} from "react-timer-hook";
import {splitAppTheme} from "@src/theme";
import {isOwnerProfile} from "@utils/profile";
import useGetAuthDataQuery from "@hooks/useGetAuthDataQuery";
import {useDimensions} from "@react-native-community/hooks";
import {StackScreenProps} from "@react-navigation/stack";
import LinearGradient from "react-native-linear-gradient";
import {MapIcon, TablePerson} from "@constants/iconPath";
import {CompositeScreenProps} from "@react-navigation/native";
import useGetProfileQuery from "@hooks/auth/useGetProfileQuery";
import {FlatList, ScrollView} from "react-native-gesture-handler";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import EachBookingItem from "../OwnerBookingListScreen/EachBookingItem";
import useGetBookedTablesQuery from "@hooks/clubs/useGetBookedTablesQuery";
import {
  OwnerMainBottomTabRoutes,
  OwnerStackRoutes,
  RootStackRoutes,
} from "@constants/routes";
import {
  OwnerBottomTabParamList,
  OwnerStackParamList,
  RootStackParamList,
} from "@src/navigation";
import AppGradientButton from "@components/AppGradientButton";
import EachTableNEventItem from "./EachTableNEventItem";
import useGetUpcomingBookingQuery from "@hooks/clubs/useGetUpcomingBookingQuery";

const renderBookingItem: ListRenderItem<ClubBooking> = ({item}) => (
  <EachBookingItem item={item} />
);

type Props = CompositeScreenProps<
  CompositeScreenProps<
    BottomTabScreenProps<
      OwnerBottomTabParamList,
      typeof OwnerMainBottomTabRoutes.OWNER_TABLE
    >,
    StackScreenProps<OwnerStackParamList>
  >,
  StackScreenProps<RootStackParamList>
>;

const OwnerTableScreen = ({navigation}: Props) => {
  const {
    window: {height: WINDOW_HEIGHT},
  } = useDimensions();
  const {hours} = useTime({format: "12-hour"});
  const {data: authData} = useGetAuthDataQuery();
  const {
    data: profileData,
    isLoading: isLoadingProfile,
    error: getProfileError,
  } = useGetProfileQuery();
  useHandleNonFieldError(getProfileError);

  const {
    data: getBookedTablesResponse,
    isLoading: isLoadingBookedTables,
    error: getBookTablesError,
  } = useGetBookedTablesQuery({
    paginate: 3,
  });
  useHandleNonFieldError(getBookTablesError);

  const {
    data: getUpcomingBookingResponse,
    isLoading: isLoadingUpcomingBooking,
    error: getUpcomingBookingError,
  } = useGetUpcomingBookingQuery({
    paginate: 3,
  });
  useHandleNonFieldError(getUpcomingBookingError);

  const handleGotoNotifications = () => {
    navigation.navigate(RootStackRoutes.NOTIFICATIONS);
  };

  if (isLoadingProfile) {
    return <Text>Loading..</Text>;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: "#FFFFFF",
      }}>
      <StatusBar
        translucent={false}
        barStyle={"light-content"}
        backgroundColor={splitAppTheme.colors.secondary[600]}
      />

      <View>
        <LinearGradient
          end={{x: 0, y: 0}}
          start={{x: 0, y: 1}}
          style={{height: WINDOW_HEIGHT * 0.25}}
          colors={["#DF3BC0", "#472BBE"]}>
          <SafeAreaView>
            <View
              style={{
                justifyContent: "center",
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

                      {isOwnerProfile(profileData) && (
                        <Text
                          style={{
                            color: splitAppTheme.colors.white,
                            marginTop: splitAppTheme.space["0.5"],
                            fontSize: splitAppTheme.fontSizes["2xl"],
                            fontFamily:
                              splitAppTheme.fontConfig.Sathoshi[700].normal,
                          }}>
                          {profileData?.club}
                        </Text>
                      )}
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

      <View style={{flex: 1, paddingHorizontal: splitAppTheme.space[6]}}>
        <View style={{marginBottom: splitAppTheme.space[6]}}>
          {isLoadingBookedTables ? (
            <Text>Loading...</Text>
          ) : !getBookedTablesResponse ? (
            <View>
              <View
                style={{
                  justifyContent: "center",
                  marginVertical: splitAppTheme.space[6],
                }}>
                <Text style={{textAlign: "center"}}>No Table Yet</Text>
              </View>

              <AppGradientButton
                color="primary"
                variant="outlined"
                title="Create Table"
                onPress={() => {}}
              />
            </View>
          ) : (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: splitAppTheme.space[6],
                }}>
                <Text
                  style={{
                    color: "#030819",
                    fontSize: splitAppTheme.fontSizes.xl,
                    fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                  }}>
                  Table & Events
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(OwnerStackRoutes.MY_TABLES);
                  }}>
                  <Text
                    style={{
                      color: "#262B2E",
                      textDecorationLine: "underline",
                      fontSize: splitAppTheme.fontSizes.sm,
                      fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
                    }}>
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

              {getBookedTablesResponse.tables.data.map(bookedTable => (
                <View
                  key={bookedTable.id}
                  style={{marginTop: splitAppTheme.space[5]}}>
                  <EachTableNEventItem
                    item={bookedTable}
                    onPress={table => {
                      navigation.navigate(OwnerStackRoutes.TABLE_DETAILS, {
                        tableId: table.id,
                      });
                    }}
                    onUpdatePress={table => {
                      navigation.navigate(OwnerStackRoutes.UPSERT_TABLE, {
                        actionMode: "update",
                        tableId: table.id,
                      });
                    }}
                  />
                </View>
              ))}
            </View>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: splitAppTheme.space[5],
          }}>
          <Text
            style={{
              color: "#030819",
              fontSize: splitAppTheme.fontSizes.xl,
              fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
            }}>
            Upcomming Booking
          </Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate(OwnerStackRoutes.OWNER_MAIN_TABS, {
                screen: OwnerMainBottomTabRoutes.OWNER_BOOKING,
              });
            }}>
            <Text
              style={{
                color: "#262B2E",
                textDecorationLine: "underline",
                fontSize: splitAppTheme.fontSizes.sm,
                fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
              }}>
              See all
            </Text>
          </TouchableOpacity>
        </View>

        {isLoadingUpcomingBooking ? (
          <Text>Loading...</Text>
        ) : !getUpcomingBookingResponse ||
          getUpcomingBookingResponse.bookings.count === 0 ? (
          <View>
            <View
              style={{
                justifyContent: "center",
                marginVertical: splitAppTheme.space[6],
              }}>
              <Text style={{textAlign: "center"}}>No Booking Yet</Text>
            </View>
          </View>
        ) : (
          <View>
            {getUpcomingBookingResponse.bookings.data.map(booking => (
              <View
                key={booking.id}
                style={{marginTop: splitAppTheme.space[5]}}>
                <EachBookingItem item={booking} />
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default OwnerTableScreen;
