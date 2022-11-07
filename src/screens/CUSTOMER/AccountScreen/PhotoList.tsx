import React from "react";
import {UserImage} from "@src/models";
import {splitAppTheme} from "@src/theme";
import GenericListEmpty from "@components/GenericListEmpty";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  ListRenderItem,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import useInfiniteGetUserPhotosQuery from "@hooks/user/useInfiniteGetUserPhotosQuery";
import {useDisclosure} from "react-use-disclosure";
import AntDesign from "react-native-vector-icons/AntDesign";

const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;

const keyExtractor = (item: {id: number}) =>
  `user-photos-${item.id.toString()}`;

export default function PhotoList() {
  const {isOpen, toggle} = useDisclosure();
  const galleryListRef = React.useRef<FlatList>(null!);

  const {
    fetchNextPage,
    isFetchingNextPage,
    error: infiniteGetResourcesError,
    data: infiniteGetResourcesResponse,
    isLoading: isLoadingInfiniteResources,
  } = useInfiniteGetUserPhotosQuery(
    {},
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
      <TouchableOpacity
        onPress={() => {
          galleryListRef?.current?.scrollToOffset({
            offset: WINDOW_WIDTH * index,
          });
          toggle();
        }}
        style={{
          marginLeft: index % 3 === 1 ? splitAppTheme.space["3"] : 0,
          marginRight: index % 3 === 1 ? splitAppTheme.space["3"] : 0,
        }}>
        <Image
          source={{uri: item.image}}
          style={{
            height: 100,
            width:
              WINDOW_WIDTH * 0.3 -
              splitAppTheme.space["6"] * 0.3 -
              splitAppTheme.space["3"] * 0.3,
          }}
        />
      </TouchableOpacity>
    ),
    [],
  );

  if (isLoadingInfiniteResources) {
    return <Text>Loading..</Text>;
    // return (
    //   <ScrollView>
    //     <Box p={6}>
    //       {new Array(5).fill(1).map((_, i) => (
    //         <Box width={"full"} key={i}>
    //           <HStack width={"full"} height={"32"} space={"5"} borderRadius={"md"}>
    //             <Skeleton
    //               height={"24"}
    //               width={"24"}
    //               borderRadius={"sm"}
    //               startColor="coolGray.100"
    //             />
    //             <VStack flex={"3"} space={"2.5"}>
    //               <Skeleton height={"5"} startColor="amber.300" />
    //               <Skeleton.Text lines={2} />

    //               <HStack space="2" alignItems="center">
    //                 <Skeleton size={"5"} borderRadius={"full"} />
    //                 <Skeleton height={"3"} flex={"2"} borderRadius={"full"} />
    //                 <Skeleton
    //                   height={"3"}
    //                   flex={"1"}
    //                   borderRadius={"full"}
    //                   startColor={"indigo.300"}
    //                 />
    //               </HStack>
    //             </VStack>
    //           </HStack>
    //         </Box>
    //       ))}
    //     </Box>
    //   </ScrollView>
    // );
  }

  return (
    <View style={{width: WINDOW_WIDTH}}>
      <FlatList
        numColumns={3}
        key={"user-photos"}
        listKey={"user-photos"}
        data={resourceListData}
        renderItem={renderImage}
        keyExtractor={keyExtractor}
        onEndReached={handleFetchNextPage}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: splitAppTheme.space["3"],
            }}
          />
        )}
        contentContainerStyle={{
          paddingHorizontal: splitAppTheme.space["6"],
        }}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View>
              <ActivityIndicator size={"small"} />
            </View>
          ) : resourceListData.length === 0 ? (
            <GenericListEmpty />
          ) : null
        }
      />

      <Modal transparent visible={isOpen} onRequestClose={toggle}>
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
              onPress={toggle}
              style={{
                marginLeft: "auto",
                marginTop: splitAppTheme.space[6],
                marginRight: splitAppTheme.space[6],
              }}>
              <AntDesign name={"close"} size={33} color={"white"} />
            </Pressable>
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginVertical: splitAppTheme.space[6],
              }}>
              <TouchableOpacity>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  <AntDesign
                    size={22}
                    name={"like2"}
                    color={splitAppTheme.colors.green[600]}
                  />

                  <Text
                    style={{
                      marginLeft: splitAppTheme.space[2],
                      color: splitAppTheme.colors.green[600],
                      fontSize: splitAppTheme.fontSizes["xl"],
                      fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
                    }}>
                    33
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={{marginLeft: splitAppTheme.space[6]}}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  <AntDesign
                    size={22}
                    name={"dislike2"}
                    color={splitAppTheme.colors.red[600]}
                  />

                  <Text
                    style={{
                      marginLeft: splitAppTheme.space[2],
                      color: splitAppTheme.colors.red[600],
                      fontSize: splitAppTheme.fontSizes["xl"],
                      fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
                    }}>
                    33
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{height: 420}}>
              <FlatList
                horizontal
                pagingEnabled
                ref={galleryListRef}
                listKey="image-gallery"
                data={resourceListData}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => {
                  return (
                    <Image
                      source={{uri: item.image}}
                      style={{
                        width: WINDOW_WIDTH,
                        height: WINDOW_HEIGHT * 0.5,
                      }}
                    />
                  );
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
