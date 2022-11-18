import React from "react";
import {OwnerStackRoutes} from "@constants/routes";
import {ActivityIndicator, Text, TouchableOpacity, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {StackScreenProps} from "@react-navigation/stack";
import {CompositeScreenProps} from "@react-navigation/native";
import {OwnerStackParamList, RootStackParamList} from "@src/navigation";
import useInfiniteGetOwnerClubHolidays from "@hooks/clubs/useInfiniteGetOwnerClubHolidays";
import {splitAppTheme} from "@src/theme";
import GenericListEmpty from "@components/GenericListEmpty";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {Holiday} from "@src/models";
import useAppToast from "@hooks/useAppToast";
import useDeleteOwnerClubHolidayMutation from "@hooks/clubs/useDeleteOwnerClubHolidayMutation";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import {isResponseResultError} from "@utils/error-handling";

type Props = CompositeScreenProps<
  StackScreenProps<OwnerStackParamList, typeof OwnerStackRoutes.HOLIDAYS>,
  StackScreenProps<RootStackParamList>
>;

function EachHolidayItem({item}: {item: Holiday}) {
  const toast = useAppToast();

  const {
    mutate: deleteHoliday,
    error: deleteError,
    isLoading: isDeleting,
    data: deleteResponse,
  } = useDeleteOwnerClubHolidayMutation();
  useHandleNonFieldError(deleteError);
  useHandleResponseResultError(deleteResponse);

  const handleDeleteHoliday = React.useCallback(() => {
    deleteHoliday(
      {holidayId: item.id},
      {
        onSuccess(data) {
          if (!isResponseResultError(data)) {
            toast.success(data.success);
          }
        },
      },
    );
  }, [deleteHoliday]);

  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        padding: splitAppTheme.space[3],
        borderRadius: splitAppTheme.radii.md,
        borderWidth: splitAppTheme.borderWidths[1],
      }}>
      <View style={{flex: 1}}>
        <Text style={{fontSize: splitAppTheme.fontSizes.md}}>{item.date}</Text>

        <Text style={{fontSize: splitAppTheme.fontSizes.sm}}>{item.name}</Text>
      </View>

      <View>
        {isDeleting ? (
          <View style={{padding: splitAppTheme.space[3]}}>
            <ActivityIndicator color={"white"} size={"small"} />
          </View>
        ) : (
          <TouchableOpacity onPress={handleDeleteHoliday}>
            <MaterialIcons name={"close"} size={30} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default function HolidaysScreen({navigation}: Props) {
  const {
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isInfiniteResourceLoading,
    data: infiniteGetClubsByLocationsResponse,
  } = useInfiniteGetOwnerClubHolidays(
    {
      page: 1,
    },
    {
      getNextPageParam(lastPage) {
        if (lastPage.holidays.has_more_data) {
          return {
            page: lastPage.holidays.current_page + 1,
          };
        }
      },
    },
  );

  const handleFetchNextPage = React.useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const resourceListData = React.useMemo(() => {
    return (
      infiniteGetClubsByLocationsResponse?.pages.flatMap(eachPage => {
        return eachPage.holidays.data;
      }) ?? []
    );
  }, [infiniteGetClubsByLocationsResponse?.pages]);

  const handleDeleteHoliday = (holidayId: number) => {};

  if (isInfiniteResourceLoading) {
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
    <View>
      {isFetchingNextPage ? (
        <View>
          <ActivityIndicator size={"small"} />
        </View>
      ) : null}

      <FlatList
        data={resourceListData}
        onRefresh={refetch}
        refreshing={isRefetching}
        onEndReached={handleFetchNextPage}
        contentContainerStyle={{
          padding: splitAppTheme.space[6],
        }}
        ListHeaderComponentStyle={{
          paddingBottom: splitAppTheme.space[3],
        }}
        renderItem={({item}) => <EachHolidayItem item={item} />}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: splitAppTheme.space["3"],
            }}
          />
        )}
        ListHeaderComponent={
          <TouchableOpacity
            style={{
              height: 50,
              width: "100%",
              borderWidth: 2,
              borderColor: "#FF3FCB",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
            onPress={() => navigation.navigate(OwnerStackRoutes.ADD_HOLIDAY)}>
            <Text style={{color: "#FF3FCB"}}>+ Add Holiday</Text>
          </TouchableOpacity>
        }
        ListEmptyComponent={<GenericListEmpty height={300} width={300} />}
      />
    </View>
  );
}
