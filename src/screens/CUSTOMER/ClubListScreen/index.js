import {View, Text, FlatList} from "react-native";
import React from "react";
import EachItem from "./EachItem";
import {productData} from "../../@constants/dummy";
const renderClubList = ({item}) => <EachItem item={item} />;
const ClubListScreen = () => {
  return (
    <View style={{padding: 20, backgroundColor: "white"}}>
      <FlatList
        data={productData}
        renderItem={renderClubList}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default ClubListScreen;
