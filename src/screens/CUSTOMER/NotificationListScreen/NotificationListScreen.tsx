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
  Icon,
  Center,
  VStack,
  HStack,
  Heading,
  StatusBar,
  Skeleton,
  FlatList,
  Spinner,
  ScrollView,
} from "native-base";
import useInfiniteGetNotificationsQuery from "@hooks/notifications/useInfiniteGetNotificationsQuery";

type Props = CompositeScreenProps<
  StackScreenProps<CustomerStackParamList>,
  StackScreenProps<RootStackParamList>
>;

const renderNotificationItem: ListRenderItem<NotificationItem> = ({item}) => (
  <HStack
    p={5}
    mb={5}
    space={5}
    rounded={"xl"}
    borderWidth={"1"}
    alignItems={"center"}
    borderColor={"#ECECEC"}>
    <Box>
      <Box
        w={"16"}
        h={"16"}
        rounded={"full"}
        bg={getNotificationIconBgColor(item)}>
        <Center h={"full"}>{getNotificationIcon(item)}</Center>
      </Box>
    </Box>

    <VStack space={1}>
      <Heading size={"md"}>
        {truncate(item.title, {
          length: 22,
        })}
      </Heading>
      <Text numberOfLines={3} fontSize={"sm"}>
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

        <ScrollView
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            p: 6,
          }}>
          {new Array(5).fill(1).map((_, i) => (
            <Center w={"full"} key={i}>
              <HStack w={"full"} h={"32"} space={"5"} rounded={"md"}>
                <Skeleton
                  h={"24"}
                  w={"24"}
                  rounded={"sm"}
                  startColor="coolGray.100"
                />
                <VStack flex={"3"} space={"2.5"}>
                  <Skeleton h={"5"} startColor="amber.300" />
                  <Skeleton.Text lines={2} />

                  <HStack space="2" alignItems="center">
                    <Skeleton size={"5"} rounded={"full"} />
                    <Skeleton h={"3"} flex={"2"} rounded={"full"} />
                    <Skeleton
                      h={"3"}
                      flex={"1"}
                      rounded={"full"}
                      startColor={"indigo.300"}
                    />
                  </HStack>
                </VStack>
              </HStack>
            </Center>
          ))}
        </ScrollView>
      </Box>
    );
  }

  return (
    <Box safeArea>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />

      <FlatList<typeof resources[0]>
        data={resources}
        onRefresh={refetch}
        refreshing={isRefetching}
        renderItem={renderNotificationItem}
        onEndReached={handleFetchNextPage}
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{
          p: 6,
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
    return "success.50:alpha.70";
  }

  if (notificationItem.style === NotificationStyles.ERROR) {
    return "red.50:alpha.70";
  }

  return "yellow.50";
}

function getNotificationIconColor(notificationItem: NotificationItem) {
  if (notificationItem.style === NotificationStyles.SUCCESS) {
    return "success.400";
  }

  if (notificationItem.style === NotificationStyles.ERROR) {
    return "red.400";
  }

  return "yellow.400";
}

function getNotificationIcon(notificationItem: NotificationItem) {
  if (notificationItem.type === NotificationTypes.INVITATION) {
    return (
      <Icon
        size={30}
        name={
          notificationItem.style === NotificationStyles.SUCCESS
            ? "check-circle"
            : "close-circle"
        }
        as={MaterialCommunityIcons}
        color={getNotificationIconColor(notificationItem)}
      />
    );
  }

  if (notificationItem.type === NotificationTypes.PAYMENT) {
    return (
      <Icon
        size={30}
        name={"toolbox"}
        as={MaterialCommunityIcons}
        color={getNotificationIconColor(notificationItem)}
      />
    );
  }

  return "yellow.400";
}
