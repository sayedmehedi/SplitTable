import React from "react";
import Button from "@components/Button";
import useAuthContext from "@hooks/useAuthContext";
import {ErrorMessage} from "@hookform/error-message";
import {Controller, useForm} from "react-hook-form";
import {addServerErrors} from "@utils/error-handling";
import Entypo from "react-native-vector-icons/Entypo";
import {StackScreenProps} from "@react-navigation/stack";
import {CustomerAuthStackRoutes} from "@constants/routes";
import useLoginMutation from "@hooks/auth/useLoginMutation";
import {CompositeScreenProps} from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  RootStackParamList,
  CustomerStackParamList,
  CustomerAuthStackParamList,
} from "@src/navigation";
import {
  Box,
  Icon,
  Text,
  Input,
  VStack,
  Center,
  HStack,
  Checkbox,
  useToast,
  Container,
  FormControl,
  WarningOutlineIcon,
} from "native-base";

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
  const toast = useToast();
  const {setAuthData} = useAuthContext();

  const {control, handleSubmit, setError} = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    mutate: login,
    error: loginError,
    isError: isLoginError,
    isLoading: isLoggingIn,
  } = useLoginMutation();

  React.useEffect(() => {
    if (isLoginError) {
      toast.show({
        bg: "error.600",
        variant: "solid",
        title: loginError.non_field_error,
      });

      addServerErrors(loginError.field_errors, setError);
    }
  }, [isLoginError, loginError, toast.show, setError]);

  const handleSignin = handleSubmit(values => {
    login(values, {
      onSuccess(data) {
        if ("success" in data) {
          toast.show({
            variant: "solid",
            bg: "success.600",
            title: data.success,
          });

          setAuthData(data.user);
        }

        if ("error" in data) {
          toast.show({
            bg: "error.600",
            variant: "solid",
            title: data.error,
          });
        }
      },
    });
  });

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
              <Controller
                name={"email"}
                rules={{
                  required: "This field is required",
                }}
                control={control}
                render={({field, formState: {errors}}) => (
                  <FormControl isInvalid>
                    <Input
                      size={"lg"}
                      isFullWidth
                      rounded={"lg"}
                      bg={"gray.100"}
                      variant={"filled"}
                      value={field.value}
                      onChangeText={field.onChange}
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

                    <ErrorMessage
                      errors={errors}
                      name={"email"}
                      render={({message}) => {
                        return (
                          <FormControl.ErrorMessage
                            leftIcon={<WarningOutlineIcon size={"xs"} />}>
                            {message}
                          </FormControl.ErrorMessage>
                        );
                      }}
                    />
                  </FormControl>
                )}
              />

              <Controller
                name={"password"}
                rules={{
                  required: "This field is required",
                }}
                control={control}
                render={({field, formState: {errors}}) => (
                  <FormControl isInvalid>
                    <Input
                      size={"lg"}
                      rounded={"lg"}
                      bg={"gray.100"}
                      secureTextEntry
                      variant={"filled"}
                      value={field.value}
                      placeholder={"Password"}
                      onChangeText={field.onChange}
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

                    <ErrorMessage
                      errors={errors}
                      name={"password"}
                      render={({message}) => {
                        return (
                          <FormControl.ErrorMessage
                            leftIcon={<WarningOutlineIcon size={"xs"} />}>
                            {message}
                          </FormControl.ErrorMessage>
                        );
                      }}
                    />
                  </FormControl>
                )}
              />
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
              onPress={handleSignin}
              touchableOpacityProps={{
                disabled: isLoggingIn,
              }}
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
