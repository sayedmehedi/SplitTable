import React from "react";
import {splitAppTheme} from "@src/theme";
import Feather from "react-native-vector-icons/Feather";
import {StackScreenProps} from "@react-navigation/stack";
import {version as AppVersion} from "../../../../app.json";
import {
  CustomerProfileStackRoutes,
  CustomerStackRoutes,
  RootStackRoutes,
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
import FastImage from "react-native-fast-image";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";

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
      style={{
        flex: 1,
        backgroundColor: splitAppTheme.colors.white,
      }}
      contentContainerStyle={{
        paddingBottom: splitAppTheme.space[6],
        paddingHorizontal: splitAppTheme.space[6],
      }}>
      <FocusAwareStatusBar
        barStyle={"dark-content"}
        backgroundColor={splitAppTheme.colors.white}
      />
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
        <FastImage
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
              fontFamily: splitAppTheme.fontConfig.Sathoshi[500].normal,
            }}>
            {profileData?.location}
          </Text>
          <Text
            style={{
              fontFamily: splitAppTheme.fontConfig.Sathoshi[500].normal,
              fontSize: 12,
              color: "#8A8D9F",
            }}>
            Member Since June 2022
          </Text>
        </View>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate(RootStackRoutes.PROFILE, {})}
          style={styles.sectionContainer}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <View>
              <ProfileIcon height={35} width={35} />
            </View>

            <View>
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 10,
                  color: "#262B2E",
                  fontFamily: splitAppTheme.fontConfig.Sathoshi[500].normal,
                }}>
                Profile
              </Text>
            </View>
          </View>

          <View>
            <Feather name="chevron-right" color={"#8A8D9F"} size={22} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(CustomerStackRoutes.ACCOUNT_SETTING)
          }
          style={styles.sectionContainer}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <View>
              <AccountSettingIcon height={35} width={35} />
            </View>
            <Text
              style={{
                fontSize: 16,
                marginLeft: 10,
                color: "#262B2E",
                fontFamily: splitAppTheme.fontConfig.Sathoshi[500].normal,
              }}>
              Account Setting
            </Text>
          </View>

          <View>
            <Feather name="chevron-right" color={"#8A8D9F"} size={22} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate(CustomerStackRoutes.TRANSACTION)}
          style={styles.sectionContainer}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <View>
              <TransactionIcon height={35} width={35} />
            </View>
            <Text
              style={{
                fontSize: 16,
                marginLeft: 10,
                color: "#262B2E",
                fontFamily: splitAppTheme.fontConfig.Sathoshi[500].normal,
              }}>
              Transaction
            </Text>
          </View>

          <View>
            <Feather name="chevron-right" color={"#8A8D9F"} size={22} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate(CustomerStackRoutes.FAVORITE)}
          style={styles.sectionContainer}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <View>
              <FavouriteIcon height={35} width={35} />
            </View>
            <Text
              style={{
                fontSize: 16,
                marginLeft: 10,
                color: "#262B2E",
                fontFamily: splitAppTheme.fontConfig.Sathoshi[500].normal,
              }}>
              Favorite
            </Text>
          </View>

          <View>
            <Feather name="chevron-right" color={"#8A8D9F"} size={22} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate(CustomerStackRoutes.FAQ)}
          style={styles.sectionContainer}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <View>
              <FaqIcon height={35} width={35} />
            </View>
            <Text
              style={{
                fontSize: 16,
                marginLeft: 10,
                color: "#262B2E",
                fontFamily: splitAppTheme.fontConfig.Sathoshi[500].normal,
              }}>
              Faq's
            </Text>
          </View>

          <View>
            <Feather name="chevron-right" color={"#8A8D9F"} size={22} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate(CustomerStackRoutes.LEGAL)}
          style={styles.sectionContainer}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <View>
              <LegalIcon height={35} width={35} />
            </View>
            <Text
              style={{
                fontSize: 16,
                marginLeft: 10,
                color: "#262B2E",
                fontFamily: splitAppTheme.fontConfig.Sathoshi[500].normal,
              }}>
              Legal
            </Text>
          </View>

          <View>
            <Feather name="chevron-right" color={"#8A8D9F"} size={22} />
          </View>
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
            <View>
              <LogoutIcon height={35} width={35} />
            </View>
            <Text
              style={{
                fontSize: 16,
                marginLeft: 10,
                color: "#262B2E",
                fontFamily: splitAppTheme.fontConfig.Sathoshi[500].normal,
              }}>
              Logout
            </Text>
          </View>

          <View>
            <Feather name="chevron-right" color={"#8A8D9F"} size={22} />
          </View>
        </TouchableOpacity>

        <Text
          style={{
            marginVertical: 5,
            alignSelf: "center",
          }}>
          App Version {AppVersion}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    width: "100%",
    paddingVertical: 15,
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderColor: "#C8C8D3",
    justifyContent: "space-between",
  },
});

export default AccountScreen;
