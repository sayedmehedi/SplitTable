import Button from "@components/Button";
import {AuthType} from "@src/models";
import {AuthTypes} from "@constants/auth";
import {RootStackParamList} from "@src/navigation";
import {RootStackRoutes} from "@constants/routes";
import useAuthContext from "@hooks/useAuthContext";
import SplashScreen from "react-native-splash-screen";
import {useDimensions} from "@react-native-community/hooks";
import type {StackScreenProps} from "@react-navigation/stack";
import React, {useEffect, useState, useRef, useCallback} from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
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
  const scrollRef = useRef<ScrollView>(null!);
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
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{flex: 1}}>
        <ScrollView
          horizontal
          ref={scrollRef}
          onMomentumScrollEnd={setIndex}
          showsHorizontalScrollIndicator={false}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          pagingEnabled>
          {sliderImage.map((value, key) => (
            <ImageBackground
              key={value.id}
              source={value.image}
              resizeMode={"cover"}
              style={{
                width: windowDimension?.width * 1,
                height: windowDimension?.height * 1,
              }}></ImageBackground>
          ))}
        </ScrollView>
        <View
          style={{
            bottom: 30,
            flexDirection: "row",
            position: "absolute",
            alignSelf: "center",
          }}>
          {sliderImage.map((val, key) => (
            <Text
              key={key}
              style={
                key === selectedIndex
                  ? {color: "#FF3FCB", marginHorizontal: 5}
                  : {color: "#402B8C", marginHorizontal: 5}
              }>
              ⬤
            </Text>
          ))}
        </View>

        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.3)",
            position: "absolute",
            flex: 1,
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Image
            source={require("@assets/logo-white.png")}
            style={{height: 100, width: 160, marginBottom: 10}}
          />
          <View style={{marginVertical: 30, alignItems: "center"}}>
            <Text style={{color: "white", fontSize: 18}}>Are You</Text>
            <Text style={{color: "white", fontSize: 18, fontWeight: "bold"}}>
              Customer or Club/Bar Owner
            </Text>
            <Text style={{color: "white", fontSize: 18}}>
              Please Choose One!
            </Text>
          </View>

          <Button
            width={290}
            variant={"solid"}
            title={"Customer"}
            color={"secondary"}
            onPress={handleSetAuthType.bind(null, AuthTypes.CUSTOMER)}
          />
          <Button
            width={290}
            color={"primary"}
            variant={"solid"}
            title={"Club/Bar Owner"}
            onPress={handleSetAuthType.bind(null, AuthTypes.OWNER)}
          />
        </View>
      </View>
    </>
  );
};

export default InitialScreen;
