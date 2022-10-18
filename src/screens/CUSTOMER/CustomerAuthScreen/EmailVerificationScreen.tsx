import React from "react";
import Button from "@components/Button";
import {StyleSheet} from "react-native";
import {splitAppTheme} from "@src/theme";
import {Box, Center, Container, Text} from "native-base";
import {StackScreenProps} from "@react-navigation/stack";
import {CustomerAuthStackRoutes} from "@constants/routes";
import {CompositeScreenProps} from "@react-navigation/native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import {
  CustomerAuthStackParamList,
  CustomerStackParamList,
  RootStackParamList,
} from "@src/types";

type Props = CompositeScreenProps<
  CompositeScreenProps<
    StackScreenProps<
      CustomerAuthStackParamList,
      typeof CustomerAuthStackRoutes.EMAIL_VERIFICATION
    >,
    StackScreenProps<CustomerStackParamList>
  >,
  StackScreenProps<RootStackParamList>
>;

const EmailVerificationScreen = ({navigation}: Props) => {
  const handleVerify = () => {
    navigation.navigate(CustomerAuthStackRoutes.LOCATION_ENABLE);
  };

  return (
    <Center h={"full"}>
      <Container centerContent w={"full"}>
        <Box bg={"white"} p={7} mt={7} alignItems={"center"}>
          <Text
            fontSize={"2xl"}
            color={"blue.300"}
            fontWeight={"bold"}
            fontFamily={"satoshi"}>
            Verification Code
          </Text>

          <Text fontSize={"sm"} color={"#262B2E"} fontFamily={"satoshi"} my={2}>
            An authentication code has been sent to
          </Text>

          <Text fontFamily={"satoshi"} fontSize={"md"} color={"blue.300"}>
            john..@gmail.com
          </Text>

          <OTPInputView
            pinCount={4}
            autoFocusOnLoad
            style={styles.otpInput}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={code => {
              console.log(`Code is $, you are good to go!`);
            }}
          />

          <Text fontSize={"md"} color={"#262B2E"} fontFamily={"satoshi"}>
            I didn't received code{" "}
            <Text
              fontWeight={"bold"}
              color={"primary.300"}
              fontFamily={"satoshi"}>
              Resend Code
            </Text>
          </Text>

          <Text color={"red.300"}>1:20 Sec left</Text>
        </Box>

        <Box w={"full"}>
          <Button
            width={"100%"}
            color={"primary"}
            variant={"solid"}
            title={"Verify Now"}
            onPress={handleVerify}
          />
        </Box>
      </Container>
    </Center>
  );
};

const styles = StyleSheet.create({
  otpInput: {width: "100%", height: 170, backgroundColor: "white"},
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: splitAppTheme.colors.primary[300],
  },

  underlineStyleBase: {
    width: 60,
    height: 60,
    borderWidth: 0,
    color: splitAppTheme.colors.primary[300],
    borderRadius: 30,
    borderBottomWidth: 1,
    backgroundColor: "#F4F5F7",
  },
  underlineStyleHighLighted: {
    width: 60,
    height: 60,
    borderWidth: 0,
    color: splitAppTheme.colors.primary[300],
    borderRadius: 30,
    borderBottomWidth: 1,
    borderColor: "#03DAC6",
    backgroundColor: "#F4F5F7",
  },
});

export default EmailVerificationScreen;
