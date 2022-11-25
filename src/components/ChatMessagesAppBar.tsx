import React from "react";
import truncate from "lodash.truncate";
import {splitAppTheme} from "@src/theme";
import FastImage from "react-native-fast-image";
import Entypo from "react-native-vector-icons/Entypo";
import type {RouteProp} from "@react-navigation/native";
import {Text, TouchableOpacity, View} from "react-native";
import {CustomerChatStackRoutes} from "@constants/routes";
import {
  ChatMessagesNavigationType,
  CustomerChatStackParamList,
} from "@src/navigation";

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
          <FastImage
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
