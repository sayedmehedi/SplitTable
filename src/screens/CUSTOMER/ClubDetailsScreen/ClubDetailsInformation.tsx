import dayjs from "dayjs";
import React from "react";
import MapView from "react-native-maps";
import {splitAppTheme} from "@src/theme";
import relativeTime from "dayjs/plugin/relativeTime";
import {useDimensions} from "@react-native-community/hooks";
import GenericListEmpty from "@components/GenericListEmpty";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {TableListTypes} from "@constants/table";
import {CustomerStackRoutes} from "@constants/routes";
import LinearGradient from "react-native-linear-gradient";
import {StackNavigationProp} from "@react-navigation/stack";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import useGetClubDetailsQuery from "@hooks/clubs/useGetClubDetailsQuery";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";
import {CompositeNavigationProp, useNavigation} from "@react-navigation/native";

dayjs.extend(relativeTime);

const windowDimension = Dimensions.get("window");

type Props = {
  clubId: number;
};

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<
    CustomerStackParamList,
    typeof CustomerStackRoutes.TABLE_LIST
  >,
  StackNavigationProp<RootStackParamList>
>;

const ClubDetailsInformation = ({clubId}: Props) => {
  const {
    window: {width: WINDOW_WIDTH},
  } = useDimensions();
  const navigation = useNavigation<NavigationProp>();

  const {
    error: clubDetailsError,
    data: clubDetailsResponse,
    isLoading: isClubDetailsLoading,
  } = useGetClubDetailsQuery(clubId);
  useHandleNonFieldError(clubDetailsError);

  if (isClubDetailsLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
    // return (
    //   <ScrollView>
    //     <Skeleton height={300} />

    //     <View mx={"6"}>
    //       <Skeleton
    //         width={"full"}
    //         borderRadius={"xl"}
    //         height={CARD_HEIGHT}
    //         bg={"tomato"}
    //         marginTop={CARD_NEGATIVE_MARGIN}
    //       />

    //       <Skeleton
    //         height={"12"}
    //         my={"5"}
    //         width={"full"}
    //         borderRadius={"lg"}
    //         borderWidth={"2"}
    //         borderColor={"primary.300"}
    //       />

    //       <HStack space={"2"}>
    //         <View flex={1}>
    //           <Skeleton
    //             height={"12"}
    //             my={"5"}
    //             width={"full"}
    //             borderRadius={"lg"}
    //             bg={"secondary.300"}
    //           />
    //         </View>

    //         <View flex={1}>
    //           <Skeleton
    //             height={"12"}
    //             my={"5"}
    //             width={"full"}
    //             borderRadius={"lg"}
    //             bg={"blue.300"}
    //           />
    //         </View>

    //         <View flex={1}>
    //           <Skeleton
    //             height={"12"}
    //             my={"5"}
    //             width={"full"}
    //             borderRadius={"lg"}
    //             bg={"secondary.100"}
    //           />
    //         </View>
    //       </HStack>
    //     </View>

    //     <View p={6}>
    //       {new Array(5).fill(1).map((_, i) => (
    //         <Center width={"full"} key={i}>
    //           <HStack width={"full"} height={"32"} space={"5"} borderRadius={"md"}>
    //             <Skeleton
    //               height={"24"}
    //               width={"24"}
    //               borderRadius={"sm"}
    //               startColor="coolGray.100"
    //             />
    //             <VStack flex={"3"} space={"2.5"}>
    //               <Skeleton height={"5"} startColor="amber.300" />
    //               <Skeleton.Text lines={2} />

    //               <HStack space="2" alignItems="center">
    //                 <Skeleton size={"5"} borderRadius={"full"} />
    //                 <Skeleton height={"3"} flex={"2"} borderRadius={"full"} />
    //                 <Skeleton
    //                   height={"3"}
    //                   flex={"1"}
    //                   borderRadius={"full"}
    //                   startColor={"indigo.300"}
    //                 />
    //               </HStack>
    //             </VStack>
    //           </HStack>
    //         </Center>
    //       ))}
    //     </View>
    //   </ScrollView>
    // );
  }

  if (!clubDetailsResponse) {
    return (
      <View
        style={{
          width: WINDOW_WIDTH,
          flexDirection: "row",
          height: splitAppTheme.sizes.full,
        }}>
        <View
          style={{
            width: splitAppTheme.sizes.full,
            height: splitAppTheme.sizes.full,
          }}>
          <GenericListEmpty height={300} width={300} />
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        width: WINDOW_WIDTH,
        position: "relative",
        paddingHorizontal: splitAppTheme.space[6],
      }}>
      <View>
        <View
          style={{
            marginVertical: splitAppTheme.space[5],
          }}>
          <MapView
            zoomEnabled={false}
            style={styles.mapStyles}
            zoomControlEnabled={false}
            region={{
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
              latitude: clubDetailsResponse.club.latitude,
              longitude: clubDetailsResponse.club.longitude,
            }}
          />
        </View>

        <View
          style={{
            flexWrap: "wrap",
          }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: splitAppTheme.sizes.full,
              marginBottom: splitAppTheme.space[5],
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}>
              {/* <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    padding: splitAppTheme.space[2],
                    borderRadius: splitAppTheme.radii.full,
                    backgroundColor: "rgba(72, 212, 255,0.5)",
                  }}>
                  <MaterialIcons
                    size={22}
                    name={"phone"}
                    color={splitAppTheme.colors.blue[300]}
                  />
                </View> */}

              <Text
                style={{
                  fontSize: splitAppTheme.fontSizes.md,
                  marginLeft: splitAppTheme.space[2],
                }}>
                Phone:
              </Text>
            </View>

            <View>
              <Text
                style={{
                  fontSize: splitAppTheme.fontSizes.md,
                }}>
                {clubDetailsResponse.club.phone}
              </Text>
            </View>
          </View>

          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              width: splitAppTheme.sizes.full,
              marginBottom: splitAppTheme.space[5],
            }}>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
              }}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: splitAppTheme.space[2],
                  borderRadius: splitAppTheme.radii.full,
                  backgroundColor: "rgba(72, 212, 255,0.5)",
                }}>
                <MaterialIcons
                  size={22}
                  name={"email"}
                  color={splitAppTheme.colors.blue[300]}
                />
              </View>

              <Text
                style={{
                  fontSize: splitAppTheme.fontSizes.md,
                  marginLeft: splitAppTheme.space[2],
                }}>
                Email:
              </Text>
            </View>

            <View>
              <Text
                style={{
                  fontSize: splitAppTheme.fontSizes.md,
                }}>
                {clubDetailsResponse.club.email}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: splitAppTheme.sizes.full,
              marginBottom: splitAppTheme.space[5],
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: splitAppTheme.space[2],
                  borderRadius: splitAppTheme.radii.full,
                  backgroundColor: "rgba(72, 212, 255,0.5)",
                }}>
                <MaterialIcons
                  size={22}
                  name={"shopping-bag"}
                  color={splitAppTheme.colors.blue[300]}
                />
              </View>

              <Text
                style={{
                  marginLeft: splitAppTheme.space[2],
                  fontSize: splitAppTheme.fontSizes.md,
                }}>
                Cuisines:
              </Text>
            </View>

            <View>
              <Text
                style={{
                  fontSize: splitAppTheme.fontSizes.md,
                }}>
                {clubDetailsResponse.club.cuisine}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: splitAppTheme.sizes.full,
              marginBottom: splitAppTheme.space[5],
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: splitAppTheme.space[2],
                  borderRadius: splitAppTheme.radii.full,
                  backgroundColor: "rgba(72, 212, 255,0.5)",
                }}>
                <MaterialIcons
                  size={22}
                  name={"shopping-bag"}
                  color={splitAppTheme.colors.blue[300]}
                />
              </View>

              <Text
                style={{
                  marginLeft: splitAppTheme.space[2],
                  fontSize: splitAppTheme.fontSizes.md,
                }}>
                Average Cost:
              </Text>
            </View>

            <View>
              <Text
                style={{
                  marginLeft: splitAppTheme.space[2],
                  fontSize: splitAppTheme.fontSizes.md,
                  color: splitAppTheme.colors.blue[300],
                  fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                }}>
                ${clubDetailsResponse.club.min_avg_cost}-$
                {clubDetailsResponse.club.max_avg_cost}
              </Text>
            </View>
          </View>
        </View>

        <View>
          <Text
            style={{
              fontSize: splitAppTheme.fontSizes.md,
            }}>
            {clubDetailsResponse.club.about}
          </Text>
        </View>
      </View>

      <View
        style={{
          bottom: 0,
          width: WINDOW_WIDTH,
          position: "absolute",
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(CustomerStackRoutes.TABLE_LIST, {
              listType: TableListTypes.BY_CLUB_ID,
              clubId: clubDetailsResponse.club.id,
              headerTitle: clubDetailsResponse.club.name,
            });
          }}>
          <LinearGradient
            colors={[
              splitAppTheme.colors.secondary[500],
              splitAppTheme.colors.primary[500],
            ]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: splitAppTheme.sizes.full,
              paddingVertical: splitAppTheme.space[5],
            }}>
            <View
              style={{
                justifyContent: "center",
                width: splitAppTheme.sizes.full,
              }}>
              <Text
                style={{
                  textAlign: "center",
                  color: splitAppTheme.colors.white,
                  fontSize: splitAppTheme.fontSizes.lg,
                  fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
                }}>
                View This Club Table & Events
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapStyles: {
    height: 200,
    borderRadius: 20,
  },
  bookButton: {
    width: "100%",
    borderWidth: 3,
    borderRadius: 8,
    marginVertical: 15,
    alignItems: "center",
    borderColor: "#FF3FCB",
    justifyContent: "center",
  },
  ImageBackground: {
    height: 300,
    width: windowDimension.width * 1,
  },
  linearGradientButtons: {
    flex: 1,
    padding: 10,
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ClubDetailsInformation;
