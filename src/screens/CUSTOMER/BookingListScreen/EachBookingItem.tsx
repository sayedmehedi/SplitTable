import {splitAppTheme} from "@src/theme";
import React from "react";
import {Image, Text, View} from "react-native";

const EachBookingItem = ({item}: any) => {
  return (
    <View
      style={{
        borderWidth: 1,
        alignItems: "center",
        flexDirection: "row",
        borderColor: "#F1F1F1",
        backgroundColor: "white",
        width: splitAppTheme.sizes.full,
        borderRadius: splitAppTheme.radii.xl,
        paddingHorizontal: splitAppTheme.space["4"],
        paddingVertical: splitAppTheme.space["1.5"],
      }}>
      <Image
        style={{
          width: 65,
          height: 65,
          borderRadius: splitAppTheme.radii.xl,
        }}
        source={{
          uri: "https://www.tripsavvy.com/thmb/gauQCVHTK9uk1QZYdM4k2UeRBO8=/640x427/filters:fill(auto,1)/club-56a3e8683df78cf7727fcf6d.jpg",
        }}
      />

      <View
        style={{
          flex: 1,
          marginLeft: splitAppTheme.space[4],
        }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <View>
            <Text
              style={{
                color: "#8A8D9F",
                fontSize: splitAppTheme.fontSizes.sm,
                fontFamily: splitAppTheme.fontConfig.Roboto[400].normal,
              }}>
              {item.dateTime}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}>
            <View
              style={{
                width: splitAppTheme.sizes[2],
                height: splitAppTheme.sizes[2],
                borderRadius: splitAppTheme.radii.full,
                backgroundColor: splitAppTheme.colors.blue[300],
              }}
            />

            <Text
              style={{
                color: "#8A8D9F",
                marginLeft: splitAppTheme.space[1],
                fontSize: splitAppTheme.fontSizes.sm,
                fontFamily: splitAppTheme.fontConfig.Roboto[400].normal,
              }}>
              {item.totalGuest} Guest
            </Text>
          </View>

          <View>
            <Text
              style={{
                fontSize: splitAppTheme.fontSizes.sm,
                color: splitAppTheme.colors.blue[300],
                fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
              }}>
              {item.totalPrice}
            </Text>
          </View>
        </View>

        <Text
          style={{
            color: "#262B2E",
            fontSize: splitAppTheme.fontSizes.md,
            fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
          }}>
          {item.name}
        </Text>

        <Text
          style={{
            color: "#8A8D9F",
            fontSize: splitAppTheme.fontSizes.md,
            fontFamily: splitAppTheme.fontConfig.Roboto[400].normal,
          }}>
          {item.tableName}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}>
            <View
              style={{
                width: splitAppTheme.sizes[2],
                height: splitAppTheme.sizes[2],
                borderRadius: splitAppTheme.radii.full,
                backgroundColor: splitAppTheme.colors.green[300],
              }}
            />

            <Text
              style={{
                marginLeft: splitAppTheme.space[1],
                fontSize: splitAppTheme.fontSizes.sm,
                color: splitAppTheme.colors.green[300],
                fontFamily: splitAppTheme.fontConfig.Roboto[400].normal,
              }}>
              {item.status}
            </Text>
          </View>

          {/* <Button
            variant={"link"}
            _text={{
              fontSize: "sm",
              color: "blue.300",
              fontFamily: "satoshi",
            }}>
            Add Review
          </Button>

          <Button
            variant={"link"}
            _text={{
              fontSize: "sm",
              color: "red.300",
              fontFamily: "satoshi",
            }}>
            Cancel
          </Button> */}
        </View>
      </View>
    </View>
  );
};

export default EachBookingItem;
