import React from "react";
import {ClubBooking} from "@src/models";
import {splitAppTheme} from "@src/theme";
import ReviewModal from "@components/ReviewModal";
import {useDisclosure} from "react-use-disclosure";
import {Image, Text, TouchableOpacity, View} from "react-native";

const EachBookingItem = ({
  item,
  type,
}: {
  item: ClubBooking;
  type: "upcoming" | "history";
}) => {
  const {toggle, isOpen} = useDisclosure();

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
        paddingVertical: splitAppTheme.space["3"],
      }}>
      <Image
        style={{
          width: 65,
          height: 65,
          borderRadius: splitAppTheme.radii.full,
        }}
        source={{
          uri: item.user_image,
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
                fontSize: splitAppTheme.fontSizes.xs,
                fontFamily: splitAppTheme.fontConfig.Roboto[400].normal,
              }}>
              {item.date}
            </Text>
          </View>

          <View>
            <Text
              style={{
                fontSize: splitAppTheme.fontSizes.xs,
                color: splitAppTheme.colors.blue[300],
                fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
              }}>
              {item.amount}
            </Text>
          </View>
        </View>

        <Text
          style={{
            color: "#262B2E",
            fontSize: splitAppTheme.fontSizes.md,
            fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
          }}>
          {item.club}
        </Text>

        <Text
          style={{
            color: "#8A8D9F",
            fontSize: splitAppTheme.fontSizes.md,
            fontFamily: splitAppTheme.fontConfig.Roboto[400].normal,
          }}>
          {item.tables.join(", ")}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: splitAppTheme.space["0.5"],
          }}>
          <Text
            style={{
              color: "#8A8D9F",
              fontSize: splitAppTheme.fontSizes.xs,
              fontFamily: splitAppTheme.fontConfig.Roboto[400].normal,
            }}>
            {item.no_of_guest} Guest
          </Text>
        </View>

        <ReviewModal
          open={isOpen}
          onClose={toggle}
          reviewerId={item.owner_id}
        />

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
                backgroundColor:
                  item.status === "Cancelled"
                    ? splitAppTheme.colors.red[300]
                    : splitAppTheme.colors.green[300],
              }}
            />

            <Text
              style={{
                marginLeft: splitAppTheme.space[1],
                fontSize: splitAppTheme.fontSizes.xs,
                fontFamily: splitAppTheme.fontConfig.Roboto[400].normal,
                color:
                  item.status === "Cancelled"
                    ? splitAppTheme.colors.red[300]
                    : splitAppTheme.colors.green[300],
              }}>
              {type === "upcoming" ? "Upcoming" : item.status}
            </Text>
          </View>

          {type === "history" && !item.is_reviewed && (
            <TouchableOpacity onPress={() => toggle()}>
              <Text
                style={{
                  textDecorationLine: "underline",
                  fontSize: splitAppTheme.fontSizes.xs,
                  color: splitAppTheme.colors.blue[300],
                  fontFamily: splitAppTheme.fontConfig.Sathoshi[500].normal,
                }}>
                Add Review
              </Text>
            </TouchableOpacity>
          )}

          {type === "upcoming" && (
            <TouchableOpacity>
              <Text
                style={{
                  textDecorationLine: "underline",
                  fontSize: splitAppTheme.fontSizes.xs,
                  color: splitAppTheme.colors.red[300],
                  fontFamily: splitAppTheme.fontConfig.Sathoshi[500].normal,
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default EachBookingItem;
