import dayjs from "dayjs";
import React from "react";
import MapView from "react-native-maps";
import truncate from "lodash.truncate";
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
  TouchableOpacity,
  ScrollView as RNScrollView,
} from "react-native";
import {
  Box,
  Text,
  View,
  Icon,
  HStack,
  Divider,
  VStack,
  Button,
  Center,
  Skeleton,
  StatusBar,
  IconButton,
  ScrollView,
} from "native-base";

dayjs.extend(relativeTime);

const windowDimension = Dimensions.get("window");

const CARD_HEIGHT = 180;
const CARD_NEGATIVE_MARGIN = -1 * (CARD_HEIGHT / 2);

type Props = {
  clubId: number;
  jumpTo: (key: string) => void;
};

const ClubDetailsInformation = ({clubId, jumpTo}: Props) => {
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

  if (isClubDetailsLoading) {
    return (
      <ScrollView>
        <Skeleton height={300} />

        <Box mx={"6"}>
          <Skeleton
            w={"full"}
            rounded={"xl"}
            h={CARD_HEIGHT}
            bg={"tomato"}
            marginTop={CARD_NEGATIVE_MARGIN}
          />

          <Skeleton
            h={"12"}
            my={"5"}
            w={"full"}
            rounded={"lg"}
            borderWidth={"2"}
            borderColor={"primary.300"}
          />

          <HStack space={"2"}>
            <Box flex={1}>
              <Skeleton
                h={"12"}
                my={"5"}
                w={"full"}
                rounded={"lg"}
                bg={"secondary.300"}
              />
            </Box>

            <Box flex={1}>
              <Skeleton
                h={"12"}
                my={"5"}
                w={"full"}
                rounded={"lg"}
                bg={"blue.300"}
              />
            </Box>

            <Box flex={1}>
              <Skeleton
                h={"12"}
                my={"5"}
                w={"full"}
                rounded={"lg"}
                bg={"secondary.100"}
              />
            </Box>
          </HStack>
        </Box>

        <Box p={6}>
          {new Array(5).fill(1).map((_, i) => (
            <Center w={"full"} key={i}>
              <HStack w={"full"} h={"32"} space={"5"} rounded={"md"}>
                <Skeleton
                  h={"24"}
                  w={"24"}
                  rounded={"sm"}
                  startColor="coolGray.100"
                />
                <VStack flex={"3"} space={"2.5"}>
                  <Skeleton h={"5"} startColor="amber.300" />
                  <Skeleton.Text lines={2} />

                  <HStack space="2" alignItems="center">
                    <Skeleton size={"5"} rounded={"full"} />
                    <Skeleton h={"3"} flex={"2"} rounded={"full"} />
                    <Skeleton
                      h={"3"}
                      flex={"1"}
                      rounded={"full"}
                      startColor={"indigo.300"}
                    />
                  </HStack>
                </VStack>
              </HStack>
            </Center>
          ))}
        </Box>
      </ScrollView>
    );
  }

  if (!clubDetailsResponse) {
    return (
      <HStack safeArea h={"full"} w={"full"}>
        <Center w={"full"} h={"full"}>
          <GenericListEmpty />
        </Center>
      </HStack>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      _contentContainerStyle={{
        pb: "5",
      }}>
      <StatusBar translucent backgroundColor={"transparent"} />

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

        <Box position={"absolute"} w={"full"} top={0} left={0}>
          <SafeAreaView>
            <HStack p={"6"} justifyContent={"space-between"}>
              <IconButton
                rounded={"full"}
                variant={"ghost"}
                _icon={{
                  color: "white",
                }}
                icon={<Icon as={FontAwesome5} name={"chevron-left"} />}
              />

              <HStack space={4}>
                <IconButton
                  rounded={"full"}
                  variant={"ghost"}
                  _icon={{
                    color: "white",
                  }}
                  icon={<Icon as={AntDesign} name={"sharealt"} />}
                />

                <IconButton
                  size={"md"}
                  rounded={"full"}
                  variant={"subtle"}
                  bg={"rgba(0,0,0,0.5)"}
                  _pressed={{
                    bg: "secondary.300",
                  }}
                  _icon={{
                    color: "white",
                  }}
                  icon={
                    <Icon
                      as={AntDesign}
                      name={
                        clubDetailsResponse.club.is_favourite
                          ? "heart"
                          : "hearto"
                      }
                    />
                  }
                />
              </HStack>
            </HStack>
          </SafeAreaView>
        </Box>

        <Box top={"50%"} mt={-3} position={"absolute"} left={"6"}>
          <IconButton
            size={"md"}
            rounded={"full"}
            variant={"subtle"}
            bg={"rgba(0,0,0,0.5)"}
            onPress={handlePreviousSlide}
            _pressed={{
              bg: "secondary.300",
            }}
            _icon={{
              color: "white",
            }}
            icon={<Icon name={"arrow-left"} as={MaterialCommunityIcons} />}
          />
        </Box>

        <Box top={"50%"} mt={-3} position={"absolute"} right={"6"}>
          <IconButton
            size={"md"}
            rounded={"full"}
            variant={"subtle"}
            bg={"rgba(0,0,0,0.5)"}
            onPress={handleNextSlide}
            _pressed={{
              bg: "secondary.300",
            }}
            _icon={{
              color: "white",
            }}
            icon={<Icon name={"arrow-right"} as={MaterialCommunityIcons} />}
          />
        </Box>
      </Box>

      <VStack px={"6"} flex={1} bg={"rgba(255,255,255,0.1)"}>
        <View
          p={"4"}
          w={"full"}
          bg={"white"}
          shadow={"3"}
          rounded={"xl"}
          h={CARD_HEIGHT}
          marginTop={CARD_NEGATIVE_MARGIN}>
          <Text
            fontSize={"xl"}
            color={"#030819"}
            fontWeight={"bold"}
            fontFamily={"satoshi"}>
            {truncate(clubDetailsResponse.club.name)}
          </Text>

          <HStack my={2} space={"4"}>
            <MapIcon height={20} width={20} color={"#402B8C"} />

            <Text
              maxW={"75%"}
              fontSize={"sm"}
              color={"#030819"}
              fontFamily={"satoshi"}>
              {truncate(clubDetailsResponse.club.location, {
                length: 70,
              })}
            </Text>
          </HStack>

          <Divider my={"2"} />

          <HStack justifyContent={"space-between"} alignItems={"center"}>
            <HStack alignItems={"center"} space={"4"}>
              <Clock height={20} width={20} />
              <Text fontSize={"sm"} color={"#030819"} fontFamily={"satoshi"}>
                Open {clubDetailsResponse.club.opening_time} -{" "}
                {clubDetailsResponse.club.closing_time}
              </Text>
            </HStack>

            <Box>
              <HStack
                space={"1"}
                alignItems={"center"}
                justifyContent={"center"}>
                <Fontisto name="star" color={"#FFC529"} size={16} />
                <Text color={"black"} fontSize={"sm"}>
                  ({clubDetailsResponse.club.avg_rating})
                </Text>
              </HStack>
            </Box>
          </HStack>
        </View>

        <Box>
          <Button
            my={"5"}
            size={"md"}
            rounded={"2xl"}
            borderWidth={"2"}
            variant={"outline"}
            borderColor={"primary.300"}
            _text={{
              fontSize: "xl",
              color: "primary.300",
              fontFamily: "satoshi",
              fontWeight: "semibold",
            }}>
            Book a Table
          </Button>
        </Box>

        <VStack space={"5"}>
          <HStack justifyContent={"space-between"} space={"2"}>
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

          <Box>
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

          <VStack flexWrap={"wrap"} space={"5"}>
            <HStack
              w={"full"}
              alignItems={"center"}
              justifyContent={"space-between"}>
              <HStack alignItems={"center"} space={"2"}>
                <IconButton
                  bg={"blue.50"}
                  rounded={"full"}
                  variant={"subtle"}
                  _icon={{
                    color: "blue.300",
                  }}
                  _pressed={{
                    bg: "blue.100",
                  }}
                  icon={<Icon name={"phone"} as={MaterialIcons} />}
                />
                <Text fontSize={"md"}>Phone:</Text>
              </HStack>

              <Box>
                <Text fontSize={"md"}>{clubDetailsResponse.club.phone}</Text>
              </Box>
            </HStack>

            <HStack
              w={"full"}
              alignItems={"center"}
              justifyContent={"space-between"}>
              <HStack alignItems={"center"} space={"2"}>
                <IconButton
                  bg={"blue.50"}
                  rounded={"full"}
                  variant={"subtle"}
                  _icon={{
                    color: "blue.300",
                  }}
                  _pressed={{
                    bg: "blue.100",
                  }}
                  icon={<Icon name={"email"} as={MaterialIcons} />}
                />
                <Text fontSize={"md"}>Email:</Text>
              </HStack>

              <Box>
                <Text fontSize={"md"}>{clubDetailsResponse.club.email}</Text>
              </Box>
            </HStack>

            <HStack
              w={"full"}
              alignItems={"center"}
              justifyContent={"space-between"}>
              <HStack alignItems={"center"} space={"2"}>
                <IconButton
                  bg={"blue.50"}
                  rounded={"full"}
                  variant={"subtle"}
                  _icon={{
                    color: "blue.300",
                  }}
                  _pressed={{
                    bg: "blue.100",
                  }}
                  icon={<Icon name={"email"} as={MaterialIcons} />}
                />
                <Text fontSize={"md"}>Cuisines:</Text>
              </HStack>

              <Box>
                <Text fontSize={"md"}>{clubDetailsResponse.club.cuisine}</Text>
              </Box>
            </HStack>

            <HStack
              w={"full"}
              alignItems={"center"}
              justifyContent={"space-between"}>
              <HStack alignItems={"center"} space={"2"}>
                <IconButton
                  bg={"blue.50"}
                  rounded={"full"}
                  variant={"subtle"}
                  _icon={{
                    color: "blue.300",
                  }}
                  _pressed={{
                    bg: "blue.100",
                  }}
                  icon={<Icon name={"shopping-bag"} as={MaterialIcons} />}
                />
                <Text fontSize={"md"}>Average Cost:</Text>
              </HStack>

              <Box>
                <Text fontSize={"md"} color={"blue.300"} fontWeight={"bold"}>
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
