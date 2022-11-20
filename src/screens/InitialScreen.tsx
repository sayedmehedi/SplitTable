import React from "react";
import {AuthType} from "@src/models";
import {AuthTypes} from "@constants/auth";
import {splitAppTheme} from "@src/theme";
import {RootStackRoutes} from "@constants/routes";
import {RootStackParamList} from "@src/navigation";
import {useDimensions} from "@react-native-community/hooks";
import AppGradientButton from "@components/AppGradientButton";
import type {StackScreenProps} from "@react-navigation/stack";
import {AuthTypeContext} from "@providers/AuthTypeProvider";
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView as RNScrollView,
} from "react-native";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";

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
  const scrollRef = React.useRef<RNScrollView>(null!);
  const {screen: windowDimension} = useDimensions();
  const intervalIdRef = React.useRef<number | null>(null);
  const {changeAuthType} = React.useContext(AuthTypeContext);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onSlideChange = React.useCallback(() => {
    const newIndex =
      selectedIndex === sliderImage.length - 1 ? 0 : selectedIndex + 1;

    setSelectedIndex(newIndex);

    scrollRef?.current?.scrollTo({
      y: 0,
      animated: true,
      x: windowDimension.width * newIndex,
    });
  }, [selectedIndex]);

  const startInterval = React.useCallback(() => {
    intervalIdRef.current = setInterval(onSlideChange, 3000);
  }, [onSlideChange]);

  React.useEffect(() => {
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

  const handleSetAuthType = (type: AuthType) => {
    changeAuthType(type);
  };

  return (
    <>
      <FocusAwareStatusBar translucent backgroundColor={"transparent"} />
      <View
        style={{
          flex: 1,
        }}>
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
              }}
            />
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
              style={{
                marginHorizontal: 1,
                color:
                  key === selectedIndex
                    ? splitAppTheme.colors.primary[300]
                    : splitAppTheme.colors.secondary[300],
              }}
              key={key}>
              ⬤
            </Text>
          ))}
        </View>

        <View
          style={{
            flex: 1,
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            width: splitAppTheme.space.full,
            height: splitAppTheme.space.full,
            backgroundColor: "rgba(0,0,0,0.3)",
          }}>
          <Image
            style={{
              width: 160,
              height: 100,
              marginBottom: 10,
            }}
            source={require("@assets/logo-white.png")}
          />
          <View
            style={{
              marginVertical: splitAppTheme.space[8],
              alignItems: "center",
            }}>
            <Text
              style={{
                color: "white",
                fontSize: splitAppTheme.fontSizes.sm,
              }}>
              Are You
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: splitAppTheme.fontSizes.lg,
                fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
              }}>
              Customer or Club/Bar Owner
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: splitAppTheme.fontSizes.sm,
              }}>
              Please Choose One!
            </Text>
          </View>

          <AppGradientButton
            width={290}
            variant={"solid"}
            title={"Customer"}
            color={"secondary"}
            onPress={() => {
              handleSetAuthType(AuthTypes.CUSTOMER);
              navigation.navigate(RootStackRoutes.CUSTOMER_ONBOARDING);
            }}
          />
          <AppGradientButton
            width={290}
            color={"primary"}
            variant={"solid"}
            title={"Club/Bar Owner"}
            onPress={() => {
              handleSetAuthType(AuthTypes.OWNER);
              navigation.navigate(RootStackRoutes.SIGNIN);
            }}
          />
        </View>
      </View>
    </>
  );
};

export default InitialScreen;
