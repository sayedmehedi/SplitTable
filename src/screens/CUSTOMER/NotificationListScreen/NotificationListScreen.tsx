import React from "react";
import truncate from "lodash.truncate";
import {splitAppTheme} from "@src/theme";
import {NotificationItem} from "@src/models";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StatusBar,
  Text,
  View,
} from "react-native";
import {StackScreenProps} from "@react-navigation/stack";
import GenericListEmpty from "@components/GenericListEmpty";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {RootStackParamList} from "@src/navigation";
import {NotificationStyles, NotificationTypes} from "@constants/notification";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import useInfiniteGetNotificationsQuery from "@hooks/notifications/useInfiniteGetNotificationsQuery";

type Props = StackScreenProps<RootStackParamList>;

const renderNotificationItem: ListRenderItem<NotificationItem> = ({item}) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      borderColor: "#ECECEC",
      padding: splitAppTheme.space[5],
      borderWidth: splitAppTheme.sizes[1],
      marginBottom: splitAppTheme.space[5],
      borderRadius: splitAppTheme.radii.xl,
    }}>
    <View>
      <View
        style={{
          width: splitAppTheme.sizes[16],
          height: splitAppTheme.sizes[16],
          borderRadius: splitAppTheme.radii.full,
          backgroundColor: getNotificationIconBgColor(item),
          justifyContent: "center",
          alignItems: "center",
        }}>
        {getNotificationIcon(item)}
      </View>
    </View>

    <View
      style={{
        marginLeft: splitAppTheme.space[5],
      }}>
      <Text
        style={{
          fontSize: splitAppTheme.fontSizes.md,
          fontFamily: splitAppTheme.fontConfig.Roboto[700].normal,
        }}>
        {truncate(item.title, {
          length: 22,
        })}
      </Text>
      <Text
        numberOfLines={3}
        style={{
          marginLeft: splitAppTheme.space[1],
          fontSize: splitAppTheme.fontSizes.sm,
        }}>
        {item.message}
      </Text>
    </View>
  </View>
);

export default function NotificationListScreen({}: Props) {
  const {
    error,
    refetch,
    isLoading,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    data: infiniteGetResourcesResponse,
  } = useInfiniteGetNotificationsQuery(
    {
      page: 1,
    },
    {
      getNextPageParam(lastPage) {
        if (lastPage.notifications.has_more_data) {
          return {
            page: lastPage.notifications.current_page + 1,
          };
        }
      },
    },
  );

  useHandleNonFieldError(error);

  const resources = React.useMemo(() => {
    return (
      infiniteGetResourcesResponse?.pages.flatMap(eachPage => {
        return eachPage.notifications.data;
      }) ?? []
    );
  }, [infiniteGetResourcesResponse?.pages]);

  const handleFetchNextPage = React.useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  if (isLoading) {
    return (
      <View>
        <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />

        <Text>Loading..</Text>
        {/* <ScrollView
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            p: 6,
          }}>
          {new Array(5).fill(1).map((_, i) => (
            <Center width={"full"} key={i}>
              <HStack width={"full"} height={"32"} space={"5"} borderRadius={"md"}>
                <Skeleton
                  height={"24"}
                  width={"24"}
                  borderRadius={"sm"}
                  startColor="coolGray.100"
                />
                <VStack flex={"3"} space={"2.5"}>
                  <Skeleton height={"5"} startColor="amber.300" />
                  <Skeleton.Text lines={2} />

                  <HStack space="2" alignItems="center">
                    <Skeleton size={"5"} borderRadius={"full"} />
                    <Skeleton height={"3"} flex={"2"} borderRadius={"full"} />
                    <Skeleton
                      height={"3"}
                      flex={"1"}
                      borderRadius={"full"}
                      startColor={"indigo.300"}
                    />
                  </HStack>
                </VStack>
              </HStack>
            </Center>
          ))}
        </ScrollView> */}
      </View>
    );
  }

  return (
    <View>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />

      {isFetchingNextPage ? (
        <View>
          <ActivityIndicator size={"small"} />
        </View>
      ) : null}

      <FlatList
        data={resources}
        onRefresh={refetch}
        refreshing={isRefetching}
        renderItem={renderNotificationItem}
        onEndReached={handleFetchNextPage}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 24,
        }}
        ListEmptyComponent={<GenericListEmpty height={300} width={300} />}
      />
    </View>
  );
}

function getNotificationIconBgColor(notificationItem: NotificationItem) {
  if (notificationItem.style === NotificationStyles.SUCCESS) {
    return "success.50";
  }

  if (notificationItem.style === NotificationStyles.ERROR) {
    return "red.50";
  }

  return "yellow.50";
}

function getNotificationIconColor(notificationItem: NotificationItem) {
  if (notificationItem.style === NotificationStyles.SUCCESS) {
    return splitAppTheme.colors.success[400];
  }

  if (notificationItem.style === NotificationStyles.ERROR) {
    return splitAppTheme.colors.red[400];
  }

  return splitAppTheme.colors.yellow[400];
}

function getNotificationIcon(notificationItem: NotificationItem) {
  if (notificationItem.type === NotificationTypes.INVITATION) {
    return (
      <MaterialCommunityIcons
        size={30}
        name={
          notificationItem.style === NotificationStyles.SUCCESS
            ? "check-circle"
            : "close-circle"
        }
        color={getNotificationIconColor(notificationItem)}
      />
    );
  }

  if (notificationItem.type === NotificationTypes.PAYMENT) {
    return (
      <MaterialCommunityIcons
        size={30}
        name={"toolbox"}
        color={getNotificationIconColor(notificationItem)}
      />
    );
  }

  return (
    <MaterialCommunityIcons
      size={30}
      name={"toolbox"}
      color={getNotificationIconColor(notificationItem)}
    />
  );
}
