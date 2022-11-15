import React from "react";
import {splitAppTheme} from "@src/theme";
import useAppToast from "@hooks/useAppToast";
import AddSliderPhotoBtn from "./AddSliderPhotoBtn";
import {useDisclosure} from "react-use-disclosure";
import {useQueryClient} from "@tanstack/react-query";
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
} from "react-native";
import useGetOwnerClubInfoQuery from "@hooks/clubs/useGetOwnerClubInfoQuery";

const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;

const keyExtractor = (item: {id: number}) =>
  `club-photos-${item.id.toString()}`;

function EachClubImage({
  item,
  onPress,
  index,
}: {
  item: string;
  index: number;
  onPress: () => void;
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
      <Image
        source={{uri: item}}
        style={{
          height: 100,
          width:
            WINDOW_WIDTH * 0.3 -
            splitAppTheme.space["6"] * 0.3 -
            splitAppTheme.space["3"] * 0.3,
        }}
      />
    </TouchableOpacity>
  );
}

export default function ClubSliderImagesScreen() {
  const {isOpen, toggle} = useDisclosure();
  const galleryListRef = React.useRef<FlatList>(null!);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

  React.useEffect(() => {
    if (isOpen) {
      galleryListRef?.current?.scrollToOffset({
        offset: WINDOW_WIDTH * selectedImageIndex,
      });
    }
  }, [isOpen, selectedImageIndex]);

  const {
    error: clubInfoError,
    data: clubInfoResponse,
    isLoading: isLoadingInfiniteResources,
  } = useGetOwnerClubInfoQuery();
  useHandleNonFieldError(clubInfoError);

  const renderImage: ListRenderItem<string> = React.useCallback(
    ({item, index}) => (
      <EachClubImage
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

  if (isLoadingInfiniteResources) {
    return (
      <View style={{width: WINDOW_WIDTH}}>
        <Text>Loading..</Text>
      </View>
    );
  }

  if (!clubInfoResponse) {
    return <Text>No Data</Text>;
  }

  return (
    <View style={{width: WINDOW_WIDTH, position: "relative"}}>
      <FlatList
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
          paddingHorizontal: splitAppTheme.space["6"],
        }}
      />

      <AddSliderPhotoBtn />
    </View>
  );
}
