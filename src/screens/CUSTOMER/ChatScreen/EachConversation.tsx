import React from "react";
import truncate from "lodash.truncate";
import {splitAppTheme} from "@src/theme";
import {ConversationItem} from "@src/models";
import useAppToast from "@hooks/useAppToast";
import Ripple from "react-native-material-ripple";
import {isResponseResultError} from "@utils/error-handling";
import {View, Text, Image, ActivityIndicator, Dimensions} from "react-native";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import useAcceptInvitationMutation from "@hooks/chat/useAcceptInvitationMutation";

const {width: WINDOW_WIDTH} = Dimensions.get("window");

const EachConversation = ({
  myId,
  item,
  onItemPress,
}: {
  item: ConversationItem;
  onItemPress: (item: ConversationItem) => void;
  myId: number | undefined;
}) => {
  const toast = useAppToast();
  const {
    mutate: acceptInvitation,
    data: acceptResponse,
    isLoading: isAccepting,
    error: accepterror,
  } = useAcceptInvitationMutation({
    onSuccess(data) {
      if (!isResponseResultError(data)) {
        toast.success(data.success);
      }
    },
  });
  useHandleNonFieldError(accepterror);
  useHandleResponseResultError(acceptResponse);

  const handleAccept = () => {
    acceptInvitation({
      receiverId: item.receiver_id,
    });
  };

  const internalContent = (
    <View
      style={{
        height: 80,
        width: "100%",
        marginBottom: 1,
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        justifyContent: "space-between",
      }}>
      <View style={{flexDirection: "row", alignItems: "center"}}>
        <Image
          source={{
            uri: item.user_image,
          }}
          style={{height: 50, width: 50, borderRadius: 25, marginRight: 20}}
        />

        <View>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 15,
              color: "#023047",
              
              width: WINDOW_WIDTH * 0.5,
            }}>
            {item.user_name}
          </Text>

          <Text
            numberOfLines={1}
            style={{
              fontSize: 12,
              color: "#023047",
              fontFamily: "Inter-Regular",
              width: WINDOW_WIDTH * 0.5,
            }}>
            {item.message.title}
          </Text>
        </View>
      </View>

      {item.is_accepted === 0 && myId !== item.sender_id ? (
        isAccepting ? (
          <View>
            <ActivityIndicator size={"small"} />
          </View>
        ) : (
          <Ripple onPress={handleAccept}>
            <Text
              style={{
                color: splitAppTheme.colors.green[300],
                fontFamily: splitAppTheme.fontConfig.Roboto[700].normal,
              }}>
              Accept
            </Text>
          </Ripple>
        )
      ) : item.is_accepted === 0 && myId === item.sender_id ? (
        <Text>Pending</Text>
      ) : (
        <Text
          style={{
            fontSize: 10,
            color: "#E62B56",
            fontFamily: "Inter-Regular",
          }}>
          {item.message.created_at}
        </Text>
      )}
    </View>
  );
  return item.is_accepted === 0 ? (
    internalContent
  ) : (
    <Ripple onPress={() => onItemPress(item)}>{internalContent}</Ripple>
  );
};

export default EachConversation;
