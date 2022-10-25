import React from "react";
import EachItem from "./EachItem";
import {productData} from "@constants/dummy";
import {View, Text, FlatList} from "react-native";

const renderClubList = ({item}) => <EachItem item={item} />;

const CustomerTableScreen = () => {
  return (
    <View style={{padding: 20, backgroundColor: "white"}}>
      <FlatList data={productData} renderItem={renderClubList} />
    </View>
  );
};

export default CustomerTableScreen;
