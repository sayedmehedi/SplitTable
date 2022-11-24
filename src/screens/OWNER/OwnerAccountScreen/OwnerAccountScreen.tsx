import React from "react";
import {splitAppTheme} from "@src/theme";
import {OwnerStackRoutes} from "@constants/routes";
import Feather from "react-native-vector-icons/Feather";
import {StackScreenProps} from "@react-navigation/stack";
import {version as AppVersion} from "../../../../app.json";
import GenericListEmpty from "@components/GenericListEmpty";
import {CompositeScreenProps} from "@react-navigation/native";
import useLogoutMutation from "@hooks/auth/useLogoutMutation";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import useGetOwnerClubInfoQuery from "@hooks/clubs/useGetOwnerClubInfoQuery";
import {
  View,
  Text,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  FaqIcon,
  InfoIcon,
  ReviewIcon,
  LegalIcon,
  LogoutIcon,
  HolidayIcon,
  TransactionIcon,
  AccountSettingIcon,
} from "@constants/iconPath";
import {
  RootStackParamList,
  OwnerStackParamList,
  OwnerBottomTabParamList,
  OwnerAccountStackParamList,
} from "@src/navigation";
import useGetAuthDataQuery from "@hooks/useGetAuthDataQuery";

type OwnerAccountScreenProps = CompositeScreenProps<
  CompositeScreenProps<
    CompositeScreenProps<
      StackScreenProps<
        OwnerAccountStackParamList,
        typeof OwnerStackRoutes.ACCOUNT
      >,
      BottomTabScreenProps<OwnerBottomTabParamList>
    >,
    StackScreenProps<OwnerStackParamList>
  >,
  StackScreenProps<RootStackParamList>
>;

const OwnerAccountScreen = ({navigation}: OwnerAccountScreenProps) => {
  const {
    data: clubInfoData,
    error: clubInfoError,
    isLoading: isClubInfoLoading,
  } = useGetOwnerClubInfoQuery();
  useHandleNonFieldError(clubInfoError);
  const {data: authData, isLoading: isAuthDataLoading} = useGetAuthDataQuery();

  const {mutate: logout, error: logoutError} = useLogoutMutation();
  useHandleNonFieldError(logoutError);

  if (isClubInfoLoading || isAuthDataLoading) {
    return (
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <ActivityIndicator size={"small"} />
      </View>
    );
  }

  if (!clubInfoData) {
    return <GenericListEmpty height={300} width={300} />;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: splitAppTheme.colors.white,
      }}
      contentContainerStyle={{
        paddingBottom: splitAppTheme.space[6],
        paddingHorizontal: splitAppTheme.space[6],
      }}>
      <View
        style={{
          height: 90,
          padding: 10,
          width: "100%",
          borderRadius: 5,
          marginVertical: 20,
          alignItems: "center",
          flexDirection: "row",
          borderColor: "#DBDBDB",
          borderWidth: splitAppTheme.borderWidths[1],
        }}>
        <Image
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
          }}
          source={{
            uri: authData?.profile_image,
          }}
        />

        <View style={{marginLeft: 10}}>
          <Text
            style={{
              fontFamily: "SatoshiVariable-Bold",
              fontSize: 16,
              color: "#030819",
            }}>
            {clubInfoData.name}
          </Text>
          <Text
            style={{
              fontFamily: "Satoshi-Regular",
              fontSize: 12,
              color: "#8A8D9F",
            }}>
            {clubInfoData.location}
          </Text>
          <Text
            style={{
              fontFamily: "Satoshi-Regular",
              fontSize: 12,
              color: "#8A8D9F",
            }}>
            Opening hour: {clubInfoData.opening_time} -{" "}
            {clubInfoData.closing_time}
          </Text>
        </View>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate(OwnerStackRoutes.INFORMATION)}
          style={styles.sectionContainer}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <View>
              <InfoIcon height={35} width={35} />
            </View>

            <View>
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 10,
                  color: "#262B2E",
                  fontFamily: "Satoshi-Regular",
                }}>
                Information
              </Text>
            </View>
          </View>

          <View>
            <Feather name="chevron-right" color={"#8A8D9F"} size={22} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate(OwnerStackRoutes.ACCOUNT_SETTING)}
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
                fontFamily: "Satoshi-Regular",
              }}>
              Account Setting
            </Text>
          </View>

          <Feather name="chevron-right" color={"#8A8D9F"} size={22} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate(OwnerStackRoutes.TRANSACTION)}
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
                fontFamily: "Satoshi-Regular",
              }}>
              Transaction
            </Text>
          </View>

          <Feather name="chevron-right" color={"#8A8D9F"} size={22} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate(OwnerStackRoutes.REVIEWS)}
          style={styles.sectionContainer}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <View>
              <ReviewIcon height={35} width={35} />
            </View>
            <Text
              style={{
                fontSize: 16,
                marginLeft: 10,
                color: "#262B2E",
                fontFamily: "Satoshi-Regular",
              }}>
              Reviews
            </Text>
          </View>

          <Feather name="chevron-right" color={"#8A8D9F"} size={22} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate(OwnerStackRoutes.HOLIDAYS)}
          style={styles.sectionContainer}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <View>
              <HolidayIcon height={35} width={35} />
            </View>
            <Text
              style={{
                fontSize: 16,
                marginLeft: 10,
                color: "#262B2E",
                fontFamily: "Satoshi-Regular",
              }}>
              Holidays
            </Text>
          </View>

          <Feather name="chevron-right" color={"#8A8D9F"} size={22} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(OwnerStackRoutes.FAQ)}
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
                fontFamily: "Satoshi-Regular",
              }}>
              Faq's
            </Text>
          </View>

          <Feather name="chevron-right" color={"#8A8D9F"} size={22} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate(OwnerStackRoutes.LEGAL)}
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
            <View>
              <LogoutIcon height={35} width={35} />
            </View>
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
            alignSelf: "center",
            marginVertical: splitAppTheme.space[3],
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
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderStyle: "dashed",
    borderColor: "#C8C8D3",
    justifyContent: "space-between",
  },
});

export default OwnerAccountScreen;
