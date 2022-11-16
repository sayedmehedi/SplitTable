import React from "react";
import {splitAppTheme} from "@src/theme";
import {isSplitTableDetails} from "@utils/table";
import {CustomerStackRoutes, RootStackRoutes} from "@constants/routes";
import {StackScreenProps} from "@react-navigation/stack";
import {View, Text, ScrollView, Image} from "react-native";
import {CompositeScreenProps} from "@react-navigation/native";
import EachTableNEventItem from "@components/EachTableNEventItem";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";
import useGetTableDetailsQuery from "@hooks/clubs/useGetTableDetailsQuery";
import Entypo from "react-native-vector-icons/Entypo";
import Ripple from "react-native-material-ripple";

type Props = CompositeScreenProps<
  StackScreenProps<
    CustomerStackParamList,
    typeof CustomerStackRoutes.JOIN_TABLE_DETAILS
  >,
  StackScreenProps<RootStackParamList>
>;

export default function JoinTableDetailsScreen({route, navigation}: Props) {
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
        }}
        onPress={() => {}}
      />

      <View style={{marginTop: splitAppTheme.space[6]}}>
        <Text
          style={{
            fontSize: splitAppTheme.fontSizes.xl,
            fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
          }}>
          Join My Table
        </Text>

        <View style={{marginTop: splitAppTheme.space[3]}}>
          {isSplitTableDetails(tableDetailsResponse) &&
          tableDetailsResponse.joined_users.length > 0 ? (
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
                    <Image
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
