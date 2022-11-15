import {
  View,
  Image,
  ScrollView,
  Dimensions,
  ListRenderItem,
} from "react-native";
import React from "react";
import {OwnerStackRoutes} from "@constants/routes";
import {StackScreenProps} from "@react-navigation/stack";
import {CompositeScreenProps} from "@react-navigation/native";
import {RootStackParamList, OwnerStackParamList} from "@src/navigation";
import InformationUpdaterItem from "./modals/InformationUpdaterItem";

const screenWidth = Dimensions.get("screen").width;

const renderAllStory: ListRenderItem<{
  id: number;
  uri: string;
  like: string;
  disLike: string;
}> = ({item}) => (
  <View style={{margin: 3}}>
    <Image
      source={{uri: item.uri}}
      style={{
        height: 100,
        width: screenWidth / 3 - 10,
      }}
    />
  </View>
);

type Props = CompositeScreenProps<
  StackScreenProps<OwnerStackParamList, typeof OwnerStackRoutes.INFORMATION>,
  StackScreenProps<RootStackParamList>
>;

const InformationScreen = ({}: Props) => {
  return (
    <ScrollView>
      <View
        style={{paddingHorizontal: 12, backgroundColor: "#FFFFFF", flex: 1}}>
        <InformationUpdaterItem type="time" />

        <InformationUpdaterItem type="cuisine" />

        <InformationUpdaterItem type="cost" />

        <InformationUpdaterItem type="about" />

        <InformationUpdaterItem type="slider" />
      </View>
    </ScrollView>
  );
};

export default InformationScreen;
