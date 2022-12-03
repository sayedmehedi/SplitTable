import React from "react";
import {TTableItem} from "./shared";
import {splitAppTheme} from "@src/theme";
import {AppTableTypes} from "@constants/table";
import {TableBySearchTerm, TableType} from "@src/models";
import GenericListEmpty from "@components/GenericListEmpty";
import useGetOwnerClubInfoQuery from "@hooks/clubs/useGetOwnerClubInfoQuery";
import useInfiniteGetTablesBySearchTermQuery from "@hooks/clubs/useInfiniteGetTablesBySearchTermQuery";
import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import EachTableNEventItem from "@screens/OWNER/OwnerTableScreen/EachTableNEventItem";

type Props = {
  old?: boolean;
  onItemPress: (item: TTableItem) => void;
  onUpdatePress: (item: TTableItem) => void;
};

const MyTableList = ({onItemPress, onUpdatePress, old = false}: Props) => {
  const [tableType, setTableType] = React.useState<TableType>(
    AppTableTypes.BOOKED,
  );

  const {data: clubInfoData, isLoading: isClubInfoLoading} =
    useGetOwnerClubInfoQuery();

  const {
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isInfiniteResourceLoading,
    data: infiniteGetClubsByLocationsResponse,
  } = useInfiniteGetTablesBySearchTermQuery(
    {
      old,
      page: 1,
      tableType,
      clubId: clubInfoData?.id,
    },
    {
      enabled: clubInfoData?.id !== undefined,
      getNextPageParam(lastPage) {
        if (lastPage.tables.has_more_data) {
          return {
            tableType,
            clubId: clubInfoData?.id,
            page: lastPage.tables.current_page + 1,
          };
        }
      },
    },
  );

  const clubListData = React.useMemo(() => {
    return (
      infiniteGetClubsByLocationsResponse?.pages.flatMap(eachPage => {
        return eachPage.tables.data;
      }) ?? []
    );
  }, [infiniteGetClubsByLocationsResponse?.pages]);

  const renderTableItem: ListRenderItem<TableBySearchTerm> = React.useCallback(
    ({item}) => (
      <EachTableNEventItem
        item={{
          id: item.id,
          date: item.date,
          name: item.name,
          image: item.image,
          location: item.location,
          distance: item.distance,
          total_joined: "total_joined" in item ? item.total_joined : undefined,
          status: item.status,
        }}
        onPress={onItemPress}
        onUpdatePress={onUpdatePress}
      />
    ),
    [onItemPress, onUpdatePress],
  );

  const handleFetchNextPage = React.useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  if (isInfiniteResourceLoading || isClubInfoLoading) {
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
        data={clubListData}
        onRefresh={refetch}
        refreshing={isRefetching}
        renderItem={renderTableItem}
        onEndReached={handleFetchNextPage}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View
            style={{
              flexDirection: "row",
              paddingVertical: splitAppTheme.space[6],
            }}>
            <View
              style={{
                flex: 1,
              }}>
              <TouchableOpacity
                onPress={() => setTableType(AppTableTypes.BOOKED)}>
                <View
                  style={{
                    padding: splitAppTheme.space[3],
                    borderRadius: splitAppTheme.radii.md,
                    borderWidth: splitAppTheme.borderWidths[2],
                    borderColor: splitAppTheme.colors.blue[300],
                    backgroundColor:
                      tableType === AppTableTypes.BOOKED
                        ? splitAppTheme.colors.blue[300]
                        : splitAppTheme.colors.white,
                  }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: splitAppTheme.fontSizes.lg,
                      fontFamily: splitAppTheme.fontConfig.Roboto[700].normal,
                      color:
                        tableType === AppTableTypes.BOOKED
                          ? splitAppTheme.colors.white
                          : splitAppTheme.colors.blue[300],
                    }}>
                    Book Table
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, marginLeft: splitAppTheme.space[3]}}>
              <TouchableOpacity
                onPress={() => setTableType(AppTableTypes.SPLIT)}>
                <View
                  style={{
                    padding: splitAppTheme.space[3],
                    borderRadius: splitAppTheme.radii.md,
                    borderWidth: splitAppTheme.borderWidths[2],
                    borderColor: splitAppTheme.colors.secondary[300],
                    backgroundColor:
                      tableType === AppTableTypes.SPLIT
                        ? splitAppTheme.colors.secondary[300]
                        : splitAppTheme.colors.white,
                  }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: splitAppTheme.fontSizes.lg,
                      fontFamily: splitAppTheme.fontConfig.Roboto[700].normal,
                      color:
                        tableType === AppTableTypes.SPLIT
                          ? splitAppTheme.colors.white
                          : splitAppTheme.colors.secondary[300],
                    }}>
                    Split Table
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        }
        contentContainerStyle={{
          paddingTop: 0,
          padding: splitAppTheme.space[6],
        }}
        ItemSeparatorComponent={() => (
          <View style={{height: splitAppTheme.space[4]}} />
        )}
        ListEmptyComponent={<GenericListEmpty height={300} width={300} />}
      />
    </View>
  );
};

export default MyTableList;
