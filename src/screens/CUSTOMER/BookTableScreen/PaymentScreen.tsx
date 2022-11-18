import React from "react";
import {splitAppTheme} from "@src/theme";
import {View, Text, StyleSheet, StatusBar} from "react-native";
import {Controller, useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {CustomerStackRoutes} from "@constants/routes";
import {StackScreenProps} from "@react-navigation/stack";
import {TouchableOpacity} from "react-native-gesture-handler";
import AppGradientButton from "@components/AppGradientButton";
import {CompositeScreenProps} from "@react-navigation/native";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";

type Props = CompositeScreenProps<
  StackScreenProps<
    CustomerStackParamList,
    typeof CustomerStackRoutes.PAYMENT_AMOUNT
  >,
  StackScreenProps<RootStackParamList>
>;

type FormVlaues = {
  amount: string | null;
};

const PaymentScreen = ({navigation, route}: Props) => {
  const {control, handleSubmit} = useForm<FormVlaues>({
    defaultValues: {
      amount: null,
    },
  });

  const handlePaymentSubmit = handleSubmit(values => {
    if (values.amount !== null) {
      navigation.navigate(CustomerStackRoutes.PAYMENT_METHOD, {
        amount: values.amount,
        bookingId: route.params.bookingId,
      });
    }
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: splitAppTheme.space[6],
      }}>
      <Controller
        name={"amount"}
        rules={{
          required: "Please select amount",
        }}
        control={control}
        render={({field, formState: {errors}}) => (
          <React.Fragment>
            <TouchableOpacity
              style={styles.paymentContainer}
              onPress={() => {
                field.onChange(route.params.totalAmount);
              }}>
              <Text
                style={{
                  fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
                }}>
                Pay full payment
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <Text
                  style={{
                    fontSize: splitAppTheme.fontSizes.lg,
                    fontFamily: splitAppTheme.fontConfig.Roboto[700].normal,
                  }}>
                  ${route.params.totalAmount}
                </Text>

                <View
                  style={[
                    {
                      width: splitAppTheme.sizes["6"],
                      height: splitAppTheme.sizes["6"],
                      marginLeft: splitAppTheme.space[2],
                      borderRadius: splitAppTheme.radii.full,
                      backgroundColor:
                        field.value === route.params.totalAmount
                          ? splitAppTheme.colors.green[200]
                          : splitAppTheme.colors.coolGray[200],
                    },
                  ]}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.paymentContainer}
              onPress={() => {
                field.onChange(route.params.partialAmount);
              }}>
              <Text
                style={{
                  fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
                }}>
                Pay only 10% payment
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <Text
                  style={{
                    fontSize: splitAppTheme.fontSizes.lg,
                    fontFamily: splitAppTheme.fontConfig.Roboto[700].normal,
                  }}>
                  ${route.params.partialAmount}
                </Text>

                <View
                  style={[
                    {
                      width: splitAppTheme.sizes["6"],
                      height: splitAppTheme.sizes["6"],
                      marginLeft: splitAppTheme.space[2],
                      borderRadius: splitAppTheme.radii.full,
                      backgroundColor:
                        field.value === route.params.partialAmount
                          ? splitAppTheme.colors.green[200]
                          : splitAppTheme.colors.coolGray[200],
                    },
                  ]}
                />
              </View>
            </TouchableOpacity>

            <ErrorMessage
              errors={errors}
              name={field.name}
              render={({message}) => (
                <Text
                  style={{
                    marginVertical: 5,
                    textAlign: "center",
                    color: splitAppTheme.colors.red[300],
                  }}>
                  {message}
                </Text>
              )}
            />
          </React.Fragment>
        )}
      />

      <AppGradientButton
        width={"100%"}
        color={"primary"}
        variant={"solid"}
        title={"Confirm Booking"}
        onPress={handlePaymentSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  paymentContainer: {
    height: 50,
    padding: 10,
    width: "100%",
    borderRadius: 8,
    marginVertical: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(247,247,247,0.9)",
  },
});

export default PaymentScreen;
