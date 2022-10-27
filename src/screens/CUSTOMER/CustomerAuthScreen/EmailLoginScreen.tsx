import React from "react";
import useAppToast from "@hooks/useAppToast";
import useAuthContext from "@hooks/useAuthContext";
import {ErrorMessage} from "@hookform/error-message";
import {Controller, useForm} from "react-hook-form";
import Entypo from "react-native-vector-icons/Entypo";
import {StackScreenProps} from "@react-navigation/stack";
import {CustomerAuthStackRoutes} from "@constants/routes";
import useLoginMutation from "@hooks/auth/useLoginMutation";
import AppGradientButton from "@components/AppGradientButton";
import {CompositeScreenProps} from "@react-navigation/native";
import {Box, Text, Input, VStack, HStack, Center} from "@components/ui";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {addServerErrors, isResponseResultError} from "@utils/error-handling";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import {
  RootStackParamList,
  CustomerStackParamList,
  CustomerAuthStackParamList,
} from "@src/navigation";

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
  const toast = useAppToast();
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
    data: loginResponse,
    isError: isLoginError,
    isLoading: isLoggingIn,
  } = useLoginMutation();

  useHandleNonFieldError(loginError);
  useHandleResponseResultError(loginResponse);

  React.useEffect(() => {
    if (isLoginError) {
      addServerErrors(loginError.field_errors, setError);
    }
  }, [isLoginError, loginError, setError]);

  const handleSignin = handleSubmit(values => {
    login(values, {
      onSuccess(data) {
        if (!isResponseResultError(data)) {
          toast.success(data.success);

          setAuthData(data.user);
        }
      },
    });
  });

  return (
    <Box height={"full"}>
      <Box flex={1} />

      <Box px={6}>
        <VStack>
          <Box>
            <Box mb={3.5}>
              <Text
                fontSize={"2xl"}
                color={"blue.300"}
                textAlign={"center"}
                fontFamily={"SatoshiVariable-Bold"}>
                Login
              </Text>

              <Text
                my={1}
                fontSize={"lg"}
                color={"#262B2E"}
                textAlign={"center"}
                fontFamily={"Roboto-Regular"}>
                With your email address
              </Text>
            </Box>

            <VStack width={"full"}>
              <Controller
                name={"email"}
                rules={{
                  required: "This field is required",
                }}
                control={control}
                render={({field, formState: {errors}}) => (
                  <Box>
                    <HStack
                      width={"full"}
                      borderWidth={!!errors.email ? 1 : 0}
                      borderRadius={"lg"}
                      borderColor={"red.300"}>
                      <Center
                        bg={"gray.100"}
                        pl={2}
                        borderTopLeftRadius={"lg"}
                        borderBottomLeftRadius={"lg"}>
                        <Entypo size={30} name={"mail"} color={"black"} />
                      </Center>

                      <Box flex={1}>
                        <Input
                          p={4}
                          width={"full"}
                          bg={"gray.100"}
                          borderTopRightRadius={"lg"}
                          borderBottomRightRadius={"lg"}
                          value={field.value}
                          onChangeText={field.onChange}
                          keyboardType={"email-address"}
                          placeholder={"Enter Your Name Here"}
                        />
                      </Box>
                    </HStack>

                    <ErrorMessage
                      errors={errors}
                      name={"email"}
                      render={({message}) => {
                        return (
                          <Text color={"red.300"} py={1}>
                            {message}
                          </Text>
                        );
                      }}
                    />
                  </Box>
                )}
              />

              <Controller
                name={"password"}
                rules={{
                  required: "This field is required",
                }}
                control={control}
                render={({field, formState: {errors}}) => (
                  <Box mt={4}>
                    <HStack
                      width={"full"}
                      borderWidth={!!errors.password ? 1 : 0}
                      borderRadius={"lg"}
                      borderColor={"red.300"}>
                      <Center
                        pl={2}
                        bg={"gray.100"}
                        borderTopLeftRadius={"lg"}
                        borderBottomLeftRadius={"lg"}>
                        <FontAwesome5 size={30} name={"lock"} color={"black"} />
                      </Center>

                      <Box flex={1}>
                        <Input
                          p={4}
                          width={"full"}
                          bg={"gray.100"}
                          secureTextEntry
                          value={field.value}
                          placeholder={"Password"}
                          borderTopRightRadius={"lg"}
                          borderBottomRightRadius={"lg"}
                          onChangeText={field.onChange}
                          underlineColorAndroid={"transparent"}
                        />
                      </Box>
                    </HStack>

                    <ErrorMessage
                      errors={errors}
                      name={"password"}
                      render={({message}) => {
                        return (
                          <Text color={"red.300"} py={1}>
                            {message}
                          </Text>
                        );
                      }}
                    />
                  </Box>
                )}
              />
            </VStack>

            <HStack
              px={2}
              my={4}
              width={"full"}
              alignItems={"center"}
              justifyContent={"space-between"}>
              {/* <Checkbox value={"one"} fontFamily={"Satoshi-Regular"}>
                Remember me
              </Checkbox> */}

              <Text fontSize={"md"} color={"primary.300"}>
                Forget password?
              </Text>
            </HStack>

            <AppGradientButton
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
      </Box>

      <Box flex={1} />

      <Text fontSize={"md"} mb={5} textAlign={"center"}>
        Don't have an account? <Text color={"primary.300"}>Sign Up</Text>
      </Text>
    </Box>
  );
};

export default EmailLoginScreen;
