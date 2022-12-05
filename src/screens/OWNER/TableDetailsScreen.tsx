import React from "react";
import {splitAppTheme} from "@src/theme";
import useAppToast from "@hooks/useAppToast";
import FastImage from "react-native-fast-image";
import {isSplitTableDetails} from "@utils/table";
import Ripple from "react-native-material-ripple";
import {TableCancelStatusTypes} from "@constants/table";
import Entypo from "react-native-vector-icons/Entypo";
import {StackScreenProps} from "@react-navigation/stack";
import {CompositeScreenProps} from "@react-navigation/native";
import {isResponseResultError} from "@utils/error-handling";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {OwnerStackRoutes, RootStackRoutes} from "@constants/routes";
import {OwnerStackParamList, RootStackParamList} from "@src/navigation";
import useCancelBookingMutation from "@hooks/useCancelBookingMutation";
import EachTableNEventItem from "./OwnerTableScreen/EachTableNEventItem";
import useGetTableDetailsQuery from "@hooks/clubs/useGetTableDetailsQuery";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import {
  View,
  Text,
  Alert,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import {RefreshControl} from "react-native-gesture-handler";

type Props = CompositeScreenProps<
  StackScreenProps<OwnerStackParamList, typeof OwnerStackRoutes.TABLE_DETAILS>,
  StackScreenProps<RootStackParamList>
>;

export default function TableDetailsScreen({route, navigation}: Props) {
  const toast = useAppToast();

  const {
    refetch,
    isRefetching,
    data: tableDetailsResponse,
    isLoading: isTableDetailsLoading,
    error: tableDetailsError,
  } = useGetTableDetailsQuery(route.params.tableId);
  useHandleNonFieldError(tableDetailsError);

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
      refreshControl={
        <RefreshControl
          onRefresh={() => {
            refetch();
          }}
          refreshing={isRefetching}
        />
      }
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
          status: tableDetailsResponse.status,
        }}
        onPress={() => {}}
        onUpdatePress={table => {
          navigation.navigate(OwnerStackRoutes.UPSERT_TABLE, {
            actionMode: "update",
            tableId: table.id,
          });
        }}
      />

      <View style={{marginTop: splitAppTheme.space[6]}}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <Text
            style={{
              fontSize: splitAppTheme.fontSizes.xl,
              fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
            }}>
            {isSplitTableDetails(tableDetailsResponse) ? "Guest List" : "Guest"}
          </Text>

          {tableDetailsResponse.cancel_status === TableCancelStatusTypes.NULL &&
          tableDetailsResponse.can_cancel ? (
            <View>
              {isCancelling ? (
                <View style={{padding: splitAppTheme.space[3]}}>
                  <ActivityIndicator
                    size={"small"}
                    color={splitAppTheme.colors.secondary[400]}
                  />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert("Cancel Table", "Are your sure?", [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "Sure",
                        style: "destructive",
                        onPress() {
                          cancelBooking({
                            tableId: tableDetailsResponse.id,
                          });
                        },
                      },
                    ]);
                  }}>
                  <Text
                    style={{
                      color: splitAppTheme.colors.red[400],
                      fontFamily: splitAppTheme.fontConfig.Roboto[400].normal,
                    }}>
                    Cancel Table
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <Text
              style={{
                color: splitAppTheme.colors.red[400],
              }}>
              Canceled
            </Text>
          )}
        </View>

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
