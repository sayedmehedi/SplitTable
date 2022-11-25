import React from "react";
import {StyleSheet} from "react-native";
import {splitAppTheme} from "@src/theme";
import {AuthTypes} from "@constants/auth";
import {RootStackRoutes} from "@constants/routes";
import {RootStackParamList} from "@src/navigation";
import OwnerSignUpForm from "@components/OwnerSignupForm";
import {StackScreenProps} from "@react-navigation/stack";
import {AuthTypeContext} from "@providers/AuthTypeProvider";
import CustomerSignupForm from "@components/CustomerSignupForm";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";

type Props = StackScreenProps<
  RootStackParamList,
  typeof RootStackRoutes.SIGNUP
>;

const SignUpScreen = ({navigation}: Props) => {
  const {authType} = React.useContext(AuthTypeContext);

  return (
    <>
      <FocusAwareStatusBar
        barStyle={"dark-content"}
        backgroundColor={splitAppTheme.colors.white}
      />
      {authType === AuthTypes.CUSTOMER ? (
        <CustomerSignupForm navigation={navigation} />
      ) : (
        <OwnerSignUpForm navigation={navigation} />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  SectionStyle: {
    height: 50,
    marginTop: 10,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#F4F5F7",
  },
});

export default SignUpScreen;
