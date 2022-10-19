import {AuthType} from "@src/models";
import Button from "@components/Button";
import {AuthTypes} from "@constants/auth";
import {RootStackParamList} from "@src/navigation";
import {CustomerStackRoutes, RootStackRoutes} from "@constants/routes";
import useAuthContext from "@hooks/useAuthContext";
import SplashScreen from "react-native-splash-screen";
import {useDimensions} from "@react-native-community/hooks";
import type {StackScreenProps} from "@react-navigation/stack";
import React, {useEffect, useState, useRef, useCallback} from "react";
import {VStack, StatusBar, ScrollView, Box, Text, Image} from "native-base";
import {
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView as RNScrollView,
} from "react-native";

const sliderImage = [
  {
    id: "001",
    image: require("@assets/1.jpg"),
  },
  {
    id: "002",
    image: require("@assets/2.jpg"),
  },
  {
    id: "003",
    image: require("@assets/3.jpg"),
  },
];

type Props = StackScreenProps<
  RootStackParamList,
  typeof RootStackRoutes.INITIAL
>;

const InitialScreen = ({navigation}: Props) => {
  const {setAuthType} = useAuthContext();
  const scrollRef = useRef<RNScrollView>(null!);
  const {window: windowDimension} = useDimensions();
  const intervalIdRef = useRef<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSlideChange = useCallback(() => {
    const newIndex =
      selectedIndex === sliderImage.length - 1 ? 0 : selectedIndex + 1;

    setSelectedIndex(newIndex);

    scrollRef?.current?.scrollTo({
      y: 0,
      animated: true,
      x: windowDimension.width * newIndex,
    });
  }, [selectedIndex]);

  const startInterval = useCallback(() => {
    intervalIdRef.current = setInterval(onSlideChange, 3000);
  }, [onSlideChange]);

  useEffect(() => {
    startInterval();

    return () => {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    };
  }, [onSlideChange]);

  const onTouchStart = () => {
    if (intervalIdRef.current) clearInterval(intervalIdRef.current);
  };

  const onTouchEnd = () => {
    startInterval();
  };

  const setIndex = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    let viewSize = event.nativeEvent.layoutMeasurement.width;
    let contentOffset = event.nativeEvent.contentOffset.x;
    let carouselIndex = Math.floor(contentOffset / viewSize);
    setSelectedIndex(carouselIndex);
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const handleSetAuthType = (type: AuthType) => {
    setAuthType(type);
  };

  return (
    <>
      <StatusBar translucent backgroundColor={"transparent"} />
      <VStack flex={1}>
        <ScrollView
          horizontal
          pagingEnabled
          ref={scrollRef}
          onTouchEnd={onTouchEnd}
          onTouchStart={onTouchStart}
          onMomentumScrollEnd={setIndex}
          showsHorizontalScrollIndicator={false}>
          {sliderImage.map((value, key) => (
            <ImageBackground
              key={value.id}
              source={value.image}
              resizeMode={"cover"}
              style={{
                width: windowDimension.width * 1,
                height: windowDimension.height * 1,
              }}></ImageBackground>
          ))}
        </ScrollView>
        <Box
          bottom={30}
          flexDirection={"row"}
          position={"absolute"}
          alignSelf={"center"}>
          {sliderImage.map((val, key) => (
            <Text
              mx={1}
              key={key}
              color={key === selectedIndex ? "primary.300" : "secondary.300"}>
              ⬤
            </Text>
          ))}
        </Box>

        <Box
          flex={1}
          width={"full"}
          height={"full"}
          position={"absolute"}
          alignItems={"center"}
          bg={"rgba(0,0,0,0.3)"}
          justifyContent={"center"}>
          <Image
            width={160}
            height={100}
            alt={"bg-image"}
            marginBottom={10}
            source={require("@assets/logo-white.png")}
          />
          <Box my={8} alignItems={"center"}>
            <Text color={"white"} fontSize={"lg"}>
              Are You
            </Text>
            <Text color={"white"} fontSize={"lg"} fontWeight={"bold"}>
              Customer or Club/Bar Owner
            </Text>
            <Text color={"white"} fontSize={"lg"}>
              Please Choose One!
            </Text>
          </Box>

          <Button
            width={290}
            variant={"solid"}
            title={"Customer"}
            color={"secondary"}
            onPress={() => {
              handleSetAuthType(AuthTypes.CUSTOMER);
              // @ts-ignore
              navigation.navigate(RootStackRoutes.CUSTOMER, {});
            }}
          />
          <Button
            width={290}
            color={"primary"}
            variant={"solid"}
            title={"Club/Bar Owner"}
            onPress={() => {
              handleSetAuthType(AuthTypes.OWNER);
              // @ts-ignore
              navigation.navigate(RootStackRoutes.OWNER, {});
            }}
          />
        </Box>
      </VStack>
    </>
  );
};

export default InitialScreen;
