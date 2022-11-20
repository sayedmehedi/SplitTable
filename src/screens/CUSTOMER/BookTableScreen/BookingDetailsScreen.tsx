import React from "react";
import {splitAppTheme} from "@src/theme";
import {ClubMenuItem} from "@src/models";
import Entypo from "react-native-vector-icons/Entypo";
import {CustomerStackRoutes} from "@constants/routes";
import {StackScreenProps} from "@react-navigation/stack";
import useDebouncedState from "@hooks/useDebouncedState";
import {SafeAreaView} from "react-native-safe-area-context";
import AppGradientButton from "@components/AppGradientButton";
import {CompositeScreenProps} from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {isBookedTableDetails, isSplitTableDetails} from "@utils/table";
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TextInput,
  ActivityIndicator,
} from "react-native";
import {isResponseResultError} from "@utils/error-handling";
import useBookTableMutation from "@hooks/useBookTableMutation";
import useGetProfileQuery from "@hooks/auth/useGetProfileQuery";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import dayjs from "dayjs";

type Props = CompositeScreenProps<
  StackScreenProps<
    CustomerStackParamList,
    typeof CustomerStackRoutes.BOOKING_DETAILS
  >,
  StackScreenProps<RootStackParamList>
>;

const TAX_PERCENTAGE = 0;

const MenuItemAction = React.memo(
  function ({
    onChange,
    maxQuantity,
    initialQuantity,
  }: {
    maxQuantity: number;
    initialQuantity: number;
    onChange: (quantity: number) => void;
  }) {
    const [quantity, setQuantity] = React.useState(initialQuantity);
    const [debouncedQuantity] = useDebouncedState(quantity, 500);

    React.useEffect(() => {
      onChange(debouncedQuantity);
    }, [debouncedQuantity, onChange]);

    return (
      <View style={{flexDirection: "row", alignItems: "center"}}>
        <TouchableOpacity
          disabled={quantity <= 0}
          onPress={() => {
            setQuantity(prevQuantity => {
              const newQuantity = prevQuantity - 1;
              if (newQuantity >= 0) {
                return newQuantity;
              }

              return prevQuantity;
            });
          }}
          style={{
            height: 30,
            width: 30,
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(64,43,140,0.1)",
          }}>
          <Entypo name="minus" size={8} color={"#402B8C"} />
        </TouchableOpacity>

        <Text style={{marginHorizontal: 10}}>{quantity}</Text>

        <TouchableOpacity
          disabled={quantity >= maxQuantity}
          onPress={() => {
            setQuantity(prevQuantity => {
              const newQuantity = prevQuantity + 1;
              if (newQuantity < maxQuantity) {
                return newQuantity;
              }

              return prevQuantity;
            });
          }}
          style={{
            height: 30,
            width: 30,
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(64,43,140,0.9)",
          }}>
          <Entypo name="plus" size={10} color={"white"} />
        </TouchableOpacity>
      </View>
    );
  },
  (prevProps, nextProps) =>
    prevProps.maxQuantity === nextProps.maxQuantity &&
    prevProps.initialQuantity === nextProps.initialQuantity,
);

const BookingDetailsScreen = ({navigation, route}: Props) => {
  const [tip, setTip] = React.useState(0);
  const [discount] = React.useState(0);
  const [menus, setMenus] = React.useState<
    Record<number, ClubMenuItem & {purchaseQty: number}>
  >({});

  const {data: profileData, isLoading: isProfileDataLoading} =
    useGetProfileQuery();

  const showLocationScreen =
    !profileData?.location && !profileData?.latitude && !profileData?.longitude;

  const {
    mutate: bookTable,
    error: bookTableError,
    data: bookTableResponse,
    isLoading: isBookingTable,
  } = useBookTableMutation();
  useHandleNonFieldError(bookTableError);
  useHandleResponseResultError(bookTableResponse);

  const handleItemQuantity = React.useCallback(
    (menuItem: ClubMenuItem, newQuantity: number) => {
      setMenus(prevMenus => {
        const copiedMenus = {...prevMenus};

        if (menuItem.id in copiedMenus) {
          const copiedItem = {...copiedMenus[menuItem.id]};

          if (newQuantity >= 0 && newQuantity < copiedItem.qty) {
            copiedItem.purchaseQty = newQuantity;
            copiedMenus[copiedItem.id] = copiedItem;
          }
        } else {
          if (newQuantity > 0) {
            copiedMenus[menuItem.id] = {
              ...menuItem,
              purchaseQty: newQuantity,
            };
          }
        }

        return copiedMenus;
      });
    },
    [],
  );

  const tableBookingCostForMen = isSplitTableDetails(route.params.tableDetails)
    ? route.params.menGuestCount *
      parseFloat(route.params.tableDetails.men_seat_price)
    : 0;

  const tableBookingCostForWomen = isSplitTableDetails(
    route.params.tableDetails,
  )
    ? route.params.womenGuestCount *
      parseFloat(route.params.tableDetails.women_seat_price)
    : 0;

  const wholetableBookingCost = isBookedTableDetails(route.params.tableDetails)
    ? parseFloat(route.params.tableDetails.price)
    : 0;

  const menuTotal = React.useMemo(() => {
    return Object.values(menus).reduce((acc, curr) => {
      acc += curr.purchaseQty * parseFloat(curr.price.replace(",", ""));
      return acc;
    }, 0);
  }, [menus]);

  const subtotal = isSplitTableDetails(route.params.tableDetails)
    ? tableBookingCostForMen + tableBookingCostForWomen + menuTotal
    : wholetableBookingCost + menuTotal;

  const tax = subtotal * TAX_PERCENTAGE;

  const total = tax + subtotal + tip - discount;

  if (isProfileDataLoading) {
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{flex: 1}}>
        <ImageBackground
          style={{
            height: 300,
            width: "100%",
          }}
          source={require("@assets/images/book-details.jpg")}>
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
                {route.params.tableDetails.club_name}
              </Text>
            </View>

            {isBookedTableDetails(route.params.tableDetails) ? (
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
                  {route.params.tableDetails.total_seat}
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
                    {route.params.menGuestCount}
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
                    {route.params.womenGuestCount}
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
                {route.params.tableDetails.name}
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
                {dayjs(
                  route.params.tableDetails.date,
                  "YYYY-MM-DD HH:mm:ss",
                ).format("DD MMM, hh:mm A")}
              </Text>
            </View>
          </View>
        </ImageBackground>

        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(255,255,255,0.7)",
            padding: 20,
          }}>
          {route.params.menuListToAdd.map(item => (
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
                <Image
                  source={{uri: item.image}}
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
                    {item.name}
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

                <MenuItemAction
                  onChange={quantity => {
                    handleItemQuantity(item, quantity);
                  }}
                  maxQuantity={item.qty}
                  initialQuantity={item.purchaseQty}
                />
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
            {isSplitTableDetails(route.params.tableDetails) ? (
              <React.Fragment>
                <View
                  style={{
                    marginVertical: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}>
                  <Text style={styles.textStyle}>
                    Table Booking x {route.params.menGuestCount} Men Guest
                  </Text>
                  <Text style={styles.textStyle}>
                    ${tableBookingCostForMen}
                  </Text>
                </View>

                <View
                  style={{
                    marginVertical: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}>
                  <Text style={styles.textStyle}>
                    Table Booking x {route.params.womenGuestCount} Women Guest
                  </Text>
                  <Text style={styles.textStyle}>
                    ${tableBookingCostForWomen}
                  </Text>
                </View>
              </React.Fragment>
            ) : (
              <View
                style={{
                  marginVertical: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <Text style={styles.textStyle}>
                  Table Booking x {route.params.tableDetails.total_seat} Guest
                </Text>
                <Text style={styles.textStyle}>${wholetableBookingCost}</Text>
              </View>
            )}

            {Object.values(menus).map(menu => (
              <View
                key={menu.id}
                style={{
                  marginVertical: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <Text style={styles.textStyle}>
                  {menu.name} x {menu.purchaseQty}{" "}
                </Text>
                <Text style={styles.textStyle}>
                  ${menu.purchaseQty * parseFloat(menu.price.replace(",", ""))}
                </Text>
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
              <Text style={styles.textStyle}>${subtotal}</Text>
            </View>
            <View
              style={{
                marginVertical: 5,
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <Text style={styles.textStyle}>Tax </Text>
              <Text style={styles.textStyle}>${tax}</Text>
            </View>

            <View
              style={{
                marginVertical: 5,
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <Text style={styles.textStyle}>Discount </Text>
              <Text style={styles.textStyle}>${discount}</Text>
            </View>
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
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <Text style={styles.textStyle}>Tip</Text>
              <TextInput
                value={`${tip}`}
                editable={!isBookingTable}
                keyboardType={"number-pad"}
                onChangeText={text => {
                  const output = parseFloat(text);

                  if (isNaN(output)) {
                    setTip(0);
                  } else {
                    setTip(output);
                  }
                }}
                style={{
                  width: 50,
                  textAlign: "center",
                  padding: splitAppTheme.space[2],
                  borderRadius: splitAppTheme.radii.lg,
                  fontSize: splitAppTheme.fontSizes.md,
                  borderWidth: splitAppTheme.borderWidths[2],
                  borderColor: splitAppTheme.colors.primary[300],
                }}
              />
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
              ${total}
            </Text>

            <AppGradientButton
              touchableOpacityProps={{
                disabled: isBookingTable,
              }}
              onPress={() => {
                bookTable(
                  {
                    tax,
                    tip,
                    discount,
                    // @ts-ignore
                    menuId: Object.keys(menus).filter(menuId => {
                      const menu = menus[parseInt(menuId)];
                      return menu.purchaseQty !== 0;
                    }),
                    tableId: [route.params.tableDetails.id],
                    clubId: route.params.tableDetails.club_id,
                    menSeat: isSplitTableDetails(route.params.tableDetails)
                      ? {
                          [route.params.tableDetails.id]:
                            route.params.menGuestCount,
                        }
                      : {},
                    womenSeat: isSplitTableDetails(route.params.tableDetails)
                      ? {
                          [route.params.tableDetails.id]:
                            route.params.womenGuestCount,
                        }
                      : {},
                    qty: Object.values(menus)
                      .filter(menu => menu.purchaseQty !== 0)
                      .map(menu => menu.purchaseQty),
                  },
                  {
                    onSuccess(data) {
                      if (!isResponseResultError(data)) {
                        if (showLocationScreen) {
                          navigation.navigate(
                            CustomerStackRoutes.BOOKING_SELECT_LOCATION,
                            {
                              bookingId: data.booking_details.id,
                              totalAmount: data.booking_details.total_amount,
                              partialAmount:
                                data.booking_details.partial_amount,
                            },
                          );
                        } else
                          navigation.navigate(
                            CustomerStackRoutes.PAYMENT_AMOUNT,
                            {
                              bookingId: data.booking_details.id,
                              totalAmount: data.booking_details.total_amount,
                              partialAmount:
                                data.booking_details.partial_amount,
                            },
                          );
                      }
                    },
                  },
                );
              }}
              width={290}
              color={"primary"}
              variant={"solid"}
              title={"Book Now"}
            />
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
