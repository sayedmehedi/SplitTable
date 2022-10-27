import React from "react";
import {SvgUri} from "react-native-svg";
import {LocationItem} from "@src/models";
import {useDisclosure} from "react-use-disclosure";
import useGetLocationsQuery from "@hooks/clubs/useGetLocationsQuery";
import {Box, Pressable, ScrollView, Spinner, Text} from "@components/ui";

type Props = {
  onItemPress?: (item: LocationItem) => void;
};

function EachSvg({uri}: {uri: string}) {
  const {isOpen: loading, close: onClose} = useDisclosure(true);

  const onError = (e: Error) => {
    onClose();
  };
  const onLoad = () => {
    onClose();
  };

  return (
    <>
      {/* {loading && <Skeleton size={"20"} borderRadius={"full"} />} */}
      <SvgUri uri={uri} onError={onError} onLoad={onLoad} />
    </>
  );
}

const LocationSwiper = ({onItemPress}: Props) => {
  const {data: locationsResponse, isLoading: isLocationLoading} =
    useGetLocationsQuery();

  const handleItemPress = (item: LocationItem) => {
    onItemPress?.(item);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      _contentContainerStyle={{
        px: 6,
      }}>
      {/* {isLocationLoading
        ? new Array(6).fill(1).map((_, index) => {
            return (
              <Center width={"24"} key={index}>
                <Skeleton size={"20"} borderRadius={"full"} />
                <Skeleton size={"2"} width={"1/2"} mt={"3"} />
              </Center>
            );
          })
        : locationsResponse?.items.data.map((item, index) => {
            return (
              <Pressable
                key={item.id}
                mr={index === locationsResponse.items.data.length - 1 ? 0 : 3}
                onPress={handleItemPress.bind(null, item)}>
                <Box m={1} alignItems={"center"}>
                  <EachSvg uri={item.image} />

                  <Text
                    mt={2}
                    color={"black"}
                    fontWeight={"600"}
                    fontFamily={"roboto"}>
                    {item.location}
                  </Text>
                </Box>
              </Pressable>
            );
          })} */}
    </ScrollView>
  );
};

export default LocationSwiper;
