import React from "react";
import {splitAppTheme} from "@src/theme";
import {isSplitTableDetails} from "@utils/table";
import Ripple from "react-native-material-ripple";
import Entypo from "react-native-vector-icons/Entypo";
import {StackScreenProps} from "@react-navigation/stack";
import {CompositeScreenProps} from "@react-navigation/native";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {OwnerStackRoutes, RootStackRoutes} from "@constants/routes";
import {OwnerStackParamList, RootStackParamList} from "@src/navigation";
import EachTableNEventItem from "./OwnerTableScreen/EachTableNEventItem";
import useGetTableDetailsQuery from "@hooks/clubs/useGetTableDetailsQuery";
import {View, Text, ScrollView, Image, ActivityIndicator} from "react-native";
import FastImage from "react-native-fast-image";

type Props = CompositeScreenProps<
  StackScreenProps<OwnerStackParamList, typeof OwnerStackRoutes.TABLE_DETAILS>,
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

  if (!tableDetailsResponse) {
    return <Text>Not found</Text>;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        padding: splitAppTheme.space[6],
      }}>
      <EachTableNEventItem
        item={{
          id: tableDetailsResponse.id,
          date: tableDetailsResponse.date,
          name: tableDetailsResponse.name,
          image: tableDetailsResponse.image,
          location: tableDetailsResponse.location,
          distance: tableDetailsResponse.distance,
          total_joined: isSplitTableDetails(tableDetailsResponse)
            ? tableDetailsResponse.joined_users.length
            : undefined,
        }}
        onPress={() => {}}
        onUpdatePress={() => {}}
      />

      <View style={{marginTop: splitAppTheme.space[6]}}>
        <Text
          style={{
            fontSize: splitAppTheme.fontSizes.xl,
            fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
          }}>
          {isSplitTableDetails(tableDetailsResponse) ? "Guest List" : "Guest"}
        </Text>

        <View style={{marginTop: splitAppTheme.space[3]}}>
          {tableDetailsResponse.joined_users.length > 0 ? (
            tableDetailsResponse.joined_users.map((user, index) => (
              <Ripple
                key={index}
                onPress={() => {
                  navigation.navigate(RootStackRoutes.PROFILE, {
                    userId: user.id,
                  });
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: splitAppTheme.space[3],
                    borderBottomWidth: splitAppTheme.borderWidths[1],
                    borderBottomColor: splitAppTheme.colors.coolGray[300],
                  }}>
                  <View>
                    <FastImage
                      source={{uri: user.image}}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: splitAppTheme.radii.full,
                      }}
                    />
                  </View>

                  <View style={{marginLeft: splitAppTheme.space[3], flex: 1}}>
                    <Text
                      style={{
                        fontSize: splitAppTheme.fontSizes.md,
                        fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
                      }}>
                      {user.name}
                    </Text>
                  </View>

                  <View>
                    <Entypo name={"chevron-right"} size={30} />
                  </View>
                </View>
              </Ripple>
            ))
          ) : (
            <View>
              <Text>No Guest </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
