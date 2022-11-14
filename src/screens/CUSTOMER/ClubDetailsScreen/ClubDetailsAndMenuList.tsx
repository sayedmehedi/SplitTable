import React from "react";
import {ClubMenuItem} from "@src/models";
import {splitAppTheme} from "@src/theme";
import EachOfferMenuItem from "./EachOfferMenuItem";
import {useDimensions} from "@react-native-community/hooks";
import GenericListEmpty from "@components/GenericListEmpty";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import useInfiniteGetClubMenusQuery from "@hooks/menu/useInfiniteGetClubMenusQuery";
import {
  Text,
  View,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import {AppTableListTypes} from "@constants/table";
import {CustomerStackRoutes} from "@constants/routes";
import LinearGradient from "react-native-linear-gradient";
import {StackNavigationProp} from "@react-navigation/stack";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";
import {CompositeNavigationProp, useNavigation} from "@react-navigation/native";

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
          width: WINDOW_WIDTH,
        }}>
        <Text>Loading..</Text>
      </View>
    );
    // return (
    //   <ScrollView>
    //     <Box p={6}>
    //       {new Array(5).fill(1).map((_, i) => (
    //         <Box width={"full"} key={i}>
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
    //         </Box>
    //       ))}
    //     </Box>
    //   </ScrollView>
    // );
  }

  return (
    <View
      style={{
        flex: 1,
        width: WINDOW_WIDTH,
        padding: splitAppTheme.space["6"],
        position: "relative",
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

      <View
        style={{
          bottom: 0,
          width: WINDOW_WIDTH,
          position: "absolute",
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(CustomerStackRoutes.TABLE_LIST, {
              clubId,
              headerTitle: clubName,
              listType: AppTableListTypes.BY_CLUB_ID,
            });
          }}>
          <LinearGradient
            colors={[
              splitAppTheme.colors.secondary[500],
              splitAppTheme.colors.primary[500],
            ]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: splitAppTheme.sizes.full,
              paddingVertical: splitAppTheme.space[5],
            }}>
            <View
              style={{
                justifyContent: "center",
                width: splitAppTheme.sizes.full,
              }}>
              <Text
                style={{
                  textAlign: "center",
                  color: splitAppTheme.colors.white,
                  fontSize: splitAppTheme.fontSizes.lg,
                  fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
                }}>
                View This Club Table & Events
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ClubDetailsAndMenuListScreen;
