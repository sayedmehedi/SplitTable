import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import AppGradientButton from "@components/AppGradientButton";
import {CompositeScreenProps} from "@react-navigation/native";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";
import {StackScreenProps} from "@react-navigation/stack";
import {CustomerStackRoutes} from "@constants/routes";

type Props = CompositeScreenProps<
  StackScreenProps<
    CustomerStackParamList,
    typeof CustomerStackRoutes.PAYMENT_METHOD
  >,
  StackScreenProps<RootStackParamList>
>;

const PaymentMethodScreen = ({navigation}: Props) => {
  return (
    <View style={{flex: 1, backgroundColor: "#FFFFFF", padding: 20}}>
      <TouchableOpacity style={styles.paymentContainer}>
        <Text>Pay full payment</Text>
        <Text>$3966.00</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.paymentContainer}>
        <Text>Pay only 10% payment</Text>
        <Text>$396.00</Text>
      </TouchableOpacity>

      <AppGradientButton
        onPress={() => {
          // navigation.navigate("paymentMethod")
        }}
        width={"100%"}
        color={"primary"}
        variant={"solid"}
        title={"Pay Now"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  paymentContainer: {
    height: 50,
    width: "100%",
    backgroundColor: "rgba(247,247,247,0.9)",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    padding: 10,
  },
});

export default PaymentMethodScreen;
