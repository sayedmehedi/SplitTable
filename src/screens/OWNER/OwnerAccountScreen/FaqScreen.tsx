import React from "react";
import Entypo from "react-native-vector-icons/Entypo";
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  LayoutAnimation,
  ListRenderItem,
} from "react-native";

const data = [
  {
    id: 1,
    name: "How to send my package?",
  },
  {
    id: 2,
    name: "Can i change pick up location?",
  },
  {
    id: 3,
    name: "How to Edit Profile?",
  },
  {
    id: 4,
    name: "What does Lorem mean?",
  },
  {
    id: 5,
    name: "Can i send a fragile package?",
  },
  {
    id: 6,
    name: "How to send my package?",
  },
  {
    id: 7,
    name: "Why do we use Lorem Inpsum?",
  },
];

const FaqScreen = () => {
  const [active, setActive] = React.useState<number | null>(null);

  const onPress = React.useCallback((index: number) => {
    LayoutAnimation.easeInEaseOut();
    setActive(index == active ? null : index);
  }, []);

  const renderItem: ListRenderItem<{
    id: number;
    name: string;
  }> = React.useCallback(
    ({item, index}) => {
      const open = active === index;

      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            key={item.id}
            style={{
              padding: 15,
              width: "100%",
              marginVertical: 5,
              justifyContent: "center",
            }}
            activeOpacity={1}
            onPress={() => onPress(index)}>
            <View
              style={{flexDirection: "row", justifyContent: "space-between"}}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#222B45",
                  fontFamily: "SatoshiVariable-Bold",
                }}>
                {item.name}
              </Text>
              {open ? (
                <View
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 15,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#8A8D9F",
                  }}>
                  <Entypo name="chevron-small-down" size={8} color={"white"} />
                </View>
              ) : (
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#8A8D9F",
                  }}>
                  <Entypo
                    name="chevron-small-right"
                    size={12}
                    color={"white"}
                  />
                </View>
              )}
            </View>
            <View style={{flexDirection: "row"}}>
              {open && (
                <View>
                  <Text>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </ScrollView>
      );
    },
    [onPress, active],
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "#FF3FCB",
  },

  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: "#FF3FCB",
    backgroundColor: "#F4F5F7",
    borderRadius: 25,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
    width: 45,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    backgroundColor: "#F4F5F7",
    borderRadius: 25,
    color: "#FF3FCB",
  },
});

export default FaqScreen;
