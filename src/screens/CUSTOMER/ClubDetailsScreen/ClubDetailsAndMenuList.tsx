import React from "react";
import {ClubMenuItem} from "@src/models";
import {splitAppTheme} from "@src/theme";
import EachOfferMenuItem from "./EachOfferMenuItem";
import {CustomerStackRoutes} from "@constants/routes";
import {useDimensions} from "@react-native-community/hooks";
import GenericListEmpty from "@components/GenericListEmpty";
import {StackNavigationProp} from "@react-navigation/stack";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";
import {View, FlatList, ListRenderItem, ActivityIndicator} from "react-native";
import {CompositeNavigationProp, useNavigation} from "@react-navigation/native";
import useInfiniteGetClubMenusQuery from "@hooks/menu/useInfiniteGetClubMenusQuery";

const keyExtractor = (item: {id: number}) => `menu-${item.id.toString()}`;

const renderOfferMenu: ListRenderItem<ClubMenuItem> = ({item}) => (
  <EachOfferMenuItem item={item} />
);

type Props = {clubId: number; clubName: string};

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<
    CustomerStackParamList,
    typeof CustomerStackRoutes.TABLE_LIST
  >,
  StackNavigationProp<RootStackParamList>
>;

const ClubDetailsAndMenuListScreen = ({clubId, clubName}: Props) => {
  const {
    window: {width: WINDOW_WIDTH},
  } = useDimensions();
  const navigation = useNavigation<NavigationProp>();

  const {
    error: infiniteGetResourcesError,
    data: infiniteGetResourcesResponse,
    isLoading: isLoadingInfiniteResources,
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteGetClubMenusQuery(
    {
      page: 1,
      clubId: clubId,
    },
    {
      getNextPageParam(lastPage) {
        if (lastPage.menus.has_more_data) {
          return {
            page: lastPage.menus.current_page + 1,
          };
        }
      },
    },
  );
  useHandleNonFieldError(infiniteGetResourcesError);

  const resourceListData = React.useMemo(() => {
    return (
      infiniteGetResourcesResponse?.pages.flatMap(eachPage => {
        return eachPage.menus.data;
      }) ?? []
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
          width: WINDOW_WIDTH,
          alignItems: "center",
          justifyContent: "center",
          padding: splitAppTheme.space[3],
        }}>
        <ActivityIndicator size={"small"} />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        width: WINDOW_WIDTH,
        padding: splitAppTheme.space["6"],
      }}>
      {isFetchingNextPage ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : null}

      <FlatList
        onRefresh={refetch}
        listKey={"club-menus"}
        data={resourceListData}
        refreshing={isRefetching}
        keyExtractor={keyExtractor}
        renderItem={renderOfferMenu}
        onEndReached={handleFetchNextPage}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: splitAppTheme.space["4"],
            }}
          />
        )}
        ListEmptyComponent={<GenericListEmpty height={300} width={300} />}
      />
    </View>
  );
};

export default ClubDetailsAndMenuListScreen;
