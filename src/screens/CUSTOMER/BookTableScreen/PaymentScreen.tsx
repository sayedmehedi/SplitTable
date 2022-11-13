import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {CustomerStackRoutes} from "@constants/routes";
import {StackScreenProps} from "@react-navigation/stack";
import {TouchableOpacity} from "react-native-gesture-handler";
import AppGradientButton from "@components/AppGradientButton";
import {CompositeScreenProps} from "@react-navigation/native";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";

type Props = CompositeScreenProps<
  StackScreenProps<CustomerStackParamList, typeof CustomerStackRoutes.PAYMENT>,
  StackScreenProps<RootStackParamList>
>;

const PaymentScreen = ({navigation, route}: Props) => {
  return (
    <View style={{flex: 1, backgroundColor: "#FFFFFF", padding: 20}}>
      <TouchableOpacity style={styles.paymentContainer}>
        <Text>Pay full payment</Text>
        <Text>${route.params.totalAmount}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.paymentContainer}>
        <Text>Pay only 10% payment</Text>
        <Text>${route.params.partialAmount}</Text>
      </TouchableOpacity>

      <AppGradientButton
        onPress={() => {
          // navigation.navigate("paymentMethod")
        }}
        width={"100%"}
        color={"primary"}
        variant={"solid"}
        title={"Confirm Booking"}
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

export default PaymentScreen;
