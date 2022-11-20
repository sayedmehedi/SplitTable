import React from "react";
import {splitAppTheme} from "@src/theme";
import BookingIcon from "@assets/icons/booking.svg";
import AccountIcon from "@assets/icons/account.svg";
import Entypo from "react-native-vector-icons/Entypo";
import {MenuIcon, RedTable} from "@constants/iconPath";
import LinearGradient from "react-native-linear-gradient";
import {View, Text, TouchableOpacity} from "react-native";
import {OwnerMainBottomTabRoutes, OwnerStackRoutes} from "@constants/routes";
import {BottomTabBarProps} from "@react-navigation/bottom-tabs";

export default function OwnerBottomTabBar({
  state,
  navigation,
  descriptors,
}: BottomTabBarProps) {
  function renderButton(
    routeName: typeof OwnerMainBottomTabRoutes[keyof typeof OwnerMainBottomTabRoutes],
    color: string,
  ) {
    switch (routeName) {
      case OwnerMainBottomTabRoutes.MENU:
        return <MenuButton color={color} />;
      case OwnerMainBottomTabRoutes.OWNER_ACCOUNT:
        return <AccountButton color={color} />;
      case OwnerMainBottomTabRoutes.OWNER_BOOKING:
        return <BookingButton color={color} />;
      case OwnerMainBottomTabRoutes.OWNER_TABLE:
        return <HomeButton color={color} />;
      default:
        return <TableAddButton />;
    }
  }

  const checkIsFocused = (index: number) => {
    return state.index === index;
  };

  //   const getOptions = (routeKey: string) => {
  //     const {options} = descriptors[routeKey];
  //     return options;
  //   };

  const hanldePress = (index: number) => {
    const event = navigation.emit({
      type: "tabPress",
      canPreventDefault: true,
      target: state.routes[index].key,
    });

    if (!checkIsFocused(index) && !event.defaultPrevented) {
      // The `merge: true` option makes sure that the params inside the tab screen are preserved
      // @ts-ignore
      navigation.navigate({name: state.routes[index].name, merge: true});
    }
  };

  const hanldeLongPress = (index: number) => {
    navigation.emit({
      type: "tabLongPress",
      target: state.routes[index].key,
    });
  };

  return (
    <View
      style={{
        height: 60,
        elevation: 20,
        flexDirection: "row",
        backgroundColor: splitAppTheme.colors.white,
        shadowColor: splitAppTheme.colors.primary[400],
      }}>
      <TouchableOpacity
        style={{flex: 1}}
        accessibilityRole={"button"}
        onPress={() => hanldePress(0)}
        onLongPress={() => hanldeLongPress(0)}
        accessibilityState={checkIsFocused(0) ? {selected: true} : {}}>
        {renderButton(
          OwnerMainBottomTabRoutes.OWNER_TABLE,
          checkIsFocused(0)
            ? splitAppTheme.colors.primary[400]
            : splitAppTheme.colors.secondary[400],
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={{flex: 1}}
        accessibilityRole={"button"}
        onPress={() => hanldePress(1)}
        onLongPress={() => hanldeLongPress(1)}
        accessibilityState={checkIsFocused(1) ? {selected: true} : {}}>
        {renderButton(
          OwnerMainBottomTabRoutes.OWNER_BOOKING,
          checkIsFocused(1)
            ? splitAppTheme.colors.primary[400]
            : splitAppTheme.colors.secondary[400],
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate(OwnerStackRoutes.UPSERT_TABLE, {
            actionMode: "create",
          });
        }}
        style={{flex: 1}}>
        {renderButton(OwnerMainBottomTabRoutes.TABLE_ADD, "")}
      </TouchableOpacity>

      <TouchableOpacity
        style={{flex: 1}}
        accessibilityRole={"button"}
        onPress={() => hanldePress(2)}
        onLongPress={() => hanldeLongPress(2)}
        accessibilityState={checkIsFocused(2) ? {selected: true} : {}}>
        {renderButton(
          OwnerMainBottomTabRoutes.MENU,
          checkIsFocused(2)
            ? splitAppTheme.colors.primary[400]
            : splitAppTheme.colors.secondary[400],
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={{flex: 1}}
        accessibilityRole={"button"}
        onPress={() => hanldePress(3)}
        onLongPress={() => hanldeLongPress(3)}
        accessibilityState={checkIsFocused(3) ? {selected: true} : {}}>
        {renderButton(
          OwnerMainBottomTabRoutes.OWNER_ACCOUNT,
          checkIsFocused(3)
            ? splitAppTheme.colors.primary[400]
            : splitAppTheme.colors.secondary[400],
        )}
      </TouchableOpacity>
    </View>
  );
}

function AccountButton({color}: {color: string}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
      <AccountIcon height={22} width={22} color={color} />

      <Text
        style={{
          color,
          fontSize: splitAppTheme.fontSizes["xs"],
          fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
        }}>
        Account
      </Text>
    </View>
  );
}

function BookingButton({color}: {color: string}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
      <BookingIcon height={22} width={22} color={color} />

      <Text
        style={{
          color,
          fontSize: splitAppTheme.fontSizes["xs"],
          fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
        }}>
        Booking
      </Text>
    </View>
  );
}

function MenuButton({color}: {color: string}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
      <MenuIcon height={22} width={22} color={color} />

      <Text
        style={{
          color,
          fontSize: splitAppTheme.fontSizes["xs"],
          fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
        }}>
        Menu
      </Text>
    </View>
  );
}

function HomeButton({color}: {color: string}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
      <RedTable width={22} height={22} color={color} />

      <Text
        style={{
          color: color,
          fontSize: splitAppTheme.fontSizes["xs"],
          fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
        }}>
        Table
      </Text>
    </View>
  );
}

function TableAddButton({}: {}) {
  return (
    <View
      style={{
        flex: 1,
        height: 100,
        marginTop: -20,
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
        }}>
        <Entypo name="plus" size={30} color={"white"} />
      </LinearGradient>
    </View>
  );
}
