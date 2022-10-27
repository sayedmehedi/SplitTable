import React from "react";
import {Box, Image, Text} from "@components/ui";
import emptyListStateImage from "@assets/empty-list.png";
import {useDimensions} from "@react-native-community/hooks";

const GenericListEmpty = () => {
  const {
    window: {width: windowWidth, height: windowHeight},
  } = useDimensions();

  return (
    <Box
      alignItems={"center"}
      justifyContent={"center"}
      height={windowHeight * 0.8}>
      <Image
        alt={"empty-list"}
        resizeMode={"contain"}
        width={windowWidth * 0.9}
        height={windowHeight * 0.4}
        source={emptyListStateImage}
      />
      <Text
        mt={5}
        fontSize={"lg"}
        textAlign={"center"}
        fontFamily={"SatoshiVariable-Bold"}>
        No Data
      </Text>
    </Box>
  );
};

export default GenericListEmpty;
