import React from "react";
import {TTableItem} from "./shared";
import {splitAppTheme} from "@src/theme";
import TableListItem from "./TableListItem";
import {ClubByLocationItem, TableType} from "@src/models";
import GenericListEmpty from "@components/GenericListEmpty";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useInfiniteGetTablesByLocationQuery from "@hooks/clubs/useInfiniteGetTablesByLocationQuery";

type Props = {
  locationId: number;
  onItemPress: (item: TTableItem) => void;
};

const TablesByLocationList = ({locationId, onItemPress}: Props) => {
  const [tableType, setTableType] = React.useState<TableType>("booked");

  const {
    refetch,
    isLoading,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    data: infiniteGetClubsByLocationsResponse,
  } = useInfiniteGetTablesByLocationQuery(
    {
      page: 1,
      locationId,
      tableType,
    },
    {
      getNextPageParam(lastPage) {
        if (lastPage.tables.has_more_data) {
          return {
            locationId,
            tableType,
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

  const renderClubList: ListRenderItem<ClubByLocationItem> = React.useCallback(
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

  // if (isLoading) {
  //   return (
  //     <Box p={6}>
  //       {new Array(7).fill(1).map((_, index) => (
  //         <Box width={"full"} key={index} mb={index === 6 ? 0 : 5}>
  //           <VStack
  //             space={8}
  //             width={"full"}
  //             borderRadius={"md"}
  //             borderWidth={"1"}
  //             overflow={"hidden"}>
  //             <Skeleton height={"32"} />
  //             <Skeleton.Text px={"2"} my={"4"} />
  //           </VStack>
  //         </Box>
  //       ))}
  //     </Box>
  //   );
  // }

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
          <TouchableOpacity onPress={() => setTableType("booked")}>
            <View
              style={{
                padding: splitAppTheme.space[3],
                borderRadius: splitAppTheme.radii.md,
                borderWidth: splitAppTheme.borderWidths[2],
                borderColor: splitAppTheme.colors.blue[300],
              }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: splitAppTheme.fontSizes.lg,
                  color: splitAppTheme.colors.blue[300],
                  fontFamily: splitAppTheme.fontConfig.Roboto[700].normal,
                }}>
                Book Table
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, marginLeft: splitAppTheme.space[3]}}>
          <TouchableOpacity onPress={() => setTableType("split")}>
            <View
              style={{
                padding: splitAppTheme.space[3],
                borderRadius: splitAppTheme.radii.md,
                borderWidth: splitAppTheme.borderWidths[2],
                borderColor: splitAppTheme.colors.secondary[300],
              }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: splitAppTheme.fontSizes.lg,
                  color: splitAppTheme.colors.secondary[300],
                  fontFamily: splitAppTheme.fontConfig.Roboto[700].normal,
                }}>
                Split Table
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={clubListData}
        onRefresh={refetch}
        refreshing={isRefetching}
        renderItem={renderClubList}
        onEndReached={handleFetchNextPage}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 0,
          padding: splitAppTheme.space[6],
        }}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View>
              <ActivityIndicator size={"small"} />
            </View>
          ) : null
        }
        ListEmptyComponent={<GenericListEmpty />}
      />
    </View>
  );
};

export default TablesByLocationList;
