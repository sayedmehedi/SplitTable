import React from "react";
import AppGradientButton from "@components/AppGradientButton";
import {StackScreenProps} from "@react-navigation/stack";
import {
  CustomerAuthStackRoutes,
  CustomerMainBottomTabRoutes,
  CustomerStackRoutes,
} from "@constants/routes";
import {TouchableOpacity} from "react-native-gesture-handler";
import {CompositeScreenProps} from "@react-navigation/native";
import {
  RootStackParamList,
  CustomerStackParamList,
  CustomerAuthStackParamList,
} from "@src/navigation";
import {Box, Image, Text, Button as NBButton} from "native-base";

type Props = CompositeScreenProps<
  CompositeScreenProps<
    StackScreenProps<
      CustomerAuthStackParamList,
      typeof CustomerAuthStackRoutes.LOCATION_ENABLE
    >,
    StackScreenProps<CustomerStackParamList>
  >,
  StackScreenProps<RootStackParamList>
>;

const LocationEnablePromptScreen = ({navigation}: Props) => {
  const handleEnableLocation = () =>
    navigation.navigate(CustomerStackRoutes.CUSTOMER_MAIN_TAB, {
      screen: CustomerMainBottomTabRoutes.HOME,
    });

  return (
    <Box style={{padding: 30, flex: 1, backgroundColor: "white"}}>
      <Image
        height={200}
        width={"full"}
        rounded={"lg"}
        source={require("@assets/images/Map-1.png")}
        alt={"map"}
      />
      <Text
        margin={5}
        fontSize={"md"}
        color={"#262B2E"}
        textAlign={"center"}
        fontFamily={"satoshi"}>
        Set your location to start exploring club/bars around you
      </Text>

      <AppGradientButton
        width={"100%"}
        color={"primary"}
        variant={"solid"}
        title={"Enable Location"}
        onPress={handleEnableLocation}
      />

      <NBButton
        mt={5}
        size={"lg"}
        rounded={"lg"}
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
      </NBButton>
    </Box>
  );
};

export default LocationEnablePromptScreen;
