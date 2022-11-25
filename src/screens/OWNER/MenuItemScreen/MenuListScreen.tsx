import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ListRenderItem,
  ActivityIndicator,
} from "react-native";
import {splitAppTheme} from "@src/theme";
import EachMenuItem from "./EachMenuItem";
import {ClubMenuItemOwnerSide} from "@src/models";
import GenericListEmpty from "@components/GenericListEmpty";
import {StackScreenProps} from "@react-navigation/stack";
import {CompositeScreenProps} from "@react-navigation/native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {OwnerMainBottomTabRoutes, OwnerStackRoutes} from "@constants/routes";
import useInfiniteGetOwnerClubMenusQuery from "@hooks/clubs/useInfiniteGetOwnerClubMenusQuery";
import {
  RootStackParamList,
  OwnerStackParamList,
  OwnerBottomTabParamList,
} from "@src/navigation";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";

type Props = CompositeScreenProps<
  CompositeScreenProps<
    BottomTabScreenProps<
      OwnerBottomTabParamList,
      typeof OwnerMainBottomTabRoutes.MENU
    >,
    StackScreenProps<OwnerStackParamList>
  >,
  StackScreenProps<RootStackParamList>
>;

const MenuListScreen = ({navigation}: Props) => {
  const {
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isInfiniteResourceLoading,
    data: infiniteGetClubsByLocationsResponse,
  } = useInfiniteGetOwnerClubMenusQuery(
    {
      page: 1,
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

  const resourceListData = React.useMemo(() => {
    return (
      infiniteGetClubsByLocationsResponse?.pages.flatMap(eachPage => {
        return eachPage.menus.data;
      }) ?? []
    );
  }, [infiniteGetClubsByLocationsResponse?.pages]);

  const handleEdit = React.useCallback(
    (menu: ClubMenuItemOwnerSide) => {
      navigation.navigate(OwnerStackRoutes.UPSERT_MENU, {
        actionMode: "update",
        menu,
      });
    },
    [navigation],
  );

  const renderItem: ListRenderItem<ClubMenuItemOwnerSide> = React.useCallback(
    ({item, index}) => (
      <EachMenuItem item={item} onPress={handleEdit} index={index} />
    ),
    [handleEdit],
  );

  const handleFetchNextPage = React.useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

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
      <FocusAwareStatusBar
        barStyle={"dark-content"}
        backgroundColor={splitAppTheme.colors.white}
      />
      {isFetchingNextPage ? (
        <View>
          <ActivityIndicator size={"small"} />
        </View>
      ) : null}

      <FlatList
        ListHeaderComponentStyle={{
          paddingTop: splitAppTheme.space[3],
          paddingHorizontal: splitAppTheme.space[6],
        }}
        onRefresh={refetch}
        data={resourceListData}
        renderItem={renderItem}
        refreshing={isRefetching}
        ListHeaderComponent={
          <TouchableOpacity
            style={styles.addMenuButton}
            onPress={() =>
              navigation.navigate(OwnerStackRoutes.UPSERT_MENU, {
                actionMode: "create",
              })
            }>
            <Text
              style={{
                color: splitAppTheme.colors.primary[300],
                fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
              }}>
              + Add Menu Item
            </Text>
          </TouchableOpacity>
        }
        onEndReached={handleFetchNextPage}
        ListFooterComponentStyle={{
          backgroundColor: splitAppTheme.colors.white,
        }}
        // ItemSeparatorComponent={() => (
        //   <View style={{height: splitAppTheme.space[4]}} />
        // )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: splitAppTheme.space[6],
        }}
        ListEmptyComponent={<GenericListEmpty height={300} width={300} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  addMenuButton: {
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: splitAppTheme.radii.xl,
    borderWidth: splitAppTheme.borderWidths[2],
    borderColor: splitAppTheme.colors.primary[300],
  },
});

export default MenuListScreen;
