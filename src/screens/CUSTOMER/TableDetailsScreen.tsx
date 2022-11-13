import React from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {CustomerStackRoutes} from "@constants/routes";
import {StackScreenProps} from "@react-navigation/stack";
import {CompositeScreenProps} from "@react-navigation/native";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";
import useGetTableDetailsQuery from "@hooks/clubs/useGetTableDetailsQuery";
import Ripple from "react-native-material-ripple";
import Entypo from "react-native-vector-icons/Entypo";
import {splitAppTheme} from "@src/theme";
import {Clock, MapIcon} from "@constants/iconPath";
import {Rating} from "react-native-ratings";

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

      {/* EVENT NAME */}
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
                  {tableDetailsResponse.club_location}
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

      {/*  */}
      <View></View>
    </ScrollView>
  );
}
