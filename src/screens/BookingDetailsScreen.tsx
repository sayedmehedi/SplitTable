import React from "react";
import {splitAppTheme} from "@src/theme";
import useAppToast from "@hooks/useAppToast";
import FastImage from "react-native-fast-image";
import {RootStackRoutes} from "@constants/routes";
import {RootStackParamList} from "@src/navigation";
import {isBookedBookingDetails} from "@utils/table";
import {StackScreenProps} from "@react-navigation/stack";
import {SafeAreaView} from "react-native-safe-area-context";
import {useDimensions} from "@react-native-community/hooks";
import GenericListEmpty from "@components/GenericListEmpty";
import {isResponseResultError} from "@utils/error-handling";
import useGetProfileQuery from "@hooks/auth/useGetProfileQuery";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";
import {View, Text, StyleSheet, ActivityIndicator, Alert} from "react-native";
import useCancelBookingMutation from "@hooks/useCancelBookingMutation";
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import useGetBookingDetailsQuery from "@hooks/clubs/useGetBookingDetailsQuery";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";

type Props = StackScreenProps<
  RootStackParamList,
  typeof RootStackRoutes.BOOKING_DETAILS
>;

const BookingDetailsScreen = ({navigation, route}: Props) => {
  const toast = useAppToast();
  const {
    window: {height: WINDOW_HEIGHT},
  } = useDimensions();

  const {
    refetch,
    isRefetching,
    error: bookingDetailsError,
    data: bookingDetailsRepsonse,
    isLoading: isBookingDetailsLoading,
  } = useGetBookingDetailsQuery(route.params.bookingId);
  useHandleNonFieldError(bookingDetailsError);

  const {data: profileData, isLoading: isProfileLoading} = useGetProfileQuery();

  const {
    mutate: cancelBooking,
    isLoading: isCancelling,
    error: cancelBookingError,
    data: cancelBookingResponse,
  } = useCancelBookingMutation({
    onSuccess(data) {
      if (!isResponseResultError(data)) {
        toast.success(data.success);
      }
    },
  });
  useHandleNonFieldError(cancelBookingError);
  useHandleResponseResultError(cancelBookingResponse);

  if (isBookingDetailsLoading || isProfileLoading) {
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

  if (!bookingDetailsRepsonse?.booking) {
    return <GenericListEmpty height={300} width={300} />;
  }

  const [
    subtotalEntry,
    taxEntry,
    tipEntry,
    discountEntry,
    totalAmountEntry,
    paidAmountEntry,
    dueAmountEntry,
  ] = Object.entries(bookingDetailsRepsonse.calculations).slice(-7);

  const calculationReasonEntries = Object.entries(
    bookingDetailsRepsonse.calculations,
  ).slice(0, -7);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={() => {
            refetch();
          }}
        />
      }>
      <FocusAwareStatusBar
        translucent
        barStyle={"light-content"}
        backgroundColor={"transparent"}
      />

      <View style={{flex: 1}}>
        <View
          style={{
            width: "100%",
            height: WINDOW_HEIGHT * 0.43,
            backgroundColor: splitAppTheme.colors.secondary[700],
          }}>
          <SafeAreaView>
            <View
              style={{
                padding: 15,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <FontAwesome5 name="chevron-left" size={25} color={"white"} />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 22,
                  color: "#FFFFFF",
                  fontFamily: "SatoshiVariable-Bold",
                }}>
                Booking Details
              </Text>

              <View></View>
            </View>
          </SafeAreaView>
          <View style={{padding: 15}}>
            <View
              style={{
                marginVertical: 5,
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: "#FFFFFF",
                  fontFamily: "SatoshiVariable-Bold",
                }}>
                Club/Bar Name
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#FFFFFF",
                  fontFamily: "SatoshiVariable-Bold",
                }}>
                {bookingDetailsRepsonse.booking.club}
              </Text>
            </View>

            {isBookedBookingDetails(bookingDetailsRepsonse.booking) ? (
              <View
                style={{
                  marginVertical: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#FFFFFF",
                    fontFamily: "SatoshiVariable-Bold",
                  }}>
                  Guest:
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#FFFFFF",
                    fontFamily: "SatoshiVariable-Bold",
                  }}>
                  {bookingDetailsRepsonse.booking["Booked Guests"]}
                </Text>
              </View>
            ) : (
              <React.Fragment>
                <View
                  style={{
                    marginVertical: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#FFFFFF",
                      fontFamily: "SatoshiVariable-Bold",
                    }}>
                    Men Guest:
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#FFFFFF",
                      fontFamily: "SatoshiVariable-Bold",
                    }}>
                    {bookingDetailsRepsonse.booking["Men Guests"]}
                  </Text>
                </View>

                <View
                  style={{
                    marginVertical: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#FFFFFF",
                      fontFamily: "SatoshiVariable-Bold",
                    }}>
                    Women Guest:
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#FFFFFF",
                      fontFamily: "SatoshiVariable-Bold",
                    }}>
                    {bookingDetailsRepsonse.booking["Women Guests"]}
                  </Text>
                </View>
              </React.Fragment>
            )}

            <View
              style={{
                marginVertical: 5,
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: "#FFFFFF",
                  fontFamily: "SatoshiVariable-Bold",
                }}>
                Table/Event Name:
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#FFFFFF",
                  fontFamily: "SatoshiVariable-Bold",
                }}>
                {bookingDetailsRepsonse.booking.tables.join(", ")}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 5,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: "#FFFFFF",
                  fontFamily: "SatoshiVariable-Bold",
                }}>
                Date & Time:
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#FFFFFF",
                  fontFamily: "SatoshiVariable-Bold",
                }}>
                {bookingDetailsRepsonse.booking.date}{" "}
                {bookingDetailsRepsonse.booking.time}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(255,255,255,0.7)",
            padding: 20,
          }}>
          {bookingDetailsRepsonse.booking.menus.map(item => (
            <View
              key={item.id}
              style={{
                height: 60,
                width: "100%",
                marginVertical: 5,
                flexDirection: "row",
                backgroundColor: "rgba(255,255,255,0.9)",
              }}>
              <View>
                <FastImage
                  source={{uri: item.img}}
                  style={{
                    width: 50,
                    height: 50,
                  }}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  padding: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#262B2E",
                      fontFamily: "Satoshi-Medium",
                    }}>
                    {item.menu}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#00C1FF",
                      fontFamily: "SatoshiVariable-Bold",
                    }}>
                    Price: ${item.price}
                  </Text>
                </View>

                <Text>Qty: {item.qty}</Text>
              </View>
            </View>
          ))}
          <View
            style={{
              marginTop: 10,
              borderTopWidth: 2,
              paddingVertical: 10,
              borderStyle: "dashed",
              borderColor: "#D8D8D8",
            }}>
            {calculationReasonEntries.map((reason, index) => (
              <View
                key={index}
                style={{
                  marginVertical: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <Text style={styles.textStyle}>{reason[0]}</Text>
                <Text style={styles.textStyle}>${reason[1]}</Text>
              </View>
            ))}
          </View>

          <View
            style={{
              borderTopWidth: 2,
              paddingVertical: 10,
              borderStyle: "dashed",
              borderColor: "#D8D8D8",
            }}>
            <View
              style={{
                marginVertical: 5,
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <Text style={styles.textStyle}>Subtotal</Text>
              <Text style={styles.textStyle}>${subtotalEntry[1]}</Text>
            </View>
            <View
              style={{
                marginVertical: 5,
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <Text style={styles.textStyle}>Tax </Text>
              <Text style={styles.textStyle}>${taxEntry[1]}</Text>
            </View>

            <View
              style={{
                marginVertical: 5,
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <Text style={styles.textStyle}>Discount </Text>
              <Text style={styles.textStyle}>${discountEntry[1]}</Text>
            </View>

            <View
              style={{
                marginVertical: 5,
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <Text style={styles.textStyle}>Tip</Text>
              <Text style={styles.textStyle}>${tipEntry[1]}</Text>
            </View>
          </View>

          <View style={{alignItems: "center"}}>
            <Text
              style={{
                fontSize: 16,
                color: "#333333",
                fontFamily: "SatoshiVariable-Bold",
              }}>
              Total Amount
            </Text>
            <Text
              style={{
                fontSize: 30,
                fontFamily: "SatoshiVariable-Bold",
                marginVertical: splitAppTheme.space["0.5"],
                color: splitAppTheme.colors.primary[300],
              }}>
              ${totalAmountEntry[1]}
            </Text>
          </View>

          <View
            style={{
              borderStyle: "dashed",
              borderColor: "#D8D8D8",
              marginVertical: splitAppTheme.space[3],
              borderWidth: splitAppTheme.borderWidths[1],
            }}
          />

          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <View style={{alignItems: "center"}}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#333333",
                  fontFamily: "SatoshiVariable-Bold",
                }}>
                Paid Amount
              </Text>
              <Text
                style={{
                  fontSize: 30,
                  fontFamily: "SatoshiVariable-Bold",
                  marginVertical: splitAppTheme.space["0.5"],
                  color: splitAppTheme.colors.secondary[300],
                }}>
                ${paidAmountEntry[1]}
              </Text>
            </View>

            <View style={{alignItems: "center"}}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#333333",
                  fontFamily: "SatoshiVariable-Bold",
                }}>
                Due Amount
              </Text>
              <Text
                style={{
                  fontSize: 30,
                  fontFamily: "SatoshiVariable-Bold",
                  marginVertical: splitAppTheme.space["0.5"],
                  color: splitAppTheme.colors.blue[300],
                }}>
                ${dueAmountEntry[1]}
              </Text>
            </View>
          </View>

          <View>
            {route.params.bookingType === "upcoming" &&
            bookingDetailsRepsonse.booking.can_cancel ? (
              isCancelling ? (
                <View style={{padding: splitAppTheme.space[3]}}>
                  <ActivityIndicator
                    size={"small"}
                    color={splitAppTheme.colors.secondary[400]}
                  />
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    zIndex: 99,
                  }}
                  onPress={() => {
                    Alert.alert("Cancel Booking", "Are your sure?", [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "Sure",
                        style: "destructive",
                        onPress() {
                          cancelBooking(bookingDetailsRepsonse.booking.id);
                        },
                      },
                    ]);
                  }}>
                  <Text
                    style={{
                      textAlign: "center",
                      textDecorationLine: "underline",
                      color: splitAppTheme.colors.red[300],
                      fontSize: splitAppTheme.fontSizes.lg,
                      fontFamily: splitAppTheme.fontConfig.Sathoshi[500].normal,
                    }}>
                    Cancel Booking
                  </Text>
                </TouchableOpacity>
              )
            ) : null}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "Satoshi-Regular",
    fontSize: 14,
    color: "#030819",
  },
});

export default BookingDetailsScreen;
