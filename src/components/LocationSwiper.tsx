import React from "react";
import {SvgUri} from "react-native-svg";
import {LocationItem} from "@src/models";
import {splitAppTheme} from "@src/theme";
import {useDisclosure} from "react-use-disclosure";
import {Pressable, ScrollView, Text, View} from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import useGetLocationsQuery from "@hooks/clubs/useGetLocationsQuery";

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
      {loading && (
        <SkeletonPlaceholder>
          <View>
            <View
              style={{
                width: splitAppTheme.sizes["20"],
                height: splitAppTheme.sizes["20"],
                borderRadius: splitAppTheme.radii.full,
              }}
            />
          </View>
        </SkeletonPlaceholder>
      )}
      <SvgUri uri={uri} onError={onError} onLoad={onLoad} />
    </>
  );
}

const LocationSwiper = ({onItemPress}: Props) => {
  const {data: locationsResponse, isLoading: isLocationLoading} =
    useGetLocationsQuery();

  console.log("locationsResponse", locationsResponse);

  const handleItemPress = (item: LocationItem) => {
    onItemPress?.(item);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: splitAppTheme.space[6],
      }}>
      {isLocationLoading
        ? new Array(6).fill(1).map((_, index) => {
            return (
              <View
                style={{
                  width: splitAppTheme.sizes[24],
                }}
                key={index}>
                <SkeletonPlaceholder>
                  <View>
                    <View
                      style={{
                        width: splitAppTheme.sizes["20"],
                        height: splitAppTheme.sizes["20"],
                        borderRadius: splitAppTheme.radii.full,
                      }}
                    />

                    <View
                      style={{
                        marginTop: splitAppTheme.space["3"],
                      }}>
                      <View
                        style={{
                          width: splitAppTheme.space["2/3"],
                          height: splitAppTheme.sizes["1.5"],
                        }}
                      />
                    </View>
                  </View>
                </SkeletonPlaceholder>
              </View>
            );
          })
        : locationsResponse?.items?.map((item, index) => {
            return (
              <Pressable
                style={{
                  marginRight:
                    splitAppTheme.space[
                      index === locationsResponse.items.length - 1 ? 0 : 3
                    ],
                }}
                key={item.id}
                onPress={handleItemPress.bind(null, item)}>
                <View
                  style={{
                    margin: splitAppTheme.space[1],
                    alignItems: "center",
                  }}>
                  <EachSvg uri={item.image} />

                  <Text
                    style={{
                      fontWeight: "600",
                      marginTop: splitAppTheme.space[2],
                      color: splitAppTheme.colors.black,
                      fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
                    }}>
                    {item.location}
                  </Text>
                </View>
              </Pressable>
            );
          })}
    </ScrollView>
  );
};

export default LocationSwiper;
