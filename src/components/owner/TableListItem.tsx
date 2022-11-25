import React from "react";
import {TTableItem} from "./shared";
import truncate from "lodash.truncate";
import {View, Text, Pressable, StyleSheet, ImageBackground} from "react-native";
import dayjs from "dayjs";
import {splitAppTheme} from "@src/theme";
import useAppToast from "@hooks/useAppToast";
import {QueryKeys} from "@constants/query-keys";
import {Clock, MapIcon} from "@constants/iconPath";
import {useQueryClient} from "@tanstack/react-query";
import {isResponseResultError} from "@utils/error-handling";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import useToggleFavoriteClubMutation from "@hooks/clubs/useToggleFavoriteClubMutation";
import FastImage from "react-native-fast-image";

type Props = {
  item: TTableItem;
  onPress: (item: TTableItem) => void;
};

const TableListItem = ({item, onPress}: Props) => {
  const toast = useAppToast();
  const queryClient = useQueryClient();
  const handlePress = React.useCallback(() => {
    onPress(item);
  }, [onPress, item]);

  const {
    mutate: toggleFavoriteClub,
    error: toggleFavoriteError,
    isLoading: isTogglingFavorite,
    data: toggleFavoriteClubResponse,
  } = useToggleFavoriteClubMutation();

  useHandleNonFieldError(toggleFavoriteError);
  useHandleResponseResultError(toggleFavoriteClubResponse);

  const handleToggleFavorite = React.useCallback(() => {
    toggleFavoriteClub(
      {clubId: item.id},
      {
        onSuccess(data) {
          if (!isResponseResultError(data)) {
            toast.success(data.message);
            queryClient.invalidateQueries([QueryKeys.TABLE, "LIST"]);
          }
        },
      },
    );
  }, [toggleFavoriteClub]);

  return (
    <Pressable
      style={{
        marginBottom: splitAppTheme.space[5],
      }}
      onPress={handlePress}>
      <View
        style={[
          splitAppTheme.shadows[3],
          {
            flex: 1,
            height: splitAppTheme.sizes[64],
            width: splitAppTheme.sizes.full,
            borderRadius: splitAppTheme.radii.lg,
            backgroundColor: splitAppTheme.colors.white,
          },
        ]}>
        <View style={{flex: 2}}>
          <FastImage
            source={{uri: item.image}}
            style={[styles.ImageBackground, styles.ImageBackgroundImg]}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: splitAppTheme.space[2],
              }}></View>
          </FastImage>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "space-around",
            padding: splitAppTheme.space[3],
          }}>
          <Text
            style={{
              color: "#262B2E",
              fontSize: splitAppTheme.fontSizes.lg,
              fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
            }}>
            {truncate(item.name)}
          </Text>
          <View
            style={{height: 1, backgroundColor: splitAppTheme.colors.gray[300]}}
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
              <MapIcon height={10} width={10} color={"#402B8C"} />
              <Text
                style={{
                  color: "#8A8D9F",
                  marginLeft: splitAppTheme.space[1],
                  fontSize: splitAppTheme.fontSizes.sm,
                  fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
                }}>
                {truncate(item.location, {
                  length: 15,
                })}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: splitAppTheme.space[2],
              }}>
              <Clock height={10} width={10} color={"#402B8C"} />
              <Text
                style={{
                  color: "#8A8D9F",
                  marginLeft: splitAppTheme.space[1],
                  fontSize: splitAppTheme.fontSizes.sm,
                  fontFamily: splitAppTheme.fontConfig.Sathoshi[500].normal,
                }}>
                {dayjs(item.date, "YYYY-MM-DD HH:mm:ss").format(
                  "DD MMM, hh:mm A",
                )}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  ImageBackground: {
    height: "100%",
    width: "100%",
  },
  ImageBackgroundImg: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

export default TableListItem;
