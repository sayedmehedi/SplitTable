import React from "react";
import {
  ChatMessagesNavigationType,
  CustomerChatStackParamList,
} from "@src/navigation";
import CommonStackHeader from "@components/CommonStackHeader";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import ChatListScreen from "@screens/CUSTOMER/ChatScreen";
import {CustomerChatStackRoutes} from "@constants/routes";
import ChatMessagesAppBar from "@components/ChatMessagesAppBar";
import {CUSTOMER_CHAT_STACK_NAVIGATOR_ID} from "@constants/navigators";
import ChatMessagesScreen from "@screens/CUSTOMER/ChatScreen/ChatMessagesScreen";

const CustomerChatStack = createStackNavigator<CustomerChatStackParamList>();

const globalScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerChatStackParamList,
        keyof CustomerChatStackParamList
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerShown: true,
  header: CommonStackHeader,
};

const CustomerChatStackNavigator = () => {
  return (
    <CustomerChatStack.Navigator
      id={CUSTOMER_CHAT_STACK_NAVIGATOR_ID}
      screenOptions={globalScreenOptions}>
      <CustomerChatStack.Screen
        component={ChatListScreen}
        options={chatListScreenOptions}
        name={CustomerChatStackRoutes.CHAT_LIST}
      />
      <CustomerChatStack.Screen
        component={ChatMessagesScreen}
        options={chatMessagesScreenOptions}
        name={CustomerChatStackRoutes.CHAT_MESSAGES}
      />
    </CustomerChatStack.Navigator>
  );
};

export default CustomerChatStackNavigator;

const chatListScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerChatStackParamList,
        typeof CustomerChatStackRoutes.CHAT_LIST
      >;
      navigation: any;
    }) => StackNavigationOptions) = {
  headerShown: false,
};

const chatMessagesScreenOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<
        CustomerChatStackParamList,
        typeof CustomerChatStackRoutes.CHAT_MESSAGES
      >;
      navigation: ChatMessagesNavigationType;
    }) => StackNavigationOptions) = ({route, navigation}) => ({
  header: () => <ChatMessagesAppBar route={route} navigation={navigation} />,
});
