import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {StackScreenProps} from "@react-navigation/stack";
import {CompositeScreenProps} from "@react-navigation/native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {OwnerMainBottomTabRoutes, OwnerStackRoutes} from "@constants/routes";
import {
  RootStackParamList,
  OwnerStackParamList,
  OwnerBottomTabParamList,
} from "@src/navigation";

type Props = CompositeScreenProps<
  CompositeScreenProps<
    BottomTabScreenProps<
      OwnerBottomTabParamList,
      typeof OwnerMainBottomTabRoutes.MENU
    >,
    StackScreenProps<OwnerStackParamList>
  >,
  StackScreenProps<RootStackParamList>
>;

const MenuItemScreen = ({navigation}: Props) => {
  return (
    <View style={{flex: 1, backgroundColor: "#FFFFFF", padding: 20}}>
      <TouchableOpacity
        style={styles.addMenuButton}
        onPress={() => navigation.navigate(OwnerStackRoutes.ADD_MENU_ITEM)}>
        <Text style={{color: "#FF3FCB"}}>+ Add Menu Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addMenuButton: {
    height: 50,
    width: "100%",
    borderWidth: 2,
    borderColor: "#FF3FCB",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});

export default MenuItemScreen;
