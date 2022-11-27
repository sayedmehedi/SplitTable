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
import GenericListEmpty from "@components/GenericListEmpty";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";
import useInfiniteGetFavoritesQuery from "@hooks/user/useInfiniteGetFavoritesQuery";

type Props = CompositeScreenProps<
  StackScreenProps<CustomerStackParamList, typeof CustomerStackRoutes.FAVORITE>,
  StackScreenProps<RootStackParamList>
>;

const keyExtractor = (item: {id: number}) => `${item.id.toString()}`;

const FavoriteScreen = ({navigation}: Props) => {
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

  const handleItemPress = React.useCallback(
    (item: FavoriteClub) => {
      navigation.navigate(CustomerStackRoutes.CLUB_DETAILS, {
        clubId: item.id,
      });
    },
    [navigation],
  );

  const renderClubItem: ListRenderItem<FavoriteClub> = React.useCallback(
    ({item}) => {
      return <EachFavoriteItem item={item} onItemPress={handleItemPress} />;
    },
    [handleItemPress],
  );

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
      <FocusAwareStatusBar
        barStyle={"dark-content"}
        backgroundColor={splitAppTheme.colors.white}
      />
      {isFetchingNextPage ? (
        <View style={{alignItems: "center", justifyContent: "center"}}>
          <ActivityIndicator size={"small"} />
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
        ListEmptyComponent={<GenericListEmpty height={300} width={300} />}
      />
    </View>
  );
};

export default FavoriteScreen;
