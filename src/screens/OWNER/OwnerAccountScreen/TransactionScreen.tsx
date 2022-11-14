import React from "react";
import dayjs from "dayjs";
import {Transaction} from "@src/models";
import {splitAppTheme} from "@src/theme";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ListRenderItem,
  ActivityIndicator,
} from "react-native";
import useInfiniteGetTransactionsQuery from "@hooks/user/useInfiniteGetTransactionsQuery";
import useGetClubInfoQuery from "@hooks/clubs/useGetClubInfoQuery";

const keyExtractor = (item: {id: number}) => `${item.id.toString()}`;

interface TransactionItem extends Omit<Transaction, "date"> {
  date: dayjs.Dayjs;
}

const renderTransactionList: ListRenderItem<TransactionItem> = ({item}) => (
  <View
    key={item.id}
    style={{
      height: 100,
      width: "100%",
      borderWidth: 1,
      borderRadius: 8,
      marginVertical: 5,
      alignItems: "center",
      flexDirection: "row",
      paddingHorizontal: 20,
      backgroundColor: "white",
      borderColor: "#F1F1F1",
      justifyContent: "space-around",
    }}>
    <View style={{alignItems: "center"}}>
      <Text
        style={{
          fontFamily: "Satoshi-Regular",
          fontSize: 12,
          color: "#8A8D9F",
        }}>
        {item.date.format("DD")}
      </Text>
      <Text
        style={{
          fontFamily: "SatoshiVariable-Bold",
          fontSize: 20,
          color: "#8A8D9F",
        }}>
        {item.date.format("MMM")}
      </Text>
      <Text
        style={{
          fontFamily: "Satoshi-Regular",
          fontSize: 12,
          color: "#8A8D9F",
        }}>
        {item.date.format("HH:mm")}
      </Text>
    </View>

    <View>
      <Text
        style={{
          fontFamily: "SatoshiVariable-Bold",
          fontSize: 14,
          color: "#262B2E",
        }}>
        {item.club}
      </Text>
      <View style={{flexDirection: "row", marginVertical: 4}}>
        <Text
          style={{
            fontFamily: "Satoshi-Regular",
            fontSize: 12,
            color: "#8A8D9F",
          }}>
          {item.tables} |
        </Text>
        <Text
          style={{
            fontFamily: "Satoshi-Regular",
            fontSize: 12,
            color: "#8A8D9F",
          }}>
          {" "}
          {item.no_of_guest} Guest
        </Text>
      </View>
      <View style={{flexDirection: "row", alignItems: "center"}}>
        <View
          style={[
            styles.dot,
            {
              backgroundColor:
                item.status === "Pending"
                  ? splitAppTheme.colors.blue[300]
                  : splitAppTheme.colors.red[300],
            },
          ]}
        />
        <Text
          style={{
            fontSize: 10,
            color:
              item.status === "Pending"
                ? splitAppTheme.colors.blue[300]
                : splitAppTheme.colors.red[300],
            fontFamily: "Satoshi-Regular",
          }}>
          {item.status}
        </Text>
      </View>
    </View>

    <View>
      <Text
        style={{
          fontSize: 10,
          color: "#8A8D9F",
          alignSelf: "flex-end",
          fontFamily: "Satoshi-Regular",
        }}>
        {item.payment_method}
      </Text>
      <Text
        style={{
          fontSize: 18,
          color: "#262B2E",
          fontFamily: "SatoshiVariable-Bold",
        }}>
        {item.amount}
      </Text>
    </View>
  </View>
);

const TransactionScreen = () => {
  const {data: clubInfoData, isLoading: isClubInfoLoading} =
    useGetClubInfoQuery();

  const {
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    error: infiniteGetResourcesError,
    data: infiniteGetResourcesResponse,
    isLoading: isLoadingInfiniteResources,
  } = useInfiniteGetTransactionsQuery(
    {
      page: 1,
      clubId: clubInfoData?.id,
    },
    {
      enabled: clubInfoData?.id !== undefined,
      getNextPageParam(lastPage) {
        if (lastPage.transactions?.has_more_data) {
          return {
            page: lastPage.transactions.current_page + 1,
          };
        }
      },
    },
  );
  useHandleNonFieldError(infiniteGetResourcesError);

  const resourceListData = React.useMemo(() => {
    return (
      infiniteGetResourcesResponse?.pages?.flatMap(eachPage => {
        return (
          eachPage?.transactions?.data?.map(eachData => ({
            ...eachData,
            date: dayjs(eachData.date, "DD MMM, hh:mm A"),
          })) ?? []
        );
      }) ?? ([] as TransactionItem[])
    );
  }, [infiniteGetResourcesResponse?.pages]);

  console.log("resourceListData", resourceListData[0]);

  const handleFetchNextPage = React.useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  if (isLoadingInfiniteResources || isClubInfoLoading) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
    // return (
    //   <ScrollView>
    //     {ListHeaderComponent}

    //     <View p={6}>
    //       {new Array(5).fill(1).map((_, i) => (
    //         <Center width={"full"} key={i}>
    //           <HStack width={"full"} height={"32"} space={"5"} borderRadius={"md"}>
    //             <Skeleton
    //               height={"24"}
    //               width={"24"}
    //               borderRadius={"sm"}
    //               startColor="coolGray.100"
    //             />
    //             <VStack flex={"3"} space={"2.5"}>
    //               <Skeleton height={"5"} startColor="amber.300" />
    //               <Skeleton.Text lines={2} />

    //               <HStack space="2" alignItems="center">
    //                 <Skeleton size={"5"} borderRadius={"full"} />
    //                 <Skeleton height={"3"} flex={"2"} borderRadius={"full"} />
    //                 <Skeleton
    //                   height={"3"}
    //                   flex={"1"}
    //                   borderRadius={"full"}
    //                   startColor={"indigo.300"}
    //                 />
    //               </HStack>
    //             </VStack>
    //           </HStack>
    //         </Center>
    //       ))}
    //     </View>
    //   </ScrollView>
    // );
  }

  return (
    <View style={{backgroundColor: "white", flex: 1}}>
      {isFetchingNextPage ? (
        <View style={{alignItems: "center", justifyContent: "center"}}>
          <ActivityIndicator size={"small"} />
        </View>
      ) : resourceListData.length === 0 ? (
        <View style={{alignItems: "center", justifyContent: "center"}}>
          <Text>No Data</Text>
        </View>
      ) : null}

      <FlatList<TransactionItem>
        onRefresh={refetch}
        refreshing={isRefetching}
        data={resourceListData}
        keyExtractor={keyExtractor}
        renderItem={renderTransactionList}
        onEndReached={handleFetchNextPage}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: splitAppTheme.space["3"],
            }}
          />
        )}
        contentContainerStyle={{
          paddingHorizontal: splitAppTheme.space["6"],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
    backgroundColor: "#FE2121",
  },
});

export default TransactionScreen;
