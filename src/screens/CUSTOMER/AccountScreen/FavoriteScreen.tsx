import React from "react";
import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
} from "react-native";
import {splitAppTheme} from "@src/theme";
import {FavoriteClub} from "@src/models";
import EachFavoriteItem from "./EachFavoriteItem";
import {CustomerStackRoutes} from "@constants/routes";
import {StackScreenProps} from "@react-navigation/stack";
import {CompositeScreenProps} from "@react-navigation/native";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";
import useInfiniteGetFavoritesQuery from "@hooks/user/useInfiniteGetFavoritesQuery";

type Props = CompositeScreenProps<
  StackScreenProps<CustomerStackParamList, typeof CustomerStackRoutes.FAVORITE>,
  StackScreenProps<RootStackParamList>
>;

const keyExtractor = (item: {id: number}) => `${item.id.toString()}`;

const FavoriteScreen = ({}: Props) => {
  const {
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    error: infiniteGetResourcesError,
    data: infiniteGetResourcesResponse,
    isLoading: isLoadingInfiniteResources,
  } = useInfiniteGetFavoritesQuery(
    {
      page: 1,
    },
    {
      getNextPageParam(lastPage) {
        if (lastPage.clubs?.has_more_data) {
          return {
            page: lastPage.clubs.current_page + 1,
          };
        }
      },
    },
  );
  useHandleNonFieldError(infiniteGetResourcesError);

  const resourceListData = React.useMemo(() => {
    return (
      infiniteGetResourcesResponse?.pages?.flatMap(eachPage => {
        return eachPage?.clubs?.data ?? [];
      }) ?? ([] as FavoriteClub[])
    );
  }, [infiniteGetResourcesResponse?.pages]);

  const handleFetchNextPage = React.useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  if (isLoadingInfiniteResources) {
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
        <View style={{alignItems: "center", justifyContent: "center"}}>
          <ActivityIndicator size={"small"} />
        </View>
      ) : resourceListData.length === 0 ? (
        <View style={{alignItems: "center", justifyContent: "center"}}>
          <Text>No Data</Text>
        </View>
      ) : null}
      <FlatList
        onRefresh={refetch}
        data={resourceListData}
        refreshing={isRefetching}
        keyExtractor={keyExtractor}
        renderItem={renderClubItem}
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
      />
    </View>
  );
};

export default FavoriteScreen;

const renderClubItem: ListRenderItem<FavoriteClub> = ({item}) => {
  return <EachFavoriteItem item={item} />;
};
