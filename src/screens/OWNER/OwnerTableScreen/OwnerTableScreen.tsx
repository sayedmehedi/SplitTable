import React from "react";
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import {useTime} from "react-timer-hook";
import {splitAppTheme} from "@src/theme";
import {MapIcon} from "@constants/iconPath";
import {isOwnerProfile} from "@utils/profile";
import {ScrollView} from "react-native-gesture-handler";
import {StackScreenProps} from "@react-navigation/stack";
import EachTableNEventItem from "./EachTableNEventItem";
import {useDimensions} from "@react-native-community/hooks";
import LinearGradient from "react-native-linear-gradient";
import useGetAuthDataQuery from "@hooks/useGetAuthDataQuery";
import {CompositeScreenProps} from "@react-navigation/native";
import useGetProfileQuery from "@hooks/auth/useGetProfileQuery";
import AppGradientButton from "@components/AppGradientButton";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EachBookingItem from "../OwnerBookingListScreen/EachBookingItem";
import useGetUpcomingBookingQuery from "@hooks/clubs/useGetUpcomingBookingQuery";
import useGetTablesBySearchTermQuery from "@hooks/clubs/useGetTablesBySearchTermQuery";
import {
  RootStackRoutes,
  OwnerStackRoutes,
  OwnerMainBottomTabRoutes,
} from "@constants/routes";
import {
  RootStackParamList,
  OwnerStackParamList,
  OwnerBottomTabParamList,
} from "@src/navigation";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";
import GenericListEmpty from "@components/GenericListEmpty";
import useGetOwnerClubInfoQuery from "@hooks/clubs/useGetOwnerClubInfoQuery";
import {QueryKeys} from "@constants/query-keys";
import {useIsFetching, useQueryClient} from "@tanstack/react-query";
import {BookingTypes} from "@constants/booking";

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
  const queryClient = useQueryClient();
  const isFetchingTables = useIsFetching({
    queryKey: [QueryKeys.TABLE, "LIST", "by-search"],
  });
  const isFetchingUpcomingBookings = useIsFetching({
    queryKey: [QueryKeys.UPCOMING_BOOKING],
  });

  const {
    window: {height: WINDOW_HEIGHT},
  } = useDimensions();
  const {hours} = useTime({});
  const {data: authData} = useGetAuthDataQuery();
  const {
    data: profileData,
    isLoading: isLoadingProfile,
    error: getProfileError,
  } = useGetProfileQuery();
  useHandleNonFieldError(getProfileError);
  const {
    data: clubInfoData,
    isLoading: isClubInfoLoading,
    error: clubInfoError,
  } = useGetOwnerClubInfoQuery();
  useHandleNonFieldError(clubInfoError);

  const {
    data: getBookedTablesResponse,
    isLoading: isLoadingBookedTables,
    error: getBookTablesError,
  } = useGetTablesBySearchTermQuery(
    {
      paginate: 3,
      clubId: clubInfoData?.id,
    },
    {
      enabled: !isClubInfoLoading && clubInfoData?.id !== undefined,
    },
  );
  useHandleNonFieldError(getBookTablesError);

  const {
    data: getUpcomingBookingResponse,
    isLoading: isLoadingUpcomingBooking,
    error: getUpcomingBookingError,
  } = useGetUpcomingBookingQuery(
    {
      paginate: 3,
      clubId: clubInfoData?.id,
    },
    {
      enabled: !isClubInfoLoading && clubInfoData?.id !== undefined,
    },
  );
  useHandleNonFieldError(getUpcomingBookingError);

  const handleGotoNotifications = () => {
    navigation.navigate(RootStackRoutes.NOTIFICATIONS);
  };

  if (
    isLoadingProfile ||
    isLoadingBookedTables ||
    isLoadingUpcomingBooking ||
    isClubInfoLoading
  ) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <ActivityIndicator size={"small"} />
      </View>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isFetchingTables == 1 || isFetchingUpcomingBookings == 1}
          onRefresh={async () => {
            await queryClient.invalidateQueries([QueryKeys.TABLE]);
            await queryClient.invalidateQueries([QueryKeys.UPCOMING_BOOKING]);
          }}
        />
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: splitAppTheme.space[8],
        backgroundColor: splitAppTheme.colors.white,
      }}>
      <FocusAwareStatusBar
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
                      marginTop: splitAppTheme.space[3],
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
          {!getBookedTablesResponse ? (
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
                onPress={() => {
                  navigation.navigate(OwnerStackRoutes.UPSERT_TABLE, {
                    actionMode: "create",
                  });
                }}
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
                  Club Table & Events
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

              {!getBookedTablesResponse ||
              getBookedTablesResponse.tables.data.length === 0 ? (
                <GenericListEmpty width={300} height={300} />
              ) : (
                getBookedTablesResponse.tables.data.map(bookedTable => (
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
                ))
              )}
            </View>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: splitAppTheme.space[3],
          }}>
          <Text
            style={{
              color: "#030819",
              fontSize: splitAppTheme.fontSizes.xl,
              fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
            }}>
            Upcoming Booking
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

        {!getUpcomingBookingResponse ||
        getUpcomingBookingResponse.bookings.count === 0 ? (
          <GenericListEmpty width={300} height={300} />
        ) : (
          <View>
            {getUpcomingBookingResponse.bookings.data.map(booking => (
              <View
                key={booking.id}
                style={{marginBottom: splitAppTheme.space[3]}}>
                <EachBookingItem
                  item={booking}
                  type={"upcoming"}
                  onPress={resource => {
                    navigation.navigate(RootStackRoutes.BOOKING_DETAILS, {
                      bookingId: resource.id,
                      bookingType: BookingTypes.UPCOMING,
                    });
                  }}
                />
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default OwnerTableScreen;
