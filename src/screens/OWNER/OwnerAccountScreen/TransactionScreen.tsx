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
import useGetOwnerClubInfoQuery from "@hooks/clubs/useGetOwnerClubInfoQuery";
import GenericListEmpty from "@components/GenericListEmpty";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";
import truncate from "lodash.truncate";

const keyExtractor = (item: {id: number}) => `${item.id.toString()}`;

const paymentMethodsExcerpt = {
  authorize: "Authorize.net",
  paypal: "Paypal",
  cryptocurrency: "Cryptocurrency",
} as const;

const renderTransactionList: ListRenderItem<Transaction> = ({item}) => (
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
      backgroundColor: "white",
      borderColor: "#F1F1F1",
      justifyContent: "space-around",
      paddingHorizontal: splitAppTheme.space[1],
    }}>
    <View
      style={{alignItems: "center", paddingHorizontal: splitAppTheme.space[4]}}>
      <Text
        style={{
          fontFamily: "Satoshi-Regular",
          fontSize: 12,
          color: "#8A8D9F",
        }}>
        {item.created_day}
      </Text>
      <Text
        style={{
          fontFamily: "SatoshiVariable-Bold",
          fontSize: 20,
          color: "#8A8D9F",
        }}>
        {item.created_month}
      </Text>
      <Text
        style={{
          fontFamily: "Satoshi-Regular",
          fontSize: 12,
          color: "#8A8D9F",
        }}>
        {item.created_time}
      </Text>
    </View>

    <View
      style={{
        flex: 1,
      }}>
      <Text
        style={{
          fontFamily: "SatoshiVariable-Bold",
          fontSize: 14,
          color: "#262B2E",
        }}>
        {truncate(item.club)}
      </Text>
      <View style={{flexDirection: "row", marginVertical: 4}}>
        <Text
          style={{
            fontFamily: "Satoshi-Regular",
            fontSize: 12,
            color: "#8A8D9F",
          }}>
          {Array.isArray(item.tables)
            ? truncate(item.tables.join(", "), {
                length: 20,
              })
            : ""}{" "}
          |
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
                  : item.status === "Success"
                  ? splitAppTheme.colors.green[300]
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
                : item.status === "Success"
                ? splitAppTheme.colors.green[300]
                : splitAppTheme.colors.red[300],
            fontFamily: "Satoshi-Regular",
          }}>
          {item.status}
        </Text>
      </View>
    </View>

    <View
      style={{
        paddingRight: splitAppTheme.space[3],
      }}>
      <Text
        style={{
          fontSize: 10,
          color: "#8A8D9F",
          alignSelf: "flex-end",
          fontFamily: "Satoshi-Regular",
        }}>
        {paymentMethodsExcerpt[item.payment_method]}
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
    useGetOwnerClubInfoQuery();

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
        return eachPage?.transactions?.data ?? [];
      }) ?? ([] as Transaction[])
    );
  }, [infiniteGetResourcesResponse?.pages]);

  console.log("resourceListData", resourceListData[0]);

  const handleFetchNextPage = React.useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  if (isLoadingInfiniteResources || isClubInfoLoading) {
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
    <View style={{backgroundColor: "white", flex: 1}}>
      <FocusAwareStatusBar
        barStyle={"dark-content"}
        backgroundColor={splitAppTheme.colors.white}
      />

      {isFetchingNextPage ? (
        <View style={{alignItems: "center", justifyContent: "center"}}>
          <ActivityIndicator size={"small"} />
        </View>
      ) : null}

      <FlatList<Transaction>
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
          padding: splitAppTheme.space["6"],
        }}
        ListEmptyComponent={<GenericListEmpty height={300} width={300} />}
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
