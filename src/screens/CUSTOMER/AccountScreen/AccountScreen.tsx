import React from "react";
import Feather from "react-native-vector-icons/Feather";
import {StackScreenProps} from "@react-navigation/stack";
import {
  CustomerProfileStackRoutes,
  CustomerStackRoutes,
} from "@constants/routes";
import {CompositeScreenProps} from "@react-navigation/native";
import useLogoutMutation from "@hooks/auth/useLogoutMutation";
import useGetProfileQuery from "@hooks/auth/useGetProfileQuery";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  FaqIcon,
  LegalIcon,
  LogoutIcon,
  ProfileIcon,
  FavouriteIcon,
  TransactionIcon,
  AccountSettingIcon,
} from "@constants/iconPath";
import {
  RootStackParamList,
  CustomerStackParamList,
  CustomerBottomTabParamList,
  CustomerProfileStackParamList,
} from "@src/navigation";

type Props = CompositeScreenProps<
  CompositeScreenProps<
    CompositeScreenProps<
      StackScreenProps<
        CustomerProfileStackParamList,
        typeof CustomerProfileStackRoutes.ACCOUNT
      >,
      BottomTabScreenProps<CustomerBottomTabParamList>
    >,
    StackScreenProps<CustomerStackParamList>
  >,
  StackScreenProps<RootStackParamList>
>;

const AccountScreen = ({navigation}: Props) => {
  const {data: profileData, error, isLoading} = useGetProfileQuery();
  useHandleNonFieldError(error);

  const {mutate: logout, error: logoutError} = useLogoutMutation();
  useHandleNonFieldError(logoutError);

  if (isLoading) {
    return (
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <ActivityIndicator size={"small"} />
      </View>
    );
  }

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: "#FFFFFF", paddingHorizontal: 20}}>
      <View
        style={{
          height: 90,
          padding: 10,
          width: "100%",
          borderWidth: 1,
          borderRadius: 5,
          marginVertical: 20,
          alignItems: "center",
          flexDirection: "row",
          borderColor: "#DBDBDB",
        }}>
        <Image
          style={{
            height: 60,
            width: 60,
            borderRadius: 30,
          }}
          source={{
            uri: profileData?.image,
          }}
        />

        <View style={{marginLeft: 10}}>
          <Text
            style={{
              fontSize: 16,
              color: "#FF3FCB",
              fontFamily: "SatoshiVariable-Bold",
            }}>
            {profileData?.name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#8A8D9F",
              fontFamily: "Satoshi-Regular",
            }}>
            {profileData?.location}
          </Text>
          <Text
            style={{
              fontFamily: "Satoshi-Regular",
              fontSize: 12,
              color: "#8A8D9F",
            }}>
            Member Since June 2022
          </Text>
        </View>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate(CustomerStackRoutes.PROFILE)}
          style={styles.sectionContainer}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <ProfileIcon />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 10,
                color: "#262B2E",
                fontFamily: "Satoshi-Regular",
              }}>
              Profile
            </Text>
          </View>

          <Feather name="chevron-right" color={"#8A8D9F"} size={22} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(CustomerStackRoutes.ACCOUNT_SETTING)
          }
          style={styles.sectionContainer}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <AccountSettingIcon />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 10,
                color: "#262B2E",
                fontFamily: "Satoshi-Regular",
              }}>
              Account Setting
            </Text>
          </View>

          <Feather name="chevron-right" color={"#8A8D9F"} size={22} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate(CustomerStackRoutes.TRANSACTION)}
          style={styles.sectionContainer}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <TransactionIcon />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 10,
                color: "#262B2E",
                fontFamily: "Satoshi-Regular",
              }}>
              Transaction
            </Text>
          </View>

          <Feather name="chevron-right" color={"#8A8D9F"} size={22} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate(CustomerStackRoutes.FAVORITE)}
          style={styles.sectionContainer}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <FavouriteIcon />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 10,
                color: "#262B2E",
                fontFamily: "Satoshi-Regular",
              }}>
              Favorite
            </Text>
          </View>

          <Feather name="chevron-right" color={"#8A8D9F"} size={22} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate(CustomerStackRoutes.FAQ)}
          style={styles.sectionContainer}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <FaqIcon />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 10,
                color: "#262B2E",
                fontFamily: "Satoshi-Regular",
              }}>
              Faq's
            </Text>
          </View>

          <Feather name="chevron-right" color={"#8A8D9F"} size={22} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate(CustomerStackRoutes.LEGAL)}
          style={styles.sectionContainer}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <LegalIcon />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 10,
                color: "#262B2E",
                fontFamily: "Satoshi-Regular",
              }}>
              Legal
            </Text>
          </View>

          <Feather name="chevron-right" color={"#8A8D9F"} size={22} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sectionContainer}
          onPress={() => {
            Alert.alert("Confirm", "Are your sure want to logout?", [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Sure",
                style: "destructive",
                onPress() {
                  logout();
                },
              },
            ]);
          }}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <LogoutIcon />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 10,
                color: "#262B2E",
                fontFamily: "Satoshi-Regular",
              }}>
              Logout
            </Text>
          </View>

          <Feather name="chevron-right" color={"#8A8D9F"} size={22} />
        </TouchableOpacity>
        <Text
          style={{
            marginVertical: 5,
            alignSelf: "center",
          }}>
          App Version V1.0
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    width: "100%",
    paddingVertical: 15,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderColor: "#C8C8D3",
    justifyContent: "space-between",
  },
});

export default AccountScreen;
