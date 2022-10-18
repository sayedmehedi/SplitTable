import React from "react";
import Button from "@components/Button";
import {
  Box,
  Icon,
  Text,
  Input,
  VStack,
  Center,
  HStack,
  Container,
  FormControl,
  WarningOutlineIcon,
  Checkbox,
} from "native-base";
import Entypo from "react-native-vector-icons/Entypo";
import {StackScreenProps} from "@react-navigation/stack";
import {CustomerAuthStackRoutes} from "@constants/routes";
import {CompositeScreenProps} from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  CustomerAuthStackParamList,
  CustomerStackParamList,
  RootStackParamList,
} from "@src/types";

type Props = CompositeScreenProps<
  CompositeScreenProps<
    StackScreenProps<
      CustomerAuthStackParamList,
      typeof CustomerAuthStackRoutes.SIGNIN
    >,
    StackScreenProps<CustomerStackParamList>
  >,
  StackScreenProps<RootStackParamList>
>;

const EmailLoginScreen = ({navigation}: Props) => {
  const handleSignUp = () => {
    navigation.navigate(CustomerAuthStackRoutes.EMAIL_VERIFICATION);
  };

  return (
    <Center h={"full"}>
      <Box flex={1} />

      <Container centerContent>
        <VStack>
          <Box>
            <Box mb={"3.5"}>
              <Text
                fontSize={"2xl"}
                color={"blue.300"}
                fontWeight={"bold"}
                fontFamily={"satoshi"}
                textAlign={"center"}>
                Login
              </Text>

              <Text
                my={1}
                fontSize={"lg"}
                color={"#262B2E"}
                fontFamily={"satoshi"}
                textAlign={"center"}>
                With your email address
              </Text>
            </Box>

            <VStack space={4} w={"full"}>
              <FormControl bg={"gray.100"}>
                <Input
                  size={"lg"}
                  isFullWidth
                  rounded={"lg"}
                  variant={"filled"}
                  keyboardType={"email-address"}
                  placeholder={"Enter Your Name Here"}
                  InputLeftElement={
                    <Icon
                      size={5}
                      ml={"5"}
                      color={"black"}
                      as={<Entypo name={"mail"} />}
                    />
                  }
                />

                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size={"xs"} />}>
                  Atleast 6 characters are required.
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl>
                <Input
                  size={"lg"}
                  rounded={"lg"}
                  secureTextEntry
                  variant={"filled"}
                  placeholder={"Password"}
                  InputLeftElement={
                    <Icon
                      size={5}
                      ml={"5"}
                      name={"lock"}
                      color={"black"}
                      as={FontAwesome5}
                    />
                  }
                  underlineColorAndroid={"transparent"}
                />

                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size={"xs"} />}>
                  Atleast 6 characters are required.
                </FormControl.ErrorMessage>
              </FormControl>
            </VStack>

            <HStack
              px={2}
              my={4}
              w={"full"}
              alignItems={"center"}
              justifyContent={"space-between"}>
              <Checkbox value={"one"} fontFamily={"satoshi"}>
                Remember me
              </Checkbox>

              <Text fontSize={"md"} color={"primary.300"}>
                Forget password?
              </Text>
            </HStack>

            <Button
              width={"100%"}
              color={"primary"}
              variant={"solid"}
              title={"Sign in"}
              onPress={handleSignUp}
            />
          </Box>
        </VStack>
      </Container>

      <Box flex={1} />

      <Text fontSize={"md"} mb={5}>
        Don't have an account? <Text color={"primary.300"}>Sign Up</Text>
      </Text>
    </Center>
  );
};

export default EmailLoginScreen;
