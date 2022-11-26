import React from "react";
import truncate from "lodash.truncate";
import {ReviewItem} from "@src/models";
import {splitAppTheme} from "@src/theme";
import {Text, View} from "react-native";
import {Rating} from "react-native-ratings";
import FastImage from "react-native-fast-image";

type Props = {
  item: ReviewItem;
};

const EachReviewItem = ({item}: Props) => {
  return (
    <View>
      <View style={{alignItems: "center", flexDirection: "row"}}>
        <FastImage
          source={{uri: item.user_image}}
          style={{
            width: 50,
            height: 50,
            borderRadius: splitAppTheme.radii.full,
          }}
        />

        <View
          style={{
            flex: 1,
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "flex-start",
            marginLeft: splitAppTheme.space[4],
          }}>
          <View
            style={{
              flexDirection: "row",
              width: splitAppTheme.sizes.full,
              justifyContent: "space-between",
              marginBottom: splitAppTheme.space[1],
            }}>
            <Text
              style={{
                fontSize: splitAppTheme.fontSizes.md,
              }}>
              {item.user_name}
            </Text>

            <Text
              style={{
                fontSize: splitAppTheme.fontSizes.md,
              }}>
              {item.date}
            </Text>
          </View>

          <Rating
            readonly
            imageSize={15}
            showRating={false}
            tintColor={"white"}
            startingValue={item.rating}
          />
        </View>
      </View>

      <Text
        style={{
          marginTop: splitAppTheme.space[4],
          fontSize: splitAppTheme.fontSizes.md,
        }}>
        {item.review.trim()}
      </Text>
    </View>
  );
};

export default EachReviewItem;
