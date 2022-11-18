import React from "react";
import {splitAppTheme} from "@src/theme";
import {ConversationItem} from "@src/models";
import EachConversation from "./EachConversation";
import {TextInput} from "react-native-gesture-handler";
import {StackScreenProps} from "@react-navigation/stack";
import GenericListEmpty from "@components/GenericListEmpty";
import {SafeAreaView} from "react-native-safe-area-context";
import {CompositeScreenProps} from "@react-navigation/native";
import {
  CustomerChatStackRoutes,
  CustomerMainBottomTabRoutes,
} from "@constants/routes";
import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
} from "react-native";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {
  RootStackParamList,
  CustomerStackParamList,
  CustomerBottomTabParamList,
  CustomerChatStackParamList,
} from "@src/navigation";
import useInfiniteGetConversationsQuery from "@hooks/chat/useInfiniteGetConversationsQuery";
import UserSearchInput from "./UserSearchInput";
import useGetAuthDataQuery from "@hooks/useGetAuthDataQuery";

type Props = CompositeScreenProps<
  CompositeScreenProps<
    CompositeScreenProps<
      StackScreenProps<
        CustomerChatStackParamList,
        typeof CustomerChatStackRoutes.CHAT_LIST
      >,
      BottomTabScreenProps<CustomerBottomTabParamList>
    >,
    StackScreenProps<CustomerStackParamList>
  >,
  StackScreenProps<RootStackParamList>
>;

const ChatListScreen = ({navigation}: Props) => {
  const {data: authData, isLoading: isAuthDataLoading} = useGetAuthDataQuery();
  const {
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    error: infiniteGetResourcesError,
    data: infiniteGetResourcesResponse,
    isLoading: isLoadingInfiniteResources,
  } = useInfiniteGetConversationsQuery(
    {
      page: 1,
    },
    {
      getNextPageParam(lastPage) {
        if (lastPage.messages?.has_more_data) {
          return {
            page: lastPage.messages.current_page + 1,
          };
        }
      },
    },
  );
  useHandleNonFieldError(infiniteGetResourcesError);

  const resourceListData = React.useMemo(() => {
    return (
      infiniteGetResourcesResponse?.pages?.flatMap(
        eachPage => eachPage.messages.data,
      ) ?? []
    );
  }, [infiniteGetResourcesResponse?.pages]);

  const handleFetchNextPage = React.useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const handleItemPress = React.useCallback(
    (item: ConversationItem) => {
      navigation.navigate(CustomerChatStackRoutes.CHAT_MESSAGES, {
        chatId: item.id,
        partnerName: item.user_name,
        partnerImage: item.user_image,
      });
    },
    [navigation],
  );

  const renderEachConversation: ListRenderItem<ConversationItem> =
    React.useCallback(
      ({item}) => (
        <EachConversation
          item={item}
          onItemPress={handleItemPress}
          myId={authData?.id}
        />
      ),
      [handleItemPress, authData?.id],
    );

  if (isLoadingInfiniteResources || isAuthDataLoading) {
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
    <View style={{backgroundColor: "#FFFFFF", flex: 1}}>
      <SafeAreaView
        style={{
          paddingBottom: 0,
          padding: splitAppTheme.space[6],
        }}>
        <View>
          <Text
            style={{
              fontSize: 22,
              color: "#030819",
              fontFamily: "SatoshiVariable-Bold",
            }}>
            Chat
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginVertical: 8,
              color: "#707070",
              fontFamily: "Satoshi-Regular",
            }}>
            You have{" "}
            {infiniteGetResourcesResponse?.pages?.[0].total_unseen_messages} new
            message
          </Text>

          <UserSearchInput />
        </View>
      </SafeAreaView>

      {isFetchingNextPage ? (
        <View>
          <ActivityIndicator size={"small"} />
        </View>
      ) : null}

      <FlatList
        onRefresh={refetch}
        data={resourceListData}
        listKey={"conversations"}
        refreshing={isRefetching}
        keyExtractor={keyExtractor}
        onEndReached={handleFetchNextPage}
        renderItem={renderEachConversation}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: splitAppTheme.space[6],
        }}
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

function keyExtractor(item: {id: number}) {
  return item.id.toString();
}

export default ChatListScreen;
