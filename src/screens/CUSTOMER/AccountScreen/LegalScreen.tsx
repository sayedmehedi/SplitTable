import React from "react";
import {View, Text} from "react-native";
import {splitAppTheme} from "@src/theme";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";

const LegalScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: "#FFFFFF", padding: 20}}>
      <FocusAwareStatusBar
        barStyle={"dark-content"}
        backgroundColor={splitAppTheme.colors.white}
      />

      <Text
        style={{
          fontFamily: "SatoshiVariable-Bold",
          fontSize: 25,
          marginVertical: 20,
        }}>
        Terms & Condition
      </Text>

      <Text>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum
      </Text>

      <Text>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum
      </Text>
    </View>
  );
};

export default LegalScreen;
