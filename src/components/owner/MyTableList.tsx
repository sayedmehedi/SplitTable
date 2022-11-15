import React from "react";
import {TTableItem} from "./shared";
import {splitAppTheme} from "@src/theme";
import TableListItem from "./TableListItem";
import {AppTableTypes} from "@constants/table";
import {TableByLocationItem, TableType} from "@src/models";
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

type Props = {
  onItemPress: (item: TTableItem) => void;
};

const MyTableList = ({onItemPress}: Props) => {
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

  const renderTableItem: ListRenderItem<TableByLocationItem> =
    React.useCallback(
      ({item}) => (
        <TableListItem
          item={{
            id: item.id,
            date: item.date,
            name: item.name,
            image: item.image,
            location: item.location,
            distance: item.distance,
            total_joined: item.total_joined,
          }}
          onPress={onItemPress}
        />
      ),
      [onItemPress],
    );

  const handleFetchNextPage = React.useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  if (isInfiniteResourceLoading || isClubInfoLoading) {
    return <Text>Loading..</Text>;
  }

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          padding: splitAppTheme.space[6],
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <TouchableOpacity onPress={() => setTableType(AppTableTypes.BOOKED)}>
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
          <TouchableOpacity onPress={() => setTableType(AppTableTypes.SPLIT)}>
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
        contentContainerStyle={{
          paddingTop: 0,
          padding: splitAppTheme.space[6],
        }}
        ListEmptyComponent={<GenericListEmpty height={300} width={300} />}
      />
    </View>
  );
};

export default MyTableList;
