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
  ActivityIndicator,
} from "react-native";
import {CustomerStackRoutes} from "@constants/routes";
import {StackNavigationProp} from "@react-navigation/stack";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import useGetClubDetailsQuery from "@hooks/clubs/useGetClubDetailsQuery";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";
import {CompositeNavigationProp, useNavigation} from "@react-navigation/native";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

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
            borderRadius: splitAppTheme.radii.lg,
            marginVertical: splitAppTheme.space[5],
            borderWidth: splitAppTheme.borderWidths[1],
            borderColor: splitAppTheme.colors.coolGray[300],
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
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: splitAppTheme.space[2],
                  borderRadius: splitAppTheme.radii.full,
                  backgroundColor: "rgba(72, 212, 255,0.1)",
                }}>
                <MaterialIcons
                  size={22}
                  name={"phone"}
                  color={splitAppTheme.colors.blue[400]}
                />
              </View>

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
                  backgroundColor: "rgba(72, 212, 255,0.2)",
                }}>
                <Fontisto
                  size={22}
                  name={"email"}
                  color={splitAppTheme.colors.blue[400]}
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
                  backgroundColor: "rgba(72, 212, 255,0.1)",
                }}>
                <MaterialCommunityIcons
                  size={22}
                  name={"food-outline"}
                  color={splitAppTheme.colors.blue[400]}
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
                  backgroundColor: "rgba(72, 212, 255,0.1)",
                }}>
                <MaterialCommunityIcons
                  size={22}
                  name={"currency-usd"}
                  color={splitAppTheme.colors.blue[400]}
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
                  fontSize: splitAppTheme.fontSizes.sm,
                  color: splitAppTheme.colors.blue[300],
                  fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                }}>
                ${clubDetailsResponse.club.min_avg_cost}-$
                {clubDetailsResponse.club.max_avg_cost}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            paddingBottom: splitAppTheme.space[3],
          }}>
          <Text
            style={{
              fontSize: splitAppTheme.fontSizes.md,
            }}>
            {clubDetailsResponse.club.about}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapStyles: {
    height: 200,
    borderRadius: splitAppTheme.radii.lg,
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
