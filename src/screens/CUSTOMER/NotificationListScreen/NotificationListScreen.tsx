import React from "react";
import truncate from "lodash.truncate";
import {splitAppTheme} from "@src/theme";
import {NotificationItem} from "@src/models";
import {
  Text,
  View,
  FlatList,
  StatusBar,
  ListRenderItem,
  ActivityIndicator,
} from "react-native";
import {PaymentIcon} from "@constants/iconPath";
import {RootStackParamList} from "@src/navigation";
import {StackScreenProps} from "@react-navigation/stack";
import GenericListEmpty from "@components/GenericListEmpty";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {NotificationStyles, NotificationTypes} from "@constants/notification";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import useInfiniteGetNotificationsQuery from "@hooks/notifications/useInfiniteGetNotificationsQuery";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";

type Props = StackScreenProps<RootStackParamList>;

const renderNotificationItem: ListRenderItem<NotificationItem> = ({item}) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      borderColor: "#ECECEC",
      marginBottom: splitAppTheme.space[5],
      borderRadius: splitAppTheme.radii.xl,
      paddingVertical: splitAppTheme.space[5],
      borderWidth: splitAppTheme.borderWidths[2],
      paddingHorizontal: splitAppTheme.space[3],
    }}>
    <View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: splitAppTheme.sizes[16],
          height: splitAppTheme.sizes[16],
          borderRadius: splitAppTheme.radii.full,
          backgroundColor: getNotificationIconBgColor(item),
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
          maxWidth: 270,
          marginTop: splitAppTheme.space[1],
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
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <FocusAwareStatusBar
        // barStyle={"dark-content"}
        // backgroundColor={"white"}
        />

        <ActivityIndicator size={"small"} />
      </View>
    );
  }

  return (
    <View>
      <FocusAwareStatusBar
      // barStyle={"dark-content"}
      // backgroundColor={"white"}
      />

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
    return splitAppTheme.colors.success[50];
  }

  if (notificationItem.style === NotificationStyles.ERROR) {
    return splitAppTheme.colors.red[50];
  }

  return splitAppTheme.colors.yellow[100];
}

function getNotificationIconColor(notificationItem: NotificationItem) {
  if (notificationItem.style === NotificationStyles.SUCCESS) {
    return splitAppTheme.colors.success[400];
  }

  if (notificationItem.style === NotificationStyles.ERROR) {
    return splitAppTheme.colors.red[400];
  }

  return splitAppTheme.colors.yellow[500];
}

function getNotificationIcon(notificationItem: NotificationItem) {
  if (notificationItem.type === NotificationTypes.INVITATION) {
    return (
      <MaterialIcons
        size={30}
        name={"verified-user"}
        color={getNotificationIconColor(notificationItem)}
      />
    );
  }

  if (notificationItem.type === NotificationTypes.CANCEL) {
    return (
      <MaterialIcons
        size={30}
        name={"cancel"}
        color={getNotificationIconColor(notificationItem)}
      />
    );
  }

  return (
    <MaterialIcons
      size={30}
      name={"check-circle"}
      color={getNotificationIconColor(notificationItem)}
    />
  );
}
