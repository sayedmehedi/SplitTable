import React from "react";
import {useTheme} from "styled-components";
import {StatusBar, StyleSheet} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";
import {StackScreenProps} from "@react-navigation/stack";
import {CustomerAuthStackRoutes} from "@constants/routes";
import AntDesign from "react-native-vector-icons/AntDesign";
import {CompositeScreenProps} from "@react-navigation/native";
import {useDimensions} from "@react-native-community/hooks";
import {
  Box,
  Text,
  Image,
  HStack,
  VStack,
  TouchableOpacity,
} from "@components/ui";
import {
  RootStackParamList,
  CustomerStackParamList,
  CustomerAuthStackParamList,
} from "@src/navigation";

type Props = CompositeScreenProps<
  CompositeScreenProps<
    StackScreenProps<
      CustomerAuthStackParamList,
      typeof CustomerAuthStackRoutes.LOGIN_PROMPT
    >,
    StackScreenProps<CustomerStackParamList>
  >,
  StackScreenProps<RootStackParamList>
>;

const LoginPromptScreen = ({navigation}: Props) => {
  const {
    window: {width},
  } = useDimensions();
  const theme = useTheme();

  const handleEmailLogin = () => {
    navigation.navigate(CustomerAuthStackRoutes.SIGNIN);
  };

  return (
    <Box flex={1}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" />

      <LinearGradient
        // @ts-ignore
        flex={1}
        paddingBottom={20}
        end={{x: 0, y: 0}}
        start={{x: 0, y: 1}}
        // @ts-ignore
        alignItems={"center"}
        colors={["#DF3BC0", "#472BBE"]}>
        <Box flex={1} justifyContent={"center"}>
          <Image
            width={160}
            height={100}
            alt={"logo"}
            source={require("@assets/logo-white.png")}
          />
        </Box>

        <Box
          px={6}
          width={"full"}
          alignItems={"center"}
          justifyContent={"space-around"}>
          <Box mb={5}>
            <Text
              fontSize={22}
              color={"white"}
              fontFamily={"SatoshiVariable-Bold"}>
              Welcome!
            </Text>
          </Box>

          <VStack width={"full"}>
            <Box>
              <TouchableOpacity
                p={4}
                width={"full"}
                borderWidth={1}
                borderRadius={"lg"}
                borderColor={"white"}
                onPress={handleEmailLogin}>
                <Text
                  fontSize={"lg"}
                  color={"white"}
                  textAlign={"center"}
                  fontFamily={"SatoshiVariable-Bold"}>
                  Continue with email
                </Text>
              </TouchableOpacity>
            </Box>

            <Box mt={4}>
              <TouchableOpacity
                p={4}
                width={"full"}
                variant={"subtle"}
                borderRadius={"lg"}
                // colorScheme={"white"}
                bg={"rgba(255,255,255, 0.3)"}>
                <Text
                  fontSize={"lg"}
                  color={"white"}
                  textAlign={"center"}
                  fontFamily={"SatoshiVariable-Bold"}>
                  Continue with Phone Number
                </Text>
              </TouchableOpacity>
            </Box>
          </VStack>

          <HStack alignItems={"center"} my={5}>
            <Box height={"1px"} width={100} bg={"white"} />

            <Text mx={5} color={"white"}>
              OR
            </Text>

            <Box height={"1px"} width={100} bg={"white"} />
          </HStack>

          <VStack alignItems={"center"}>
            <HStack>
              <TouchableOpacity
                size={50}
                bg={"white"}
                borderRadius={"full"}
                alignItems={"center"}
                justifyContent={"center"}>
                <Feather
                  size={30}
                  name={"facebook"}
                  color={theme.colors.primary[300]}
                />
              </TouchableOpacity>

              <TouchableOpacity
                mx={5}
                size={50}
                bg={"white"}
                borderRadius={"full"}
                alignItems={"center"}
                justifyContent={"center"}>
                <AntDesign
                  size={30}
                  name={"google"}
                  color={theme.colors.primary[300]}
                />
              </TouchableOpacity>

              <TouchableOpacity
                size={50}
                bg={"white"}
                borderRadius={"full"}
                alignItems={"center"}
                justifyContent={"center"}>
                <Feather
                  size={30}
                  name={"instagram"}
                  color={theme.colors.primary[300]}
                />
              </TouchableOpacity>
            </HStack>

            <Box mt={10}>
              <Text
                fontSize={"lg"}
                color={"white"}
                fontFamily={"Satoshi-Regular"}>
                Don't have an account?{" "}
                <Text
                  fontSize={"lg"}
                  color={"white"}
                  fontFamily={"SatoshiVariable-Bold"}
                  textDecorationLine={"underline"}>
                  Sign Up
                </Text>
              </Text>
            </Box>
          </VStack>
        </Box>
      </LinearGradient>
    </Box>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingBottom: 20,
    alignItems: "center",
  },
});

export default LoginPromptScreen;
