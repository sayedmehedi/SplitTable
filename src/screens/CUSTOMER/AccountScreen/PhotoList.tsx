import React from "react";
import {UserImage} from "@src/models";
import {splitAppTheme} from "@src/theme";
import useAppToast from "@hooks/useAppToast";
import {QueryKeys} from "@constants/query-keys";
import {useDisclosure} from "react-use-disclosure";
import {useQueryClient} from "@tanstack/react-query";
import AntDesign from "react-native-vector-icons/AntDesign";
import {isResponseResultError} from "@utils/error-handling";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import useDeleteUserPhotoMutation from "@hooks/user/useDeleteUserPhotoMutation";
import useInfiniteGetUserPhotosQuery from "@hooks/user/useInfiniteGetUserPhotosQuery";
import useToggleUserPhotoLikeMutation from "@hooks/user/useToggleUserPhotoLikeMutation";
import {
  View,
  Text,
  Modal,
  Image,
  FlatList,
  Pressable,
  Dimensions,
  ListRenderItem,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";
import FastImage from "react-native-fast-image";

const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;

function EachUserImage({
  item,
  index,
  onPress,
}: {
  item: UserImage;
  onPress: () => void;
  index: number;
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      style={{
        marginLeft: index % 3 === 1 ? splitAppTheme.space["3"] : 0,
        marginRight: index % 3 === 1 ? splitAppTheme.space["3"] : 0,
      }}>
      <FastImage
        source={{uri: item.image}}
        style={{
          height: 100,
          borderRadius: splitAppTheme.radii.lg,
          width:
            WINDOW_WIDTH * 0.3 -
            splitAppTheme.space["6"] * 0.3 -
            splitAppTheme.space["3"] * 0.3,
        }}
      />
    </TouchableOpacity>
  );
}

export default function PhotoList({
  isMine = false,
  userId,
}: {
  isMine?: boolean;
  userId: number;
}) {
  const toast = useAppToast();
  const queryClient = useQueryClient();
  const {isOpen, toggle} = useDisclosure();
  const galleryListRef = React.useRef<FlatList>(null!);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

  const {
    error: toggleError,
    mutate: toggleLike,
    isLoading: isToggling,
  } = useToggleUserPhotoLikeMutation({
    onSuccess(data) {
      if (isResponseResultError(data)) {
        toast.error(data.error);
        return;
      }

      toast.success(data.success);
      queryClient.invalidateQueries([QueryKeys.IMAGE]);
    },
  });
  useHandleNonFieldError(toggleError);

  const {
    mutate: deleteUserPhoto,
    error: deleteUserPhotoError,
    isLoading: isDeletingUserPhoto,
  } = useDeleteUserPhotoMutation({
    onSuccess(data) {
      if (isResponseResultError(data)) {
        toast.error(data.error);
        return;
      }

      toggle();
      toast.success(data.success);
      queryClient.invalidateQueries([QueryKeys.IMAGE]);
    },
  });
  useHandleNonFieldError(deleteUserPhotoError);

  React.useEffect(() => {
    if (isOpen) {
      galleryListRef?.current?.scrollToOffset({
        offset: WINDOW_WIDTH * selectedImageIndex,
      });
    }
  }, [isOpen, selectedImageIndex]);

  const {
    fetchNextPage,
    isFetchingNextPage,
    error: infiniteGetResourcesError,
    data: infiniteGetResourcesResponse,
    isLoading: isLoadingInfiniteResources,
  } = useInfiniteGetUserPhotosQuery(
    {
      userId,
    },
    {
      getNextPageParam(lastPage) {
        if (lastPage.images.has_more_data) {
          return {
            page: lastPage.images.current_page + 1,
          };
        }
      },
    },
  );
  useHandleNonFieldError(infiniteGetResourcesError);

  const resourceListData = React.useMemo(() => {
    return (
      infiniteGetResourcesResponse?.pages.flatMap(eachPage => {
        return eachPage.images.data;
      }) ?? []
    );
  }, [infiniteGetResourcesResponse?.pages]);

  const handleFetchNextPage = React.useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const renderImage: ListRenderItem<UserImage> = React.useCallback(
    ({item, index}) => (
      <EachUserImage
        onPress={() => {
          setSelectedImageIndex(index);
          toggle();
        }}
        item={item}
        index={index}
      />
    ),
    [toggle],
  );

  const renderGalleryImage: ListRenderItem<UserImage> = React.useCallback(
    ({item}) => {
      return (
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginVertical: splitAppTheme.space[6],
            }}>
            {!isMine ? (
              <React.Fragment>
                <TouchableOpacity
                  disabled={isToggling}
                  onPress={() => {
                    const imageId = item.id;

                    toggleLike({
                      imageId,
                      like: true,
                    });
                  }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}>
                    {isToggling ? (
                      <ActivityIndicator size={"small"} />
                    ) : (
                      <AntDesign
                        size={22}
                        name={"like2"}
                        color={splitAppTheme.colors.green[600]}
                      />
                    )}

                    <Text
                      style={{
                        marginLeft: splitAppTheme.space[2],
                        color: splitAppTheme.colors.green[600],
                        fontSize: splitAppTheme.fontSizes["xl"],
                        fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
                      }}>
                      {item.total_likes}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={isToggling}
                  style={{marginLeft: splitAppTheme.space[6]}}
                  onPress={() => {
                    const imageId = item.id;

                    toggleLike({
                      imageId,
                      like: false,
                    });
                  }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}>
                    {isToggling ? (
                      <ActivityIndicator size={"small"} />
                    ) : (
                      <AntDesign
                        size={22}
                        name={"dislike2"}
                        color={splitAppTheme.colors.red[600]}
                      />
                    )}

                    <Text
                      style={{
                        marginLeft: splitAppTheme.space[2],
                        color: splitAppTheme.colors.red[600],
                        fontSize: splitAppTheme.fontSizes["xl"],
                        fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
                      }}>
                      {item.total_dislikes}
                    </Text>
                  </View>
                </TouchableOpacity>
              </React.Fragment>
            ) : (
              <TouchableOpacity
                disabled={isDeletingUserPhoto}
                style={{marginLeft: splitAppTheme.space[6]}}
                onPress={() => {
                  const imageId = item.id;

                  deleteUserPhoto({
                    imageId,
                  });
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                  {isDeletingUserPhoto ? (
                    <ActivityIndicator size={"small"} />
                  ) : (
                    <FontAwesome5Icon
                      size={22}
                      name={"trash"}
                      color={splitAppTheme.colors.red[600]}
                    />
                  )}
                </View>
              </TouchableOpacity>
            )}
          </View>

          <FastImage
            source={{uri: item.image}}
            style={{
              width: WINDOW_WIDTH,
              height: WINDOW_HEIGHT * 0.5,
            }}
          />
        </View>
      );
    },
    [toggleLike, deleteUserPhoto, isDeletingUserPhoto, isToggling, isMine],
  );

  if (isLoadingInfiniteResources) {
    return (
      <View
        style={{
          flex: 1,
          width: WINDOW_WIDTH,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <ActivityIndicator size={"small"} />
      </View>
    );
  }

  return (
    <View
      style={{
        paddingHorizontal: splitAppTheme.space["6"],
      }}>
      {isFetchingNextPage ? (
        <View>
          <ActivityIndicator size={"small"} />
        </View>
      ) : null}

      <FlatList
        numColumns={3}
        key={"user-photos"}
        listKey={"user-photos"}
        data={resourceListData}
        renderItem={renderImage}
        onEndReached={handleFetchNextPage}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: splitAppTheme.space["3"],
            }}
          />
        )}
        ListEmptyComponent={
          <View style={{alignItems: "center", justifyContent: "center"}}>
            <Text>No Data</Text>
          </View>
        }
      />

      <Modal transparent visible={isOpen} onRequestClose={() => toggle()}>
        <View
          style={{
            flexWrap: "wrap",
            alignItems: "center",
            flexDirection: "row",
            height: WINDOW_HEIGHT,
            backgroundColor: "rgba(0,0,0,0.7)",
          }}>
          <View style={{width: "100%"}}>
            <Pressable
              onPress={() => toggle()}
              style={{
                marginLeft: "auto",
                marginTop: splitAppTheme.space[6],
                marginRight: splitAppTheme.space[6],
              }}>
              <AntDesign name={"close"} size={33} color={"white"} />
            </Pressable>
          </View>

          <View>
            <View style={{height: 420}}>
              <FlatList<typeof resourceListData[0]>
                horizontal
                pagingEnabled
                ref={galleryListRef}
                listKey="image-gallery"
                data={resourceListData}
                renderItem={renderGalleryImage}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        </View>
        <Toast />
      </Modal>
    </View>
  );
}
