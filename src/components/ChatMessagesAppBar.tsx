import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import type {RouteProp} from "@react-navigation/native";
import {StackHeaderProps} from "@react-navigation/stack";
import {
  ChatMessagesNavigationType,
  CustomerChatStackParamList,
} from "@src/navigation";
import {CustomerChatStackRoutes} from "@constants/routes";
import Entypo from "react-native-vector-icons/Entypo";
import {splitAppTheme} from "@src/theme";
import truncate from "lodash.truncate";

type RtProp = RouteProp<
  CustomerChatStackParamList,
  typeof CustomerChatStackRoutes.CHAT_MESSAGES
>;

export default function ChatMessagesAppBar({
  route,
  navigation,
}: {
  route: RtProp;
  navigation: ChatMessagesNavigationType;
}) {
  return (
    <View style={{overflow: "hidden", paddingBottom: splitAppTheme.space[2]}}>
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            padding: splitAppTheme.space[6],
            paddingLeft: splitAppTheme.space[1],
            backgroundColor: splitAppTheme.colors.white,
          },
          splitAppTheme.shadows[9],
        ]}>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo
              size={30}
              name={"chevron-left"}
              color={splitAppTheme.colors.black}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginHorizontal: splitAppTheme.space[3],
          }}>
          <Image
            source={{uri: route.params.partnerImage}}
            style={{
              width: 50,
              height: 50,
              borderRadius: splitAppTheme.radii.full,
            }}
          />
        </View>

        <View
          style={{
            flex: 1,
          }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: splitAppTheme.fontSizes["xl"],
              fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
            }}>
            {truncate(route.params.partnerName, {
              length: 22,
            })}
          </Text>

          <Text
            style={{
              fontSize: splitAppTheme.fontSizes.md,
              color: splitAppTheme.colors.green[300],
            }}>
            Online
          </Text>
        </View>
      </View>
    </View>
  );
}
