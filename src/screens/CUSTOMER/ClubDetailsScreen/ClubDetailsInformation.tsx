import dayjs from "dayjs";
import React from "react";
import MapView from "react-native-maps";
import truncate from "lodash.truncate";
import {useTheme} from "styled-components";
import {Clock, MapIcon} from "@constants/iconPath";
import relativeTime from "dayjs/plugin/relativeTime";
import Fontisto from "react-native-vector-icons/Fontisto";
import LinearGradient from "react-native-linear-gradient";
import GenericListEmpty from "@components/GenericListEmpty";
import AntDesign from "react-native-vector-icons/AntDesign";
import {useDimensions} from "@react-native-community/hooks";
import {SafeAreaView} from "react-native-safe-area-context";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import useGetClubDetailsQuery from "@hooks/clubs/useGetClubDetailsQuery";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Dimensions,
  StyleSheet,
  ImageBackground,
  ScrollView as RNScrollView,
} from "react-native";
import {
  Box,
  Text,
  View,
  HStack,
  VStack,
  ScrollView,
  TouchableOpacity,
  Divider,
} from "@components/ui";

dayjs.extend(relativeTime);

const windowDimension = Dimensions.get("window");

const CARD_HEIGHT = 180;
const CARD_NEGATIVE_MARGIN = -1 * (CARD_HEIGHT / 2);

type Props = {
  clubId: number;
  jumpTo: (key: string) => void;
};

const ClubDetailsInformation = ({clubId, jumpTo}: Props) => {
  const theme = useTheme();
  const {
    screen: {width: SCREEN_WIDTH},
  } = useDimensions();
  const imageSliderIndexRef = React.useRef(0);
  const imageSliderRef = React.useRef<RNScrollView>(null!);

  const {
    error: clubDetailsError,
    data: clubDetailsResponse,
    isLoading: isClubDetailsLoading,
  } = useGetClubDetailsQuery(clubId);
  useHandleNonFieldError(clubDetailsError);

  const handlePreviousSlide = () => {
    if (clubDetailsResponse) {
      if (imageSliderIndexRef.current === 0) {
        imageSliderIndexRef.current =
          clubDetailsResponse.club.images.length - 1;
      } else {
        imageSliderIndexRef.current -= 1;
      }

      imageSliderRef?.current?.scrollTo({
        y: 0,
        animated: true,
        x: SCREEN_WIDTH * imageSliderIndexRef.current,
      });
    }
  };

  const handleNextSlide = () => {
    if (clubDetailsResponse) {
      if (
        imageSliderIndexRef.current ===
        clubDetailsResponse.club.images.length - 1
      ) {
        imageSliderIndexRef.current = 0;
      } else {
        imageSliderIndexRef.current += 1;
      }

      imageSliderRef?.current?.scrollTo({
        y: 0,
        animated: true,
        x: SCREEN_WIDTH * imageSliderIndexRef.current,
      });
    }
  };

  // if (isClubDetailsLoading) {
  //   return (
  //     <ScrollView>
  //       <Skeleton height={300} />

  //       <Box mx={"6"}>
  //         <Skeleton
  //           width={"full"}
  //           borderRadius={"xl"}
  //           height={CARD_HEIGHT}
  //           bg={"tomato"}
  //           marginTop={CARD_NEGATIVE_MARGIN}
  //         />

  //         <Skeleton
  //           height={"12"}
  //           my={"5"}
  //           width={"full"}
  //           borderRadius={"lg"}
  //           borderWidth={"2"}
  //           borderColor={"primary.300"}
  //         />

  //         <HStack space={"2"}>
  //           <Box flex={1}>
  //             <Skeleton
  //               height={"12"}
  //               my={"5"}
  //               width={"full"}
  //               borderRadius={"lg"}
  //               bg={"secondary.300"}
  //             />
  //           </Box>

  //           <Box flex={1}>
  //             <Skeleton
  //               height={"12"}
  //               my={"5"}
  //               width={"full"}
  //               borderRadius={"lg"}
  //               bg={"blue.300"}
  //             />
  //           </Box>

  //           <Box flex={1}>
  //             <Skeleton
  //               height={"12"}
  //               my={"5"}
  //               width={"full"}
  //               borderRadius={"lg"}
  //               bg={"secondary.100"}
  //             />
  //           </Box>
  //         </HStack>
  //       </Box>

  //       <Box p={6}>
  //         {new Array(5).fill(1).map((_, i) => (
  //           <Center width={"full"} key={i}>
  //             <HStack width={"full"} height={"32"} space={"5"} borderRadius={"md"}>
  //               <Skeleton
  //                 height={"24"}
  //                 width={"24"}
  //                 borderRadius={"sm"}
  //                 startColor="coolGray.100"
  //               />
  //               <VStack flex={"3"} space={"2.5"}>
  //                 <Skeleton height={"5"} startColor="amber.300" />
  //                 <Skeleton.Text lines={2} />

  //                 <HStack space="2" alignItems="center">
  //                   <Skeleton size={"5"} borderRadius={"full"} />
  //                   <Skeleton height={"3"} flex={"2"} borderRadius={"full"} />
  //                   <Skeleton
  //                     height={"3"}
  //                     flex={"1"}
  //                     borderRadius={"full"}
  //                     startColor={"indigo.300"}
  //                   />
  //                 </HStack>
  //               </VStack>
  //             </HStack>
  //           </Center>
  //         ))}
  //       </Box>
  //     </ScrollView>
  //   );
  // }

  if (!clubDetailsResponse) {
    return (
      <HStack safeArea height={"full"} width={"full"}>
        <Box width={"full"} height={"full"}>
          <GenericListEmpty />
        </Box>
      </HStack>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 20,
      }}>
      <Box position={"relative"}>
        <ScrollView
          horizontal
          pagingEnabled
          ref={imageSliderRef}
          showsHorizontalScrollIndicator={false}>
          {clubDetailsResponse.club.images.map((img, i) => (
            <ImageBackground
              key={i}
              source={{uri: img}}
              style={styles.ImageBackground}
            />
          ))}
        </ScrollView>

        <Box position={"absolute"} width={"full"} top={0} left={0}>
          <SafeAreaView>
            <HStack p={"6"} justifyContent={"space-between"}>
              <TouchableOpacity
                borderRadius={"full"}
                alignItems={"center"}
                justifyContent={"center"}>
                <FontAwesome5 size={22} name={"chevron-left"} color={"white"} />
              </TouchableOpacity>

              <HStack>
                <TouchableOpacity
                  p={2}
                  borderRadius={"full"}
                  alignItems={"center"}
                  bg={"rgba(0,0,0,0.5)"}
                  justifyContent={"center"}>
                  <AntDesign size={22} name={"sharealt"} color={"white"} />
                </TouchableOpacity>

                <TouchableOpacity
                  p={2}
                  ml={4}
                  borderRadius={"full"}
                  alignItems={"center"}
                  bg={"rgba(0,0,0,0.5)"}
                  justifyContent={"center"}>
                  <AntDesign
                    size={22}
                    name={
                      clubDetailsResponse.club.is_favourite ? "heart" : "hearto"
                    }
                    color={"white"}
                  />
                </TouchableOpacity>
              </HStack>
            </HStack>
          </SafeAreaView>
        </Box>

        <Box top={"50%"} mt={-3} position={"absolute"} left={"6"}>
          <TouchableOpacity
            p={2}
            ml={4}
            borderRadius={"full"}
            alignItems={"center"}
            bg={"rgba(0,0,0,0.5)"}
            justifyContent={"center"}
            onPress={handlePreviousSlide}>
            <MaterialCommunityIcons
              size={22}
              name={"arrow-left"}
              color={"white"}
            />
          </TouchableOpacity>
        </Box>

        <Box top={"50%"} mt={-3} position={"absolute"} right={"6"}>
          <TouchableOpacity
            p={2}
            ml={4}
            borderRadius={"full"}
            alignItems={"center"}
            bg={"rgba(0,0,0,0.5)"}
            justifyContent={"center"}
            onPress={handleNextSlide}>
            <MaterialCommunityIcons
              size={22}
              name={"arrow-right"}
              color={"white"}
            />
          </TouchableOpacity>
        </Box>
      </Box>

      <VStack px={"6"} flex={1} bg={"rgba(255,255,255,0.1)"}>
        <View
          p={"4"}
          bg={"white"}
          width={"full"}
          borderRadius={"xl"}
          height={CARD_HEIGHT}
          style={theme.shadows[3]}
          marginTop={CARD_NEGATIVE_MARGIN}>
          <Text
            mb={4}
            fontSize={"xl"}
            color={"#030819"}
            fontFamily={"SatoshiVariable-Bold"}>
            {truncate(clubDetailsResponse.club.name)}
          </Text>

          <HStack my={2}>
            <MapIcon height={20} width={20} color={"#402B8C"} />

            <Text
              ml={4}
              fontSize={"sm"}
              maxWidth={"75%"}
              color={"#030819"}
              fontFamily={"Roboto-Regular"}>
              {truncate(clubDetailsResponse.club.location, {
                length: 70,
              })}
            </Text>
          </HStack>

          <Divider my={"3"} />

          <HStack justifyContent={"space-between"} alignItems={"center"}>
            <HStack alignItems={"center"}>
              <Clock height={20} width={20} />
              <Text
                ml={4}
                fontSize={"sm"}
                color={"#030819"}
                fontFamily={"Satoshi-Regular"}>
                Open {clubDetailsResponse.club.opening_time} -{" "}
                {clubDetailsResponse.club.closing_time}
              </Text>
            </HStack>

            <Box>
              <HStack alignItems={"center"} justifyContent={"center"}>
                <Fontisto name="star" color={"#FFC529"} size={16} />
                <Text ml={1} color={"black"} fontSize={"sm"}>
                  ({clubDetailsResponse.club.avg_rating})
                </Text>
              </HStack>
            </Box>
          </HStack>
        </View>

        <Box>
          <TouchableOpacity
            p={4}
            my={"5"}
            borderRadius={"2xl"}
            borderWidth={"2"}
            variant={"outline"}
            borderColor={"primary.300"}>
            <Text
              fontSize={"xl"}
              textAlign={"center"}
              color={"primary.300"}
              fontFamily={"Satoshi-Medium"}>
              Book a Table
            </Text>
          </TouchableOpacity>
        </Box>

        <VStack>
          <HStack justifyContent={"space-between"}>
            <TouchableOpacity
              style={{flex: 1, width: "100%"}}
              onPress={() => jumpTo("menus")}>
              <LinearGradient
                end={{x: 1, y: 0}}
                start={{x: 0, y: 0}}
                colors={["#472BBE", "#DF3BC0"]}
                style={styles.linearGradientButtons}>
                <Text color={"white"} fontWeight={"medium"}>
                  Offer Menu
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              mx={2}
              style={{flex: 1, width: "100%"}}
              onPress={() => jumpTo("reviews")}>
              <LinearGradient
                end={{x: 0, y: 0}}
                start={{x: 0, y: 1}}
                colors={["#402BBC", "#00C1FF"]}
                style={styles.linearGradientButtons}>
                <Text color={"white"} fontWeight={"medium"}>
                  Reviews
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={{flex: 1, width: "100%"}}
              onPress={() => jumpTo("information")}>
              <LinearGradient
                end={{x: 1, y: 0}}
                start={{x: 0, y: 0}}
                colors={["#201648", "#7359D1"]}
                style={styles.linearGradientButtons}>
                <Text color={"white"} fontWeight={"medium"}>
                  Information
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </HStack>

          <Box my={5}>
            <MapView
              zoomEnabled={false}
              style={styles.mapStyles}
              zoomControlEnabled={false}
              region={{
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                latitude: clubDetailsResponse.club.latitude,
                longitude: clubDetailsResponse.club.longitude,
              }}
            />
          </Box>

          <VStack flexWrap={"wrap"}>
            <HStack
              mb={5}
              width={"full"}
              alignItems={"center"}
              justifyContent={"space-between"}>
              <HStack alignItems={"center"}>
                <Box
                  p={2}
                  borderRadius={"full"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  bg={"rgba(72, 212, 255,0.5)"}>
                  <MaterialIcons
                    size={22}
                    name={"phone"}
                    color={theme.colors.blue[300]}
                  />
                </Box>

                <Text fontSize={"md"} ml={2}>
                  Phone:
                </Text>
              </HStack>

              <Box>
                <Text fontSize={"md"}>{clubDetailsResponse.club.phone}</Text>
              </Box>
            </HStack>

            <HStack
              mb={5}
              width={"full"}
              alignItems={"center"}
              justifyContent={"space-between"}>
              <HStack alignItems={"center"}>
                <Box
                  p={2}
                  borderRadius={"full"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  bg={"rgba(72, 212, 255,0.5)"}>
                  <MaterialIcons
                    size={22}
                    name={"email"}
                    color={theme.colors.blue[300]}
                  />
                </Box>

                <Text fontSize={"md"} ml={2}>
                  Email:
                </Text>
              </HStack>

              <Box>
                <Text fontSize={"md"}>{clubDetailsResponse.club.email}</Text>
              </Box>
            </HStack>

            <HStack
              mb={5}
              width={"full"}
              alignItems={"center"}
              justifyContent={"space-between"}>
              <HStack alignItems={"center"}>
                <Box
                  p={2}
                  borderRadius={"full"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  bg={"rgba(72, 212, 255,0.5)"}>
                  <MaterialIcons
                    size={22}
                    name={"shopping-bag"}
                    color={theme.colors.blue[300]}
                  />
                </Box>

                <Text fontSize={"md"} ml={2}>
                  Cuisines:
                </Text>
              </HStack>

              <Box>
                <Text fontSize={"md"}>{clubDetailsResponse.club.cuisine}</Text>
              </Box>
            </HStack>

            <HStack
              mb={5}
              width={"full"}
              alignItems={"center"}
              justifyContent={"space-between"}>
              <HStack alignItems={"center"}>
                <Box
                  p={2}
                  borderRadius={"full"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  bg={"rgba(72, 212, 255,0.5)"}>
                  <MaterialIcons
                    size={22}
                    name={"shopping-bag"}
                    color={theme.colors.blue[300]}
                  />
                </Box>

                <Text fontSize={"md"} ml={2}>
                  Average Cost:
                </Text>
              </HStack>

              <Box>
                <Text
                  fontSize={"md"}
                  color={"blue.300"}
                  fontFamily={"SatoshiVariable-Bold"}>
                  ${clubDetailsResponse.club.min_avg_cost}-$
                  {clubDetailsResponse.club.max_avg_cost}
                </Text>
              </Box>
            </HStack>
          </VStack>

          <Box>
            <Text fontSize={"md"}>{clubDetailsResponse.club.about}</Text>
          </Box>
        </VStack>
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mapStyles: {
    height: 200,
    borderRadius: 20,
  },
  bookButton: {
    width: "100%",
    borderWidth: 3,
    borderRadius: 8,
    marginVertical: 15,
    alignItems: "center",
    borderColor: "#FF3FCB",
    justifyContent: "center",
  },
  ImageBackground: {
    height: 300,
    width: windowDimension.width * 1,
  },
  linearGradientButtons: {
    flex: 1,
    padding: 10,
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ClubDetailsInformation;
