import React from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import {splitAppTheme} from "@src/theme";
import {Rating} from "react-native-ratings";
import {
  CalendarIcon,
  Clock,
  DishIcon,
  DjIcon,
  FemaleIcon,
  GroupIcon,
  MaleIcon,
  MapIcon,
  MapMarkerPrimaryIcon,
  PeopleIcon,
} from "@constants/iconPath";
import {CustomerStackRoutes} from "@constants/routes";
import Entypo from "react-native-vector-icons/Entypo";
import {StackScreenProps} from "@react-navigation/stack";
import {CompositeScreenProps} from "@react-navigation/native";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";
import useGetTableDetailsQuery from "@hooks/clubs/useGetTableDetailsQuery";
import {isBookedTableDetails, isSplitTableDetails} from "@utils/table";
import AppGradientButton from "@components/AppGradientButton";

type Props = CompositeScreenProps<
  StackScreenProps<
    CustomerStackParamList,
    typeof CustomerStackRoutes.TABLE_DETAILS
  >,
  StackScreenProps<RootStackParamList>
>;

export default function TableDetailsScreen({route, navigation}: Props) {
  const {
    data: tableDetailsResponse,
    isLoading: isTableDetailsLoading,
    error: tableDetailsError,
  } = useGetTableDetailsQuery(route.params.tableId);
  useHandleNonFieldError(tableDetailsError);

  const handleBookTable = () => {
    if (tableDetailsResponse) {
      navigation.navigate(CustomerStackRoutes.GUEST_N_MENU, {
        tableDetails: tableDetailsResponse,
      });
    }
  };

  const availableMenSeat = React.useMemo(() => {
    if (
      !tableDetailsResponse ||
      "error" in tableDetailsResponse ||
      isBookedTableDetails(tableDetailsResponse)
    ) {
      return 0;
    }

    const {men_booked_seat, men_seat} = tableDetailsResponse;

    return men_seat - men_booked_seat;
  }, [tableDetailsResponse]);

  const availableWomenSeat = React.useMemo(() => {
    if (
      !tableDetailsResponse ||
      "error" in tableDetailsResponse ||
      isBookedTableDetails(tableDetailsResponse)
    ) {
      return 0;
    }

    const {women_booked_seat, women_seat} = tableDetailsResponse;

    return women_seat - women_booked_seat;
  }, [tableDetailsResponse]);

  if (isTableDetailsLoading) {
    return <Text>Loading...</Text>;
  }

  if (!tableDetailsResponse) {
    return <Text>Not found</Text>;
  }

  return (
    <ScrollView>
      <StatusBar translucent backgroundColor={"transparent"} />
      <ImageBackground source={{uri: tableDetailsResponse.image}}>
        <SafeAreaView
          style={{
            height: 300,
            width: splitAppTheme.sizes.full,
            paddingTop: splitAppTheme.space[12],
            paddingHorizontal: splitAppTheme.space[6],
          }}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <View>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Entypo
                  name={"chevron-left"}
                  size={splitAppTheme.sizes[8]}
                  color={splitAppTheme.colors.white}
                />
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Entypo
                  name={"share"}
                  size={splitAppTheme.sizes[8]}
                  color={splitAppTheme.colors.white}
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>

      {/* EVENT NAME & INITIAL */}
      <View style={{overflow: "hidden", paddingBottom: splitAppTheme.space[5]}}>
        <View
          style={[
            {
              paddingVertical: splitAppTheme.space[4],
              paddingHorizontal: splitAppTheme.space[6],
              backgroundColor: splitAppTheme.colors.white,
            },
            splitAppTheme.shadows[4],
          ]}>
          <View>
            <Text
              style={{
                fontSize: splitAppTheme.fontSizes.xl,
                fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
              }}>
              {tableDetailsResponse.name}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: splitAppTheme.space[2],
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <View>
                <Clock
                  width={20}
                  height={20}
                  color={splitAppTheme.colors.secondary[300]}
                />
              </View>
              <View style={{marginLeft: splitAppTheme.space[2]}}>
                <Text
                  style={{
                    fontSize: splitAppTheme.fontSizes.sm,
                    fontFamily: splitAppTheme.fontConfig.Roboto[400].normal,
                  }}>
                  {tableDetailsResponse.date}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <View>
                <MapIcon
                  width={20}
                  height={20}
                  color={splitAppTheme.colors.secondary[300]}
                />
              </View>

              <View style={{marginLeft: splitAppTheme.space[2]}}>
                <Text
                  style={{
                    fontSize: splitAppTheme.fontSizes.sm,
                    fontFamily: splitAppTheme.fontConfig.Roboto[400].normal,
                  }}>
                  {tableDetailsResponse.location}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* CLUB INFO */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(CustomerStackRoutes.CLUB_DETAILS, {
            clubId: tableDetailsResponse.club_id,
          });
        }}>
        <View
          style={[
            {
              justifyContent: "space-between",
              paddingHorizontal: splitAppTheme.space[6],
            },
          ]}>
          <View
            style={[
              {
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}>
            <View style={{flex: 1, paddingBottom: splitAppTheme.space[5]}}>
              <View>
                <Text
                  style={{
                    fontSize: splitAppTheme.fontSizes.xl,
                    fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                  }}>
                  {tableDetailsResponse.club_name}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: splitAppTheme.space[2],
                }}>
                <View>
                  <Rating
                    readonly
                    jumpValue={1}
                    imageSize={20}
                    type={"custom"}
                    showRating={false}
                    startingValue={tableDetailsResponse.rating}
                    ratingBackgroundColor={splitAppTheme.colors.coolGray[100]}
                  />
                </View>
                <View style={{marginLeft: splitAppTheme.space[3]}}>
                  <Text>{tableDetailsResponse.rating}/5</Text>
                </View>
              </View>
            </View>

            <View>
              <Entypo
                name={"chevron-right"}
                size={splitAppTheme.sizes[10]}
                color={splitAppTheme.colors.secondary[400]}
              />
            </View>
          </View>

          <View
            style={{
              height: splitAppTheme.sizes["0.5"],
              width: splitAppTheme.sizes.full,
              backgroundColor: splitAppTheme.colors.coolGray[100],
            }}></View>
        </View>
      </TouchableOpacity>

      {/* EVENTS INFO */}
      <View
        style={{
          paddingTop: splitAppTheme.space[4],
          paddingHorizontal: splitAppTheme.space[6],
        }}>
        <View>
          <Text
            style={{
              fontSize: splitAppTheme.fontSizes.xl,
              fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
            }}>
            Table/Events Info
          </Text>
        </View>

        <View
          style={{
            marginTop: splitAppTheme.space[2],
          }}>
          <Text>{tableDetailsResponse.description}</Text>
        </View>

        {/* LIST */}
        <View style={{marginTop: splitAppTheme.space[5]}}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: splitAppTheme.space[4],
            }}>
            <View
              style={{
                height: splitAppTheme.sizes[9],
                width: splitAppTheme.sizes[9],
                borderRadius: splitAppTheme.radii.full,
                backgroundColor: "rgba(255, 63, 204, 0.2)",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <DjIcon
                height={splitAppTheme.sizes[5]}
                width={splitAppTheme.sizes[5]}
              />
            </View>

            <View style={{marginLeft: splitAppTheme.space[3]}}>
              <Text>{tableDetailsResponse.performer}</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: splitAppTheme.space[4],
            }}>
            <View
              style={{
                height: splitAppTheme.sizes[9],
                width: splitAppTheme.sizes[9],
                borderRadius: splitAppTheme.radii.full,
                backgroundColor: "rgba(255, 63, 204, 0.2)",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <DishIcon
                height={splitAppTheme.sizes[5]}
                width={splitAppTheme.sizes[5]}
              />
            </View>

            <View style={{marginLeft: splitAppTheme.space[3]}}>
              <Text>{tableDetailsResponse.cuisines}</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: splitAppTheme.space[4],
            }}>
            <View
              style={{
                height: splitAppTheme.sizes[9],
                width: splitAppTheme.sizes[9],
                borderRadius: splitAppTheme.radii.full,
                backgroundColor: "rgba(255, 63, 204, 0.2)",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <CalendarIcon
                height={splitAppTheme.sizes[5]}
                width={splitAppTheme.sizes[5]}
              />
            </View>

            <View style={{marginLeft: splitAppTheme.space[3]}}>
              <Text>Min {tableDetailsResponse.min_age} years age</Text>
            </View>
          </View>

          {isSplitTableDetails(tableDetailsResponse) &&
            tableDetailsResponse.joined_users.length > 0 && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: splitAppTheme.space[4],
                }}>
                <View
                  style={{
                    height: splitAppTheme.sizes[9],
                    width: splitAppTheme.sizes[9],
                    borderRadius: splitAppTheme.radii.full,
                    backgroundColor: "rgba(255, 63, 204, 0.2)",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <PeopleIcon
                    height={splitAppTheme.sizes[5]}
                    width={splitAppTheme.sizes[5]}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: splitAppTheme.space[3],
                  }}>
                  {tableDetailsResponse.joined_users.map((user, index) => (
                    <Image
                      key={index}
                      source={{uri: user.image}}
                      style={{
                        width: splitAppTheme.sizes[9],
                        height: splitAppTheme.sizes[9],
                        marginRight: splitAppTheme.space[2],
                        borderRadius: splitAppTheme.radii.full,
                      }}
                    />
                  ))}
                </View>
              </View>
            )}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: splitAppTheme.space[4],
            }}>
            <View
              style={{
                height: splitAppTheme.sizes[9],
                width: splitAppTheme.sizes[9],
                borderRadius: splitAppTheme.radii.full,
                backgroundColor: "rgba(255, 63, 204, 0.2)",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <MapMarkerPrimaryIcon
                height={splitAppTheme.sizes[5]}
                width={splitAppTheme.sizes[5]}
              />
            </View>

            <View style={{marginLeft: splitAppTheme.space[3]}}>
              <Text>{tableDetailsResponse.club_location}</Text>
            </View>
          </View>
        </View>
      </View>

      {isSplitTableDetails(tableDetailsResponse) && (
        <View
          style={{
            marginTop: splitAppTheme.space[5],
            paddingHorizontal: splitAppTheme.space[6],
          }}>
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
                  fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                }}>
                {availableMenSeat} Seat
              </Text>

              <Text
                style={{
                  marginTop: splitAppTheme.space["0.5"],
                  fontSize: splitAppTheme.fontSizes.md,
                  color: splitAppTheme.colors.coolGray[400],
                  fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                }}>
                ${tableDetailsResponse.men_seat_price}/Guest
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: splitAppTheme.space[4],
            }}>
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
                  fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                }}>
                {availableWomenSeat} Seat
              </Text>

              <Text
                style={{
                  marginTop: splitAppTheme.space["0.5"],
                  fontSize: splitAppTheme.fontSizes.md,
                  color: splitAppTheme.colors.coolGray[400],
                  fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                }}>
                ${tableDetailsResponse.women_seat_price}/Guest
              </Text>
            </View>
          </View>

          <View style={{marginVertical: splitAppTheme.space[6]}}>
            <AppGradientButton
              color={"primary"}
              variant={"solid"}
              title={"Join Now"}
              onPress={handleBookTable}
            />
          </View>
        </View>
      )}

      {isBookedTableDetails(tableDetailsResponse) && (
        <View
          style={{
            marginTop: splitAppTheme.space[5],
            paddingHorizontal: splitAppTheme.space[6],
          }}>
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
              <GroupIcon />
            </View>

            <View style={{marginLeft: splitAppTheme.space[2]}}>
              <Text
                style={{
                  color: splitAppTheme.colors.black,
                  fontSize: splitAppTheme.fontSizes.xl,
                  fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                }}>
                {tableDetailsResponse.total_seat} Seat
              </Text>

              <Text
                style={{
                  marginTop: splitAppTheme.space["0.5"],
                  fontSize: splitAppTheme.fontSizes.md,
                  color: splitAppTheme.colors.coolGray[400],
                  fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                }}>
                ${tableDetailsResponse.price}/Whole Table
              </Text>
            </View>
          </View>

          <View style={{marginVertical: splitAppTheme.space[6]}}>
            <AppGradientButton
              color={"primary"}
              variant={"solid"}
              title={"Book Table"}
              onPress={handleBookTable}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
}
