import React from "react";
import {splitAppTheme} from "@src/theme";
import useAppToast from "@hooks/useAppToast";
import AddSliderPhotoBtn from "./AddSliderPhotoBtn";
import {isResponseResultError} from "@utils/error-handling";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {
  View,
  Text,
  Modal,
  Image,
  FlatList,
  Pressable,
  Dimensions,
  ListRenderItem,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import FastImage from "react-native-fast-image";
import useGetOwnerClubInfoQuery from "@hooks/clubs/useGetOwnerClubInfoQuery";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";
import GenericListEmpty from "@components/GenericListEmpty";
import useDeleteClubSliderPhotoMutation from "@hooks/clubs/useDeleteClubSliderPhotoMutation";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";

const WINDOW_WIDTH = Dimensions.get("window").width;

const keyExtractor = (item: {id: number}) =>
  `club-photos-${item.id.toString()}`;

function EachClubImage({
  item,
  index,
  clubId,
}: {
  item: string;
  index: number;
  clubId: number;
}) {
  const toast = useAppToast();
  const {
    error: deleteError,
    data: deleteResponse,
    mutate: deleteSliderImage,
    isLoading: isDeletingSliderImage,
  } = useDeleteClubSliderPhotoMutation({
    onSuccess(data) {
      if (!isResponseResultError(data)) {
        toast.success(data.success);
      }
    },
  });
  useHandleNonFieldError(deleteError);
  useHandleResponseResultError(deleteResponse);

  return (
    <TouchableOpacity
      onLongPress={() => {
        Alert.alert("Remove", "Are your sure?", [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Sure",
            style: "destructive",
            onPress() {
              deleteSliderImage({clubId, file: item});
            },
          },
        ]);
      }}
      disabled={isDeletingSliderImage}
      style={{
        marginLeft: index % 3 === 1 ? splitAppTheme.space["3"] : 0,
        marginRight: index % 3 === 1 ? splitAppTheme.space["3"] : 0,
      }}>
      <View style={{position: "relative"}}>
        <FastImage
          source={{uri: item}}
          style={{
            height: 100,
            width:
              WINDOW_WIDTH * 0.3 -
              splitAppTheme.space["6"] * 0.3 -
              splitAppTheme.space["3"] * 0.3,
          }}
        />

        {isDeletingSliderImage ? (
          <View
            style={{
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              width: splitAppTheme.sizes.full,
              height: splitAppTheme.sizes.full,
              backgroundColor: "rgba(0,0,0,0.3)",
            }}>
            <ActivityIndicator size={"small"} />
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

export default function ClubSliderImagesScreen() {
  const {
    refetch,
    isRefetching,
    error: clubInfoError,
    data: clubInfoResponse,
    isLoading: isLoadingInfiniteResources,
  } = useGetOwnerClubInfoQuery();
  useHandleNonFieldError(clubInfoError);

  const renderImage: ListRenderItem<string> = React.useCallback(
    ({item, index}) =>
      clubInfoResponse?.id === undefined ? null : (
        <EachClubImage item={item} index={index} clubId={clubInfoResponse.id} />
      ),
    [clubInfoResponse?.id],
  );

  if (isLoadingInfiniteResources) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <ActivityIndicator size={"small"} />
      </View>
    );
  }

  if (!clubInfoResponse) {
    return <Text>No Data</Text>;
  }

  return (
    <View style={{width: WINDOW_WIDTH, position: "relative", flex: 1}}>
      <FocusAwareStatusBar
        barStyle={"dark-content"}
        backgroundColor={splitAppTheme.colors.white}
      />

      <FlatList
        onRefresh={() => {
          refetch();
        }}
        refreshing={isRefetching}
        numColumns={3}
        key={"user-photos"}
        listKey={"user-photos"}
        renderItem={renderImage}
        data={clubInfoResponse.slider_images}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: splitAppTheme.space["3"],
            }}
          />
        )}
        contentContainerStyle={{
          padding: splitAppTheme.space["6"],
          paddingBottom: splitAppTheme.space[16],
        }}
        ListEmptyComponent={<GenericListEmpty height={300} width={300} />}
      />

      <AddSliderPhotoBtn />
    </View>
  );
}
