import React from "react";
import {splitAppTheme} from "@src/theme";
import {View, Text, StyleSheet} from "react-native";
import {Controller, useForm} from "react-hook-form";
import {SupportedPaymentMethods} from "@src/models";
import {ErrorMessage} from "@hookform/error-message";
import {CustomerStackRoutes} from "@constants/routes";
import {StackScreenProps} from "@react-navigation/stack";
import {TouchableOpacity} from "react-native-gesture-handler";
import AppGradientButton from "@components/AppGradientButton";
import {CompositeScreenProps} from "@react-navigation/native";
import {AppSupportedPaymentMethods} from "@constants/payment";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";
import {CreditCardIcon, CryptoIcon, PaypalIcon} from "@constants/iconPath";

type Props = CompositeScreenProps<
  StackScreenProps<
    CustomerStackParamList,
    typeof CustomerStackRoutes.PAYMENT_METHOD
  >,
  StackScreenProps<RootStackParamList>
>;

type FormVlaues = {
  paymentMethod: SupportedPaymentMethods | null;
};

const PaymentMethodScreen = ({navigation, route}: Props) => {
  const {control, handleSubmit} = useForm<FormVlaues>({
    defaultValues: {
      paymentMethod: null,
    },
  });

  const handlePaymentMethodSubmit = handleSubmit(values => {
    if (values.paymentMethod !== null) {
      navigation.navigate(CustomerStackRoutes.PAYMENT_GATEWAY, {
        amount: route.params.amount,
        bookingId: route.params.bookingId,
        paymentMethod: values.paymentMethod,
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
        name={"paymentMethod"}
        rules={{
          required: "Please select a method",
        }}
        control={control}
        render={({field, formState: {errors}}) => (
          <React.Fragment>
            <TouchableOpacity
              style={styles.paymentContainer}
              onPress={() => {
                field.onChange(AppSupportedPaymentMethods.CARD);
              }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flex: 1,
                }}>
                <CreditCardIcon />

                <View style={{marginLeft: splitAppTheme.space[2]}}>
                  <Text>Credit card</Text>
                </View>
              </View>

              <View
                style={[
                  {
                    width: splitAppTheme.sizes["6"],
                    height: splitAppTheme.sizes["6"],
                    marginLeft: splitAppTheme.space[2],
                    borderRadius: splitAppTheme.radii.full,
                    backgroundColor:
                      field.value === AppSupportedPaymentMethods.CARD
                        ? splitAppTheme.colors.green[200]
                        : splitAppTheme.colors.coolGray[200],
                  },
                ]}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.paymentContainer}
              onPress={() => {
                field.onChange(AppSupportedPaymentMethods.PAYPAL);
              }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flex: 1,
                }}>
                <PaypalIcon />

                <View style={{marginLeft: splitAppTheme.space[2]}}>
                  <Text>Paypal</Text>
                </View>
              </View>

              <View
                style={[
                  {
                    width: splitAppTheme.sizes["6"],
                    height: splitAppTheme.sizes["6"],
                    marginLeft: splitAppTheme.space[2],
                    borderRadius: splitAppTheme.radii.full,
                    backgroundColor:
                      field.value === AppSupportedPaymentMethods.PAYPAL
                        ? splitAppTheme.colors.green[200]
                        : splitAppTheme.colors.coolGray[200],
                  },
                ]}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.paymentContainer}
              onPress={() => {
                field.onChange(AppSupportedPaymentMethods.CRYPTO);
              }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flex: 1,
                }}>
                <CryptoIcon />

                <View style={{marginLeft: splitAppTheme.space[2]}}>
                  <Text>Crypto</Text>
                </View>
              </View>

              <View
                style={[
                  {
                    width: splitAppTheme.sizes["6"],
                    height: splitAppTheme.sizes["6"],
                    marginLeft: splitAppTheme.space[2],
                    borderRadius: splitAppTheme.radii.full,
                    backgroundColor:
                      field.value === AppSupportedPaymentMethods.CRYPTO
                        ? splitAppTheme.colors.green[200]
                        : splitAppTheme.colors.coolGray[200],
                  },
                ]}
              />
            </TouchableOpacity>

            <ErrorMessage
              errors={errors}
              name={field.name}
              render={({message}) => (
                <Text
                  style={{
                    marginTop: 5,
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
        title={"Pay Now"}
        onPress={handlePaymentMethodSubmit}
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

export default PaymentMethodScreen;
