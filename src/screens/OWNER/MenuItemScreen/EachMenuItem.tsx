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
} from "react-native";
import useDeleteOwnerClubMenuMutation from "@hooks/clubs/useDeleteOwnerClubMenuMutation";
import useUpdateOwnerClubMenuMutation from "@hooks/clubs/useUpdateOwnerClubMenuMutation";

type Props = {
  item: ClubMenuItemOwnerSide;
  onPress: (menu: ClubMenuItemOwnerSide) => void;
};

const EachMenuItem = ({item, onPress}: Props) => {
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
  } = useDeleteOwnerClubMenuMutation();
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
    deleteClubMenu(
      {menuId: item.id},
      {
        onSuccess(data) {
          if (!isResponseResultError(data)) {
            toast.success(data.success);
          }
        },
      },
    );
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
      <Swipeable friction={2} renderRightActions={rightSwipeActions}>
        <TouchableOpacity onPress={() => onPress(item)}>
          <View
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                height: splitAppTheme.sizes[32],
                backgroundColor: splitAppTheme.colors.white,
              },
            ]}>
            <View
              style={{
                width: splitAppTheme.sizes["1/4"],
                height: splitAppTheme.sizes["full"],
              }}>
              <Image
                style={{
                  width: splitAppTheme.sizes["full"],
                  height: splitAppTheme.sizes["full"],
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

            <View>
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
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default EachMenuItem;
