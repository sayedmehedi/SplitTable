import React from "react";
import AppGradientButton from "@components/AppGradientButton";
import {StackScreenProps} from "@react-navigation/stack";
import {
  OwnerStackRoutes,
  OwnerAuthStackRoutes,
  OwnerMainBottomTabRoutes,
} from "@constants/routes";
import {TouchableOpacity} from "react-native-gesture-handler";
import {CompositeScreenProps} from "@react-navigation/native";
import {
  RootStackParamList,
  OwnerStackParamList,
  OwnerAuthStackParamList,
} from "@src/navigation";
import {Image, Text, View} from "react-native";
import {splitAppTheme} from "@src/theme";

type Props = CompositeScreenProps<
  CompositeScreenProps<
    StackScreenProps<
      OwnerAuthStackParamList,
      typeof OwnerAuthStackRoutes.LOCATION_ENABLE
    >,
    StackScreenProps<OwnerStackParamList>
  >,
  StackScreenProps<RootStackParamList>
>;

const LocationEnablePromptScreen = ({navigation}: Props) => {
  const handleEnableLocation = () => {};

  return (
    <View style={{padding: 30, flex: 1, backgroundColor: "white"}}>
      <Image
        style={{
          height: 200,
          width: splitAppTheme.sizes.full,
          borderRadius: splitAppTheme.radii.lg,
        }}
        source={require("@assets/images/Map-1.png")}
      />
      <Text
        style={{
          color: "#262B2E",
          textAlign: "center",
          margin: splitAppTheme.space[5],
          fontSize: splitAppTheme.fontSizes.md,
          fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
        }}>
        Set your location to start exploring club/bars around you
      </Text>

      <AppGradientButton
        width={"100%"}
        color={"primary"}
        variant={"solid"}
        title={"Enable Location"}
        onPress={handleEnableLocation}
      />

      {/* <NBButton
        mt={5}
        size={"lg"}
        borderRadius={"lg"}
        borderWidth={2}
        variant={"outline"}
        color={"blue.300"}
        borderColor={"blue.300"}
        _pressed={{
          bg: "blue.300:alpha.30",
        }}
        _text={{
          fontFamily: "satoshi",
          fontWeight: "bold",
          color: "blue.300",
        }}>
        No, I do it later
      </NBButton> */}
    </View>
  );
};

export default LocationEnablePromptScreen;
