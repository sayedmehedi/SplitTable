import React from "react";
import {ClubMenuItem} from "@src/models";
import {splitAppTheme} from "@src/theme";
import Entypo from "react-native-vector-icons/Entypo";
import {CustomerStackRoutes} from "@constants/routes";
import useDebouncedState from "@hooks/useDebouncedState";
import LinearGradient from "react-native-linear-gradient";
import {StackScreenProps} from "@react-navigation/stack";
import {TouchableOpacity} from "react-native-gesture-handler";
import {CompositeScreenProps} from "@react-navigation/native";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";
import useInfiniteGetClubMenusQuery from "@hooks/menu/useInfiniteGetClubMenusQuery";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ListRenderItem,
  ActivityIndicator,
} from "react-native";
import dayjs from "dayjs";
import FastImage from "react-native-fast-image";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";

const keyExtractor = (item: {id: number}) => `menu-${item.id.toString()}`;

type Props = CompositeScreenProps<
  StackScreenProps<
    CustomerStackParamList,
    typeof CustomerStackRoutes.ADD_MENU_ITEM
  >,
  StackScreenProps<RootStackParamList>
>;

const MenuItemAction = React.memo(
  function ({
    onChange,
    maxQuantity,
  }: {
    maxQuantity: number;
    onChange: (quantity: number) => void;
  }) {
    const [quantity, setQuantity] = React.useState(0);
    const [debouncedQuantity] = useDebouncedState(quantity, 500);

    React.useEffect(() => {
      onChange(debouncedQuantity);
    }, [debouncedQuantity, onChange]);

    return (
      <View style={{flexDirection: "row", alignItems: "center"}}>
        <TouchableOpacity
          disabled={quantity <= 0}
          onPress={() => {
            setQuantity(prevQuantity => {
              const newQuantity = prevQuantity - 1;
              if (newQuantity >= 0) {
                return newQuantity;
              }

              return prevQuantity;
            });
          }}
          style={{
            height: 30,
            width: 30,
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(64,43,140,0.1)",
          }}>
          <Entypo name="minus" size={8} color={"#402B8C"} />
        </TouchableOpacity>

        <Text style={{marginHorizontal: 10}}>{quantity}</Text>

        <TouchableOpacity
          disabled={quantity >= maxQuantity}
          onPress={() => {
            setQuantity(prevQuantity => {
              const newQuantity = prevQuantity + 1;
              if (newQuantity < maxQuantity) {
                return newQuantity;
              }

              return prevQuantity;
            });
          }}
          style={{
            height: 30,
            width: 30,
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(64,43,140,0.9)",
          }}>
          <Entypo name="plus" size={10} color={"white"} />
        </TouchableOpacity>
      </View>
    );
  },
  (prevProps, nextProps) => prevProps.maxQuantity === nextProps.maxQuantity,
);

const AddMenuItemScreen = ({navigation, route}: Props) => {
  const [menus, setMenus] = React.useState<
    Record<number, ClubMenuItem & {purchaseQty: number}>
  >({});
  const {
    error: infiniteGetResourcesError,
    data: infiniteGetResourcesResponse,
    isLoading: isLoadingInfiniteResources,
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteGetClubMenusQuery(
    {clubId: route.params.tableDetails.club_id, page: 1},
    {
      getNextPageParam(lastPage) {
        if (lastPage.menus.has_more_data) {
          return {
            clubId: route.params.tableDetails.club_id,
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

  const handleItemQuantity = React.useCallback(
    (menuItem: ClubMenuItem, newQuantity: number) => {
      setMenus(prevMenus => {
        const copiedMenus = {...prevMenus};

        if (menuItem.id in copiedMenus) {
          const copiedItem = {...copiedMenus[menuItem.id]};

          if (newQuantity === 0) {
            delete copiedMenus[menuItem.id];
          } else if (newQuantity < copiedItem.qty) {
            copiedItem.purchaseQty = newQuantity;
            copiedMenus[copiedItem.id] = copiedItem;
          }
        } else {
          if (newQuantity > 0) {
            copiedMenus[menuItem.id] = {
              ...menuItem,
              purchaseQty: newQuantity,
            };
          }
        }

        return copiedMenus;
      });
    },
    [],
  );

  const renderOfferMenu: ListRenderItem<ClubMenuItem> = React.useCallback(
    ({item}) => (
      <View
        style={{
          height: 100,
          width: "100%",
          marginVertical: 10,
          flexDirection: "row",
          backgroundColor: "rgba(255,255,255,0.9)",
        }}>
        <FastImage
          source={{uri: item.image}}
          style={{
            width: 100,
            height: 100,
          }}
        />
        <View
          style={{
            flex: 1,
            padding: 5,
            justifyContent: "space-between",
            paddingLeft: splitAppTheme.space[3],
          }}>
          <Text
            style={{
              fontSize: 18,
              color: "#262B2E",
              fontFamily: splitAppTheme.fontConfig.Sathoshi[500].normal,
            }}>
            {item.name}
          </Text>
          <View style={{flex: 1}}>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 10,
                color: "#8A8D9F",
                fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
              }}>
              {item.details}
            </Text>
          </View>

          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Text
              style={{
                fontSize: 12,
                color: "#00C1FF",
                fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
              }}>
              Price: ${item.price}
            </Text>

            <MenuItemAction
              maxQuantity={item.qty}
              onChange={newQuantity => {
                handleItemQuantity(item, newQuantity);
              }}
            />
          </View>
        </View>
      </View>
    ),
    [menus, handleItemQuantity],
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
    <View style={{flex: 1}}>
      <FocusAwareStatusBar
        barStyle={"dark-content"}
        backgroundColor={splitAppTheme.colors.white}
      />
      <View>
        {isFetchingNextPage && (
          <View style={{paddingTop: splitAppTheme.space[5]}}>
            <ActivityIndicator />
          </View>
        )}
        <FlatList
          onRefresh={refetch}
          listKey={"club-menus"}
          data={resourceListData}
          refreshing={isRefetching}
          keyExtractor={keyExtractor}
          renderItem={renderOfferMenu}
          onEndReached={handleFetchNextPage}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={ItemSeparator}
          contentContainerStyle={styles.flatlistContainerStyle}
        />
      </View>

      <LinearGradient
        colors={[
          splitAppTheme.colors.secondary[500],
          splitAppTheme.colors.primary[500],
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          bottom: 0,
          width: "100%",
          flexDirection: "row",
          position: "absolute",
          alignItems: "center",
          paddingHorizontal: 20,
          justifyContent: "space-between",
          paddingVertical: splitAppTheme.space[3],
        }}>
        <View>
          <Text
            style={{
              color: splitAppTheme.colors.white,
              fontSize: splitAppTheme.fontSizes.sm,
              fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
            }}>
            {route.params.tableDetails.name}
          </Text>

          <Text
            style={{
              color: splitAppTheme.colors.white,
              fontSize: splitAppTheme.fontSizes.lg,
              fontFamily: splitAppTheme.fontConfig.Sathoshi[500].normal,
            }}>
            {dayjs(
              route.params.tableDetails.date,
              "YYYY-MM-DD HH:mm:ss",
            ).format("DD MMM, hh:mm A")}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            const menuListToAdd = Object.values(menus);

            navigation.navigate(CustomerStackRoutes.BOOKING_DETAILS, {
              menuListToAdd,
              tableDetails: route.params.tableDetails,
              menGuestCount: route.params.menGuestCount,
              womenGuestCount: route.params.womenGuestCount,
            });
          }}
          style={styles.continueButton}>
          <Text
            style={{
              fontSize: splitAppTheme.fontSizes.md,
              color: splitAppTheme.colors.primary[500],
              fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
            }}>
            Continue
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  continueButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: splitAppTheme.radii.lg,
    paddingVertical: splitAppTheme.space[4],
    paddingHorizontal: splitAppTheme.space[5],
    backgroundColor: splitAppTheme.colors.white,
  },
  flatlistContainerStyle: {
    padding: splitAppTheme.space[6],
    paddingBottom: splitAppTheme.space["20"],
  },
});

export default AddMenuItemScreen;

function ItemSeparator() {
  return (
    <View
      style={{
        height: splitAppTheme.space["4"],
      }}
    />
  );
}
