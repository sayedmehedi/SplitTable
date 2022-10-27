import React from "react";
import truncate from "lodash.truncate";
import {NotificationItem} from "@src/models";
import {ListRenderItem} from "react-native";
import {StackScreenProps} from "@react-navigation/stack";
import GenericListEmpty from "@components/GenericListEmpty";
import {CompositeScreenProps} from "@react-navigation/native";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";
import {NotificationStyles, NotificationTypes} from "@constants/notification";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Box,
  Text,
  VStack,
  HStack,
  Center,
  Spinner,
  FlatList,
  StatusBar,
} from "@components/ui";
import useInfiniteGetNotificationsQuery from "@hooks/notifications/useInfiniteGetNotificationsQuery";
import {splitAppTheme} from "@src/theme";

type Props = CompositeScreenProps<
  StackScreenProps<CustomerStackParamList>,
  StackScreenProps<RootStackParamList>
>;

const renderNotificationItem: ListRenderItem<NotificationItem> = ({item}) => (
  <HStack
    p={5}
    mb={5}
    borderWidth={"1"}
    borderRadius={"xl"}
    alignItems={"center"}
    borderColor={"#ECECEC"}>
    <Box>
      <Box
        width={"16"}
        height={"16"}
        borderRadius={"full"}
        bg={getNotificationIconBgColor(item)}>
        <Center height={"full"}>{getNotificationIcon(item)}</Center>
      </Box>
    </Box>

    <VStack ml={5}>
      <Text fontSize={"md"} fontFamily={"Roboto-Bold"}>
        {truncate(item.title, {
          length: 22,
        })}
      </Text>
      <Text ml={1} numberOfLines={3} fontSize={"sm"}>
        {item.message}
      </Text>
    </VStack>
  </HStack>
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
      <Box safeArea>
        <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />

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
      </Box>
    );
  }

  return (
    <Box safeArea>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />

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
        ListFooterComponent={
          isFetchingNextPage ? (
            <Box>
              <Spinner />
            </Box>
          ) : null
        }
        ListEmptyComponent={<GenericListEmpty />}
      />
    </Box>
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
