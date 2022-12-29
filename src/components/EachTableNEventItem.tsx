import React from "react";
import dayjs from "dayjs";
import truncate from "lodash.truncate";
import {splitAppTheme} from "@src/theme";
import FastImage from "react-native-fast-image";
import {BookedTable, SplitTable} from "@src/models";
import {Text, View, Pressable, StyleSheet} from "react-native";
import {RedMap, MapIcon, Clock, JoinCountIcon} from "@constants/iconPath";

type Props = {
  item: BookedTable | SplitTable;
  onPress: (club: BookedTable | SplitTable) => void;
};

function isSplitTable(club: BookedTable | SplitTable): club is SplitTable {
  return "total_joined" in club;
}

const EachTableNEventItem = ({item, onPress}: Props) => {
  const handlePress = React.useCallback(() => {
    onPress(item);
  }, [onPress, item]);

  return (
    <Pressable
      style={{
        flex: 1,
        minHeight: 200,
        backgroundColor: "white",
        ...splitAppTheme.shadows[3],
        borderRadius: splitAppTheme.radii.lg,
      }}
      onPress={handlePress}>
      <View
        style={{
          flex: 3,
        }}>
        <FastImage
          style={{
            width: splitAppTheme.sizes.full,
            height: splitAppTheme.sizes.full,
            borderTopLeftRadius: splitAppTheme.radii["2xl"],
            borderTopRightRadius: splitAppTheme.radii["2xl"],
          }}
          source={{uri: item.image}}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: splitAppTheme.space[2],
            }}>
            {/* <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: splitAppTheme.space[1],
              }}>
              <Text style={{color: splitAppTheme.colors.black}}>
                {item.avg_rating}
              </Text>
              <Fontisto name="star" color={"#FFC529"} size={16} />
              <Text style={{color: splitAppTheme.colors.black}}>
                ({item.total_reviews})
              </Text>
            </View> */}

            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
              }}>
              {/* {isTogglingFavorite ? (
                <View style={{padding: splitAppTheme.space[3]}}>
                  <ActivityIndicator color={"white"} size={"small"} />
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    width: 50,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: splitAppTheme.radii.full,
                  }}
                  onPress={handleToggleFavorite}>
                  <AntDesign
                    size={22}
                    color={"white"}
                    name={item.is_favourite ? "heart" : "hearto"}
                  />
                </TouchableOpacity>
              )} */}

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: splitAppTheme.space[1],
                  borderRadius: splitAppTheme.radii.full,
                  backgroundColor: splitAppTheme.colors.white,
                }}>
                <RedMap height={16} width={16} />
                <Text
                  style={{
                    color: splitAppTheme.colors.black,
                  }}>
                  {item.distance}
                </Text>
              </View>
            </View>
          </View>
        </FastImage>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          paddingHorizontal: splitAppTheme.space[2],
        }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <Text
            style={{
              color: "#262B2E",
              fontSize: splitAppTheme.fontSizes.lg,
              fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
            }}>
            {truncate(item.name)}
          </Text>

          {isSplitTable(item) && (
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
              }}>
              <View>
                <JoinCountIcon height={15} width={15} />
              </View>

              <View
                style={{
                  marginLeft: splitAppTheme.space[1],
                }}>
                <Text
                  style={{
                    fontFamily: splitAppTheme.fontConfig.Roboto[700].normal,
                  }}>
                  {item.total_joined}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
            }}>
            <Clock height={12} width={12} color={"#402B8C"} />

            <Text
              style={{
                marginLeft: splitAppTheme.space[2],
              }}>
              {dayjs(item.date, "YYYY-MM-DD HH:mm:ss").format(
                "DD MMM, hh:mm A",
              )}
            </Text>
          </View>

          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
            }}>
            <MapIcon height={12} width={12} color={"#402B8C"} />

            <View
              style={{
                marginLeft: splitAppTheme.space[2],
              }}>
              <Text
                style={{
                  color: "#8A8D9F",
                  marginRight: splitAppTheme.space[1],
                  fontSize: splitAppTheme.fontSizes.sm,
                  fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
                }}>
                {truncate(item.location)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FDF2EE",
    padding: splitAppTheme.space[1],
    marginRight: splitAppTheme.space[2],
    marginBottom: splitAppTheme.space[2],
  },
});

export default EachTableNEventItem;
