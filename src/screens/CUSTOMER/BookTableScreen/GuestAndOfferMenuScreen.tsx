import React from "react";
import {splitAppTheme} from "@src/theme";
import {View, Text, StyleSheet} from "react-native";
import {useDisclosure} from "react-use-disclosure";
import {CustomerStackRoutes} from "@constants/routes";
import LinearGradient from "react-native-linear-gradient";
import {StackScreenProps} from "@react-navigation/stack";
import {TouchableOpacity} from "react-native-gesture-handler";
import {CompositeScreenProps} from "@react-navigation/native";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {FemaleIcon, MaleIcon} from "@constants/iconPath";
import {isSplitTableDetails} from "@utils/table";
import dayjs from "dayjs";

type Props = CompositeScreenProps<
  StackScreenProps<
    CustomerStackParamList,
    typeof CustomerStackRoutes.GUEST_N_MENU
  >,
  StackScreenProps<RootStackParamList>
>;

const GuestAndOfferMenuScreen = ({navigation, route}: Props) => {
  const {
    open: addMenu,
    close: removeMenu,
    isOpen: wantToAddMenu,
  } = useDisclosure();

  const [menGuestCount, setMenGuestCount] = React.useState(0);
  const [womenGuestCount, setWomenGuestCount] = React.useState(0);

  const tableDetails = React.useMemo(
    () => route.params.tableDetails,
    [route.params.tableDetails],
  );

  const availableMenSeat = React.useMemo(() => {
    if (isSplitTableDetails(tableDetails)) {
      return tableDetails.men_seat - tableDetails.men_booked_seat;
    }
    return 0;
  }, [tableDetails]);

  const availableWomenSeat = React.useMemo(() => {
    if (isSplitTableDetails(tableDetails)) {
      return tableDetails.women_seat - tableDetails.women_booked_seat;
    }
    return 0;
  }, [tableDetails]);

  const handleMenCount = (num: number) => {
    if (isSplitTableDetails(tableDetails)) {
      setMenGuestCount(prevCount => {
        const newCount = prevCount + num;
        if (newCount < 0 || newCount > availableMenSeat) {
          return prevCount;
        }

        return newCount;
      });
    }
  };

  const handleWomenCount = (num: number) => {
    if (isSplitTableDetails(tableDetails)) {
      setWomenGuestCount(prevCount => {
        const newCount = prevCount + num;
        if (newCount < 0 || newCount > availableWomenSeat) {
          return prevCount;
        }

        return newCount;
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          paddingVertical: splitAppTheme.space[5],
          paddingHorizontal: splitAppTheme.space[6],
        }}>
        {isSplitTableDetails(tableDetails) && (
          <React.Fragment>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <View style={{flex: 1}}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      width: splitAppTheme.sizes[16],
                      height: splitAppTheme.sizes[16],
                      borderRadius: splitAppTheme.radii.full,
                      borderWidth: splitAppTheme.borderWidths[2],
                      borderColor: splitAppTheme.colors.secondary[600],
                    }}>
                    <MaleIcon />
                  </View>

                  <View style={{marginLeft: splitAppTheme.space[2]}}>
                    <Text
                      style={{
                        color: splitAppTheme.colors.black,
                        fontSize: splitAppTheme.fontSizes.xl,
                        fontFamily:
                          splitAppTheme.fontConfig.Sathoshi[700].normal,
                      }}>
                      {availableMenSeat} Seat
                    </Text>

                    <Text
                      style={{
                        marginTop: splitAppTheme.space["0.5"],
                        fontSize: splitAppTheme.fontSizes.md,
                        color: splitAppTheme.colors.coolGray[400],
                        fontFamily:
                          splitAppTheme.fontConfig.Sathoshi[700].normal,
                      }}>
                      ${tableDetails.men_seat_price}/Guest
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  <TouchableOpacity
                    disabled={menGuestCount === 0}
                    onPress={() => handleMenCount(-1)}
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      width: splitAppTheme.sizes[8],
                      height: splitAppTheme.sizes[8],
                      borderRadius: splitAppTheme.radii.full,
                      borderWidth: splitAppTheme.borderWidths[1],
                      borderColor: splitAppTheme.colors.secondary[500],
                    }}>
                    <MaterialIcons
                      name={"remove"}
                      size={18}
                      color={splitAppTheme.colors.secondary[500]}
                    />
                  </TouchableOpacity>

                  <Text
                    style={{
                      fontSize: splitAppTheme.fontSizes.xl,
                      marginHorizontal: splitAppTheme.space[5],
                      fontFamily: splitAppTheme.fontConfig.Roboto[700].normal,
                    }}>
                    {menGuestCount}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleMenCount(1)}
                    disabled={availableMenSeat <= menGuestCount}
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      height: splitAppTheme.sizes[8],
                      width: splitAppTheme.sizes[8],
                      borderRadius: splitAppTheme.radii.full,
                      borderWidth: splitAppTheme.borderWidths[1],
                      borderColor: splitAppTheme.colors.primary[500],
                    }}>
                    <MaterialIcons
                      name={"add"}
                      size={18}
                      color={splitAppTheme.colors.primary[500]}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: splitAppTheme.space[7],
              }}>
              <View style={{flex: 1}}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      width: splitAppTheme.sizes[16],
                      height: splitAppTheme.sizes[16],
                      borderRadius: splitAppTheme.radii.full,
                      borderWidth: splitAppTheme.borderWidths[2],
                      borderColor: splitAppTheme.colors.secondary[600],
                    }}>
                    <FemaleIcon />
                  </View>

                  <View style={{marginLeft: splitAppTheme.space[2]}}>
                    <Text
                      style={{
                        color: splitAppTheme.colors.black,
                        fontSize: splitAppTheme.fontSizes.xl,
                        fontFamily:
                          splitAppTheme.fontConfig.Sathoshi[700].normal,
                      }}>
                      {availableWomenSeat} Seat
                    </Text>

                    <Text
                      style={{
                        marginTop: splitAppTheme.space["0.5"],
                        fontSize: splitAppTheme.fontSizes.md,
                        color: splitAppTheme.colors.coolGray[400],
                        fontFamily:
                          splitAppTheme.fontConfig.Sathoshi[700].normal,
                      }}>
                      ${tableDetails.women_seat_price}/Guest
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  <TouchableOpacity
                    disabled={womenGuestCount === 0}
                    onPress={() => handleWomenCount(-1)}
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      width: splitAppTheme.sizes[8],
                      height: splitAppTheme.sizes[8],
                      borderRadius: splitAppTheme.radii.full,
                      borderWidth: splitAppTheme.borderWidths[1],
                      borderColor: splitAppTheme.colors.secondary[500],
                    }}>
                    <MaterialIcons
                      name={"remove"}
                      size={18}
                      color={splitAppTheme.colors.secondary[500]}
                    />
                  </TouchableOpacity>

                  <Text
                    style={{
                      fontSize: splitAppTheme.fontSizes.xl,
                      marginHorizontal: splitAppTheme.space[5],
                      fontFamily: splitAppTheme.fontConfig.Roboto[700].normal,
                    }}>
                    {womenGuestCount}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleWomenCount(1)}
                    disabled={availableWomenSeat <= womenGuestCount}
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      height: splitAppTheme.sizes[8],
                      width: splitAppTheme.sizes[8],
                      borderRadius: splitAppTheme.radii.full,
                      borderWidth: splitAppTheme.borderWidths[1],
                      borderColor: splitAppTheme.colors.primary[500],
                    }}>
                    <MaterialIcons
                      name={"add"}
                      size={18}
                      color={splitAppTheme.colors.primary[500]}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </React.Fragment>
        )}

        <View style={{marginTop: splitAppTheme.space[12]}}>
          <Text
            style={{
              color: "#030819",
              fontSize: splitAppTheme.fontSizes["2xl"],
              fontFamily: splitAppTheme.fontConfig.Sathoshi[500].normal,
            }}>
            Do you want to add offer menu items?
          </Text>

          <View style={{flexDirection: "row", marginTop: 20}}>
            {wantToAddMenu ? (
              <TouchableOpacity onPress={() => addMenu()}>
                <LinearGradient
                  colors={[
                    splitAppTheme.colors.secondary[500],
                    splitAppTheme.colors.primary[500],
                  ]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={{
                    height: 60,
                    width: 100,

                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: splitAppTheme.colors.white,
                      fontSize: splitAppTheme.fontSizes.md,
                      fontFamily: splitAppTheme.fontConfig.Sathoshi[500].normal,
                    }}>
                    Yes
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => addMenu()}
                style={{
                  height: 60,
                  width: 100,
                  borderWidth: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: splitAppTheme.colors.blue[500],
                }}>
                <Text
                  style={{
                    fontSize: splitAppTheme.fontSizes.md,
                    color: splitAppTheme.colors.blue[500],
                    fontFamily: splitAppTheme.fontConfig.Sathoshi[500].normal,
                  }}>
                  Yes
                </Text>
              </TouchableOpacity>
            )}

            {!wantToAddMenu ? (
              <TouchableOpacity onPress={() => removeMenu()}>
                <LinearGradient
                  colors={[
                    splitAppTheme.colors.secondary[500],
                    splitAppTheme.colors.primary[500],
                  ]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={{
                    height: 60,
                    width: 100,
                    marginLeft: 10,
                    borderRadius: 5,
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <Text
                    style={{
                      color: splitAppTheme.colors.white,
                      fontSize: splitAppTheme.fontSizes.md,
                      fontFamily: splitAppTheme.fontConfig.Sathoshi[500].normal,
                    }}>
                    No
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => removeMenu()}
                style={{
                  height: 60,
                  width: 100,
                  borderWidth: 1,
                  marginLeft: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: splitAppTheme.colors.blue[500],
                }}>
                <Text
                  style={{
                    fontSize: splitAppTheme.fontSizes.md,
                    color: splitAppTheme.colors.blue[500],
                    fontFamily: splitAppTheme.fontConfig.Sathoshi[500].normal,
                  }}>
                  No
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      <LinearGradient
        colors={[
          splitAppTheme.colors.secondary[500],
          splitAppTheme.colors.primary[500],
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          bottom: 0,
          width: "100%",
          flexDirection: "row",
          position: "absolute",
          alignItems: "center",
          paddingHorizontal: 20,
          justifyContent: "space-between",
          paddingVertical: splitAppTheme.space[3],
        }}>
        <View>
          <Text
            style={{
              color: splitAppTheme.colors.white,
              fontSize: splitAppTheme.fontSizes.sm,
              fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
            }}>
            {tableDetails.name}
          </Text>

          <Text
            style={{
              color: splitAppTheme.colors.white,
              fontSize: splitAppTheme.fontSizes.lg,
              fontFamily: splitAppTheme.fontConfig.Sathoshi[500].normal,
            }}>
            {dayjs(tableDetails.date, "YYYY-MM-DD HH:mm:ss").format(
              "DD MMM, hh:mm A",
            )}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            if (wantToAddMenu) {
              navigation.navigate(CustomerStackRoutes.ADD_MENU_ITEM, {
                menGuestCount,
                womenGuestCount,
                tableDetails: tableDetails,
              });
            } else {
              navigation.navigate(CustomerStackRoutes.BOOKING_DETAILS, {
                menGuestCount,
                womenGuestCount,
                menuListToAdd: [],
                tableDetails: tableDetails,
              });
            }
          }}
          style={styles.continueButton}>
          <Text
            style={{
              color: splitAppTheme.colors.primary[500],
              fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
              fontSize: splitAppTheme.fontSizes.md,
            }}>
            Continue
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  continueButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: splitAppTheme.radii.lg,
    paddingVertical: splitAppTheme.space[4],
    paddingHorizontal: splitAppTheme.space[5],
    backgroundColor: splitAppTheme.colors.white,
  },
});

export default GuestAndOfferMenuScreen;
