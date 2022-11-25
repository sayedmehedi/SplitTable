import React from "react";
import {splitAppTheme} from "@src/theme";
import {ConversationMessage} from "@src/models";
import {TextInput} from "react-native-gesture-handler";
import {StackScreenProps} from "@react-navigation/stack";
import {CustomerChatStackRoutes} from "@constants/routes";
import GenericListEmpty from "@components/GenericListEmpty";
import {CompositeScreenProps} from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {
  RootStackParamList,
  CustomerStackParamList,
  CustomerBottomTabParamList,
  CustomerChatStackParamList,
} from "@src/navigation";
import {isResponseResultError} from "@utils/error-handling";
import useGetProfileQuery from "@hooks/auth/useGetProfileQuery";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import useSendMessageMutation from "@hooks/chat/useSendMessageMutation";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import useInfiniteGetConversationMessagesQuery from "@hooks/chat/useInfiniteGetConversationMessagesQuery";
import FastImage from "react-native-fast-image";

type Props = CompositeScreenProps<
  CompositeScreenProps<
    CompositeScreenProps<
      StackScreenProps<
        CustomerChatStackParamList,
        typeof CustomerChatStackRoutes.CHAT_MESSAGES
      >,
      BottomTabScreenProps<CustomerBottomTabParamList>
    >,
    StackScreenProps<CustomerStackParamList>
  >,
  StackScreenProps<RootStackParamList>
>;

const ChatMessagesScreen = ({route}: Props) => {
  const flatlistRef = React.useRef<FlatList>(null!);
  const [messageText, setMessageText] = React.useState("");
  const {data: profileData, isLoading: isProfileLoading} = useGetProfileQuery();

  const {
    mutate: sendMessage,
    isLoading: isSending,
    error: sendError,
    data: sendResponse,
  } = useSendMessageMutation({
    onSuccess(data) {
      if (!isResponseResultError(data)) {
        setMessageText("");

        flatlistRef.current.scrollToIndex({
          index: 0,
          animated: true,
        });
      }
    },
  });
  useHandleNonFieldError(sendError);
  useHandleResponseResultError(sendResponse);

  const {
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    error: infiniteGetResourcesError,
    data: infiniteGetResourcesResponse,
    isLoading: isLoadingInfiniteResources,
  } = useInfiniteGetConversationMessagesQuery(
    {
      page: 1,
      messageId: route.params.chatId,
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

  const renderEachMessage: ListRenderItem<ConversationMessage> =
    React.useCallback(
      ({item}) => {
        const isMyMsg = item.receiver_id === profileData?.id;

        if (isMyMsg) {
          return (
            <View
              style={{
                width: "100%",
                marginBottom: 10,
                alignSelf: "flex-end",
                alignItems: "flex-end",
              }}>
              <View
                style={{
                  padding: 10,
                  width: "auto",
                  maxWidth: "100%",
                  backgroundColor: "#667085",
                  borderRadius: splitAppTheme.radii.lg,
                }}>
                <Text
                  style={{
                    color: splitAppTheme.colors.white,
                  }}>
                  {item.title}
                </Text>
              </View>

              <View style={{flexDirection: "row", marginTop: 5}}>
                <View>
                  <Text>{item.created_at}</Text>
                </View>

                <View style={{marginLeft: 10}}>
                  <FastImage
                    source={{uri: item.sender_image}}
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: splitAppTheme.radii.full,
                    }}
                  />
                </View>
              </View>
            </View>
          );
        }

        return (
          <View
            style={{
              width: "100%",
              marginBottom: 20,
              flexDirection: "row",
              alignItems: "flex-end",
              alignSelf: "flex-start",
            }}>
            <View style={{marginRight: 10, marginBottom: 20}}>
              <FastImage
                source={{uri: item.sender_image}}
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: splitAppTheme.radii.full,
                }}
              />
            </View>

            <View style={{flex: 1}}>
              <View
                style={{
                  padding: 10,
                  alignSelf: "flex-start",
                  backgroundColor: "#EAECF2",
                  borderRadius: splitAppTheme.radii.lg,
                }}>
                <Text>{item.title}</Text>
              </View>

              <View style={{marginTop: 5}}>
                <Text>{item.created_at}</Text>
              </View>
            </View>
          </View>
        );
      },
      [profileData?.id],
    );

  const handleSendMessage = () => {
    if (infiniteGetResourcesResponse?.pages?.[0]) {
      sendMessage({
        receiverId: infiniteGetResourcesResponse.pages[0].receiver.id,
        message: messageText,
      });
    }
  };

  if (isLoadingInfiniteResources || isProfileLoading) {
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
      {isFetchingNextPage ? (
        <View>
          <ActivityIndicator size={"small"} />
        </View>
      ) : null}

      <FlatList
        inverted
        ref={flatlistRef}
        onRefresh={refetch}
        data={resourceListData}
        listKey={"conversations"}
        refreshing={isRefetching}
        keyExtractor={keyExtractor}
        renderItem={renderEachMessage}
        onEndReached={handleFetchNextPage}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: splitAppTheme.space[6],
        }}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: splitAppTheme.space["1"],
            }}
          />
        )}
        ListEmptyComponent={<GenericListEmpty height={300} width={300} />}
      />
      <View
        style={{
          overflow: "hidden",
          paddingTop: splitAppTheme.space[2],
        }}>
        <View
          style={[
            {
              paddingBottom: 30,
              paddingVertical: 15,
              alignItems: "center",
              flexDirection: "row",
              paddingHorizontal: 10,
              backgroundColor: splitAppTheme.colors.white,
            },
            splitAppTheme.shadows[4],
          ]}>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#667085",
              borderRadius: 10,
            }}>
            <TextInput
              style={{
                padding: 10,
                paddingLeft: 15,
              }}
              multiline
              numberOfLines={2}
              value={messageText}
              editable={!isSending}
              placeholder={"Type here.."}
              onChangeText={setMessageText}
            />
          </View>

          <View
            style={{
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
            }}>
            {isSending ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity
                onPress={handleSendMessage}
                disabled={!messageText || isSending}>
                <MaterialIcons name={"send"} size={25} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

function keyExtractor(item: {id: number}) {
  return item.id.toString();
}

export default ChatMessagesScreen;
