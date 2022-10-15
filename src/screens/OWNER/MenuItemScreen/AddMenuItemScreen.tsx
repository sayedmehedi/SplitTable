import React from "react";
import Button from "@components/Button";
import {OwnerStackRoutes} from "@constants/routes";
import {StackScreenProps} from "@react-navigation/stack";
import AntDesign from "react-native-vector-icons/AntDesign";
import {TouchableOpacity} from "react-native-gesture-handler";
import {View, Text, StyleSheet, TextInput} from "react-native";
import {CompositeScreenProps} from "@react-navigation/native";
import {OwnerStackParamList, RootStackParamList} from "@src/types";

type Props = CompositeScreenProps<
  StackScreenProps<OwnerStackParamList, typeof OwnerStackRoutes.ADD_MENU_ITEM>,
  StackScreenProps<RootStackParamList>
>;

const AddMenuItemScreen = ({navigation}: Props) => {
  const handleSubmit = () => {
    navigation.goBack();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 10,
        alignItems: "center",
      }}>
      <TouchableOpacity
        style={{
          height: 80,
          width: 80,
          borderRadius: 40,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFE1F7",
        }}>
        <AntDesign name="camerao" color={"#402B8C"} size={20} />
        <Text style={{color: "#402B8C", fontSize: 10}}>Add Image</Text>
      </TouchableOpacity>

      <View style={{flex: 1, marginTop: 20}}>
        <View style={styles.SectionStyle}>
          <TextInput
            style={{flex: 1, paddingLeft: 20}}
            placeholder="Menu Title"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <View style={[styles.SectionStyle, {width: "47%"}]}>
            <TextInput style={{flex: 1, paddingLeft: 20}} placeholder="Price" />
          </View>
          <View style={[styles.SectionStyle, {width: "47%"}]}>
            <TextInput
              style={{flex: 1, paddingLeft: 20}}
              placeholder="Qty. Stock"
            />
          </View>
        </View>

        <View style={[styles.SectionStyle, {height: 100}]}>
          <TextInput
            style={{flex: 1, paddingLeft: 20}}
            placeholder="Item Short Details"
          />
        </View>

        <Button
          width={"100%"}
          title={"Submit"}
          color={"primary"}
          variant={"solid"}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F5F7",
    height: 50,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default AddMenuItemScreen;
