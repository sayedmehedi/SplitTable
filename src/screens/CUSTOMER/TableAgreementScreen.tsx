import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {splitAppTheme} from "@src/theme";
import {isSplitTableDetails} from "@utils/table";
import TableIcon from "@assets/icons/table-ico.svg";
import {CustomerStackRoutes} from "@constants/routes";
import {StackScreenProps} from "@react-navigation/stack";
import LinearGradient from "react-native-linear-gradient";
import AppGradientButton from "@components/AppGradientButton";
import {CompositeScreenProps} from "@react-navigation/native";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";

type Props = CompositeScreenProps<
  StackScreenProps<
    CustomerStackParamList,
    typeof CustomerStackRoutes.TABLE_AGREEMENT
  >,
  StackScreenProps<RootStackParamList>
>;

export default function TableAgreementScreen({route, navigation}: Props) {
  const {tableDetails} = route.params;

  const handleBookTable = () => {
    if (isSplitTableDetails(tableDetails)) {
      navigation.navigate(CustomerStackRoutes.GUEST_N_MENU, {
        tableDetails: tableDetails,
      });
    } else {
      navigation.navigate(CustomerStackRoutes.ADD_MENU_ITEM, {
        menGuestCount: 0,
        womenGuestCount: 0,
        tableDetails: tableDetails,
      });
    }
  };

  return (
    <LinearGradient
      end={{x: 0, y: 0}}
      start={{x: 0, y: 1}}
      colors={["#DF3BC0", "#472BBE"]}
      style={{
        flex: 1,
        padding: splitAppTheme.space[5],
        backgroundColor: splitAppTheme.colors.secondary[400],
      }}>
      <FocusAwareStatusBar
        animated
        barStyle={"dark-content"}
        backgroundColor={splitAppTheme.colors.secondary[400]}
      />

      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}>
        <LinearGradient
          end={{x: 0, y: 0}}
          start={{x: 0, y: 1}}
          colors={["#DF3BC0", "#472BBE"]}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
            marginTop: splitAppTheme.space[6],
          }}>
          <TableIcon
            width={30}
            height={30}
            fill={splitAppTheme.colors.primary[400]}
          />
        </LinearGradient>

        <View
          style={{
            width: splitAppTheme.sizes.full,
            marginTop: splitAppTheme.space[5],
          }}>
          <Text
            style={{
              color: splitAppTheme.colors.white,
              fontSize: splitAppTheme.fontSizes.lg,
              marginBottom: splitAppTheme.space[3],
              fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
            }}>
            Split Table want to help you attend the best Quality clubs however
            you will not be granted entry if
          </Text>

          <Text
            style={{
              fontSize: splitAppTheme.fontSizes.md,
              color: splitAppTheme.colors.white,
            }}>
            ● You will not be Allowed in if you show up intoxicated
          </Text>

          <Text
            style={{
              fontSize: splitAppTheme.fontSizes.md,
              color: splitAppTheme.colors.white,
            }}>
            ● You don't comply with the venues dress code
          </Text>

          <Text
            style={{
              fontSize: splitAppTheme.fontSizes.md,
              color: splitAppTheme.colors.white,
            }}>
            ● You are banned from entering the club
          </Text>

          <Text
            style={{
              fontSize: splitAppTheme.fontSizes.md,
              color: splitAppTheme.colors.white,
            }}>
            ● You are underage
          </Text>
        </View>

        <View
          style={{
            width: splitAppTheme.sizes.full,
            marginTop: splitAppTheme.space[5],
          }}>
          <Text
            style={{
              color: splitAppTheme.colors.white,
              fontSize: splitAppTheme.fontSizes.lg,
              marginBottom: splitAppTheme.space[3],
              fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
            }}>
            Please note:
          </Text>

          <Text
            style={{
              fontSize: splitAppTheme.fontSizes.md,
              color: splitAppTheme.colors.white,
            }}>
            ● You will need to bring an acceptable ID
          </Text>

          <Text
            style={{
              fontSize: splitAppTheme.fontSizes.md,
              color: splitAppTheme.colors.white,
            }}>
            ● Contact Split table for all detail
          </Text>

          <Text
            style={{
              fontSize: splitAppTheme.fontSizes.md,
              color: splitAppTheme.colors.white,
            }}>
            ● You will need to comply with split table and venue terms and
            conditions
          </Text>
        </View>
      </View>

      <View
        style={{
          width: splitAppTheme.sizes.full,
        }}>
        <AppGradientButton
          width={"100%"}
          color={"white"}
          variant={"solid"}
          onPress={handleBookTable}
          title={"I agree with terms"}
        />

        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <View
            style={{
              padding: splitAppTheme.space[3],
            }}>
            <Text
              style={{
                textAlign: "center",
                color: splitAppTheme.colors.white,
                fontSize: splitAppTheme.fontSizes.md,
              }}>
              Cancel
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
