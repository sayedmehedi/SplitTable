import React from "react";
import {splitAppTheme} from "@src/theme";
import {Image, Text, View} from "react-native";
import emptyListStateImage from "@assets/empty-list.png";
import {useDimensions, useImageDimensions} from "@react-native-community/hooks";

type Props = {
  width: number | string;
  height: number | string;
};

const GenericListEmpty = ({
  height: IMAGE_WIDTH,
  width: IMAGE_HEIGHT,
}: Props) => {
  // const {
  //   window: {width: WINDOW_WIDTH, height: WINDOW_HEIGHT},
  // } = useDimensions();

  // const {dimensions, loading, error} = useImageDimensions(emptyListStateImage);

  // if (loading) {
  //   return <Text>Image loading..</Text>;
  // }

  // if (error) {
  //   return <Text>{error.message}</Text>;
  // }

  // if (!dimensions) {
  //   return <Text>No Dimenstion</Text>;
  // }

  // const {width: IMAGE_WIDTH, height: IMAGE_HEIGHT, aspectRatio} = dimensions;

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Image
        resizeMode={"contain"}
        style={{
          width: IMAGE_WIDTH,
          height: IMAGE_HEIGHT,
        }}
        source={emptyListStateImage}
      />
    </View>
  );
};

export default GenericListEmpty;
