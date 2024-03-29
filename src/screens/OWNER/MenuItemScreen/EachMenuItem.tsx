import React from "react";
import {splitAppTheme} from "@src/theme";
import useAppToast from "@hooks/useAppToast";
import {DeleteIcon} from "@constants/iconPath";
import {ClubMenuItemOwnerSide} from "@src/models";
import {isResponseResultError} from "@utils/error-handling";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import {GestureHandlerRootView, Swipeable} from "react-native-gesture-handler";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import useDeleteOwnerClubMenuMutation from "@hooks/clubs/useDeleteOwnerClubMenuMutation";
import useUpdateOwnerClubMenuMutation from "@hooks/clubs/useUpdateOwnerClubMenuMutation";
import FastImage from "react-native-fast-image";

type Props = {
  item: ClubMenuItemOwnerSide;
  onPress: (menu: ClubMenuItemOwnerSide) => void;
  index: number;
};

const EachMenuItem = ({item, onPress, index}: Props) => {
  const toast = useAppToast();
  const [isActive, setActive] = React.useState(false);

  React.useEffect(() => {
    setActive(item.status === 1);
  }, [item.status]);

  const {
    mutate: deleteClubMenu,
    error: deleteClubMenuError,
    isLoading: isDeleting,
    data: deleteClubMenuResponse,
  } = useDeleteOwnerClubMenuMutation({
    onSuccess(data) {
      if (!isResponseResultError(data)) {
        toast.success(data.success);
      }
    },
  });
  useHandleNonFieldError(deleteClubMenuError);
  useHandleResponseResultError(deleteClubMenuResponse);

  const {
    error: updateError,
    isLoading: isUpdating,
    mutate: updateClubMenu,
    data: updateResponse,
  } = useUpdateOwnerClubMenuMutation({
    onSuccess(data) {
      if (!isResponseResultError(data)) {
        toast.success(data.success);
      }
    },
  });
  useHandleNonFieldError(updateError);
  useHandleResponseResultError(updateResponse);

  const handleDelete = React.useCallback(() => {
    Alert.alert("Remove", "Are your sure?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sure",
        style: "destructive",
        onPress() {
          deleteClubMenu({menuId: item.id});
        },
      },
    ]);
  }, [deleteClubMenu]);

  const rightSwipeActions = () => {
    return isDeleting ? (
      <View style={{padding: splitAppTheme.space[3]}}>
        <ActivityIndicator color={"white"} size={"small"} />
      </View>
    ) : (
      <TouchableOpacity
        onPress={handleDelete}
        style={{
          marginLeft: 20,
          justifyContent: "center",
        }}>
        <DeleteIcon />
      </TouchableOpacity>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        friction={2}
        containerStyle={{
          paddingBottom: splitAppTheme.space[4],
          paddingHorizontal: splitAppTheme.space[6],
          paddingTop: index === 0 ? splitAppTheme.space[4] : 0,
        }}
        renderRightActions={rightSwipeActions}>
        <View
          style={[
            {
              shadowColor: splitAppTheme.colors.black,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.12,
              shadowRadius: 3.22,
              elevation: 3,
              backgroundColor: splitAppTheme.colors.white,
            },
          ]}>
          <TouchableOpacity onPress={() => onPress(item)}>
            <View
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  height: splitAppTheme.sizes[24],
                  backgroundColor: splitAppTheme.colors.white,
                },
              ]}>
              <View
                style={{
                  width: splitAppTheme.sizes["1/4"],
                  height: splitAppTheme.sizes["full"],
                }}>
                <FastImage
                  style={{
                    width: splitAppTheme.sizes["full"],
                    height: splitAppTheme.sizes["full"],
                    borderRadius: splitAppTheme.radii.lg,
                  }}
                  source={{uri: item.image}}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  marginLeft: splitAppTheme.space[4],
                }}>
                <Text
                  style={{
                    color: "#262B2E",
                    fontSize: splitAppTheme.fontSizes.lg,
                    fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
                  }}>
                  {item.name}
                </Text>

                <View
                  style={{
                    maxWidth: "80%",
                  }}>
                  <Text
                    style={{
                      color: splitAppTheme.colors.blue[300],
                      fontSize: splitAppTheme.fontSizes.sm,
                      paddingBottom: splitAppTheme.space["1.5"],
                      fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                    }}>
                    Price: ${item.price}
                  </Text>

                  <Text
                    style={{
                      color: "#8A8D9F",
                      fontSize: splitAppTheme.fontSizes.sm,
                      fontFamily: splitAppTheme.fontConfig.Sathoshi[400].normal,
                    }}>
                    Stock: {item.qty}
                  </Text>
                </View>
              </View>

              <View style={{paddingRight: splitAppTheme.space[5]}}>
                <Switch
                  disabled={isUpdating}
                  value={isActive}
                  onValueChange={value => {
                    setActive(value);
                    updateClubMenu({
                      menuId: item.id,
                      status: value ? 1 : 0,
                    });
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default EachMenuItem;
