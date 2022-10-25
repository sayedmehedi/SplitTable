import React from "react";
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
  Icon,
  Image,
  Button,
  HStack,
  VStack,
  IconButton,
} from "native-base";
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

  const handleEmailLogin = () => {
    navigation.navigate(CustomerAuthStackRoutes.SIGNIN);
  };

  return (
    <Box flex={1}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
      <LinearGradient
        end={{x: 0, y: 0}}
        start={{x: 0, y: 1}}
        style={styles.linearGradient}
        colors={["#DF3BC0", "#472BBE"]}>
        <Box flex={1} justifyContent={"center"}>
          <Image
            width={160}
            height={100}
            alt={"logo"}
            source={require("@assets/logo-white.png")}
          />
        </Box>

        <Box flex={1.5} alignItems={"center"} justifyContent={"space-around"}>
          <Box mb={5}>
            <Text
              fontSize={22}
              color={"white"}
              fontWeight={"bold"}
              fontFamily={"satoshi"}>
              Welcome!
            </Text>
          </Box>

          <VStack space={3}>
            <Box>
              <Button
                w={"full"}
                size={"lg"}
                rounded={"lg"}
                width={width * 0.7}
                variant={"outline"}
                colorScheme={"transparent"}
                _text={{
                  fontSize: "lg",
                  color: "white",
                  fontWeight: "bold",
                  fontFamily: "sathoshi",
                }}
                onPress={handleEmailLogin}>
                Continue with email
              </Button>
            </Box>

            <Box>
              <Button
                mt={2}
                w={"full"}
                size={"lg"}
                rounded={"lg"}
                variant={"subtle"}
                width={width * 0.7}
                colorScheme={"white"}
                bg={"rgba(255,255,255, 0.3)"}
                _text={{
                  fontSize: "lg",
                  color: "white",
                  fontWeight: "bold",
                  fontFamily: "sathoshi",
                }}>
                Continue with Phone Number
              </Button>
            </Box>
          </VStack>

          <HStack alignItems={"center"} my={5}>
            <Box height={"1px"} width={100} bg={"white"} />

            <Text mx={5} color={"white"}>
              OR
            </Text>

            <Box height={"1px"} width={100} bg={"white"} />
          </HStack>

          <VStack space={10} alignItems={"center"}>
            <HStack space={5}>
              <IconButton
                bg={"white"}
                borderRadius={"full"}
                colorScheme={"transparent"}
                icon={
                  <Icon
                    size={5}
                    as={Feather}
                    name={"facebook"}
                    color={"primary.300"}
                  />
                }
              />

              <IconButton
                bg={"white"}
                borderRadius={"full"}
                colorScheme={"transparent"}
                icon={
                  <Icon
                    size={5}
                    as={AntDesign}
                    name={"google"}
                    color={"primary.300"}
                  />
                }
              />

              <IconButton
                colorScheme={"transparent"}
                bg={"white"}
                borderRadius={"full"}
                icon={
                  <Icon
                    size={5}
                    as={Feather}
                    name={"instagram"}
                    color={"primary.300"}
                  />
                }
              />
            </HStack>

            <Box>
              <Text fontSize={"lg"} color={"white"} fontFamily={"satoshi"}>
                Don't have an account?{" "}
                <Text
                  fontSize={"lg"}
                  color={"white"}
                  fontWeight={"bold"}
                  fontFamily={"satoshi"}
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
