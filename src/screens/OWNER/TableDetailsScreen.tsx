import React from "react";
import {splitAppTheme} from "@src/theme";
import {OwnerStackRoutes} from "@constants/routes";
import {StackScreenProps} from "@react-navigation/stack";
import {View, Text, ScrollView, Image, ActivityIndicator} from "react-native";
import {CompositeScreenProps} from "@react-navigation/native";
import {OwnerStackParamList, RootStackParamList} from "@src/navigation";
import useGetTableDetailsQuery from "@hooks/clubs/useGetTableDetailsQuery";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import EachTableNEventItem from "./OwnerTableScreen/EachTableNEventItem";
import {isBookedTableDetails, isSplitTableDetails} from "@utils/table";

type Props = CompositeScreenProps<
  StackScreenProps<OwnerStackParamList, typeof OwnerStackRoutes.TABLE_DETAILS>,
  StackScreenProps<RootStackParamList>
>;

export default function TableDetailsScreen({route}: Props) {
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
          date: tableDetailsResponse.date,
          id: tableDetailsResponse.id,
          distance: tableDetailsResponse.distance,
          image: tableDetailsResponse.image,
          location: tableDetailsResponse.location,
          name: tableDetailsResponse.name,
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
          Guest List
        </Text>

        <View style={{marginTop: splitAppTheme.space[3]}}>
          {isSplitTableDetails(tableDetailsResponse) &&
          tableDetailsResponse.joined_users.length > 0 ? (
            tableDetailsResponse.joined_users.map((user, index) => (
              <View
                key={index}
                style={{flexDirection: "row", alignItems: "center"}}>
                <View>
                  <Image
                    source={{uri: user.image}}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: splitAppTheme.radii.full,
                    }}
                  />
                </View>

                <View style={{marginLeft: splitAppTheme.space[3]}}>
                  <Text
                    style={{
                      fontSize: splitAppTheme.fontSizes.md,
                      fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
                    }}>
                    {user.name}
                  </Text>
                </View>
              </View>
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
