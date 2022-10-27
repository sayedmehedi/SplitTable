import React from "react";
import SplashScreen from "react-native-splash-screen";
import {StackScreenProps} from "@react-navigation/stack";
import {useDimensions} from "@react-native-community/hooks";
import {CompositeScreenProps} from "@react-navigation/native";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";
import {
  Box,
  Text,
  Image,
  HStack,
  FlatList,
  TouchableOpacity,
  LinearGradient,
} from "@components/ui";
import {CustomerAuthStackRoutes, CustomerStackRoutes} from "@constants/routes";
import {
  StatusBar,
  StyleSheet,
  SafeAreaView,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  FlatList as RNFlatList,
} from "react-native";

const slides = [
  {
    id: "1",
    image: require("@assets/onboarding1.jpg"),
    title: "Choose Nearest Club/Bar",
    subtitle:
      "Reference site about Lorem Ipsum,giving information origins as well as a random",
  },
  {
    id: "2",
    image: require("@assets/onboarding2.jpg"),
    title: "Book Tables",
    subtitle:
      "Reference site about Lorem Ipsum,giving information origins as well as a random",
  },
  {
    id: "3",
    image: require("@assets/onboarding3.jpg"),
    title: "Enjoy!!!",
    subtitle:
      "Reference site about Lorem Ipsum,giving information origins as well as a random",
  },
];

type Props = CompositeScreenProps<
  StackScreenProps<
    CustomerStackParamList,
    typeof CustomerStackRoutes.ONBOARDING
  >,
  StackScreenProps<RootStackParamList>
>;

const PAGINATION_INDICATOR_HEIGHT = 50;

const OnboardingScreen = ({navigation}: Props) => {
  const {
    screen: {width, height},
  } = useDimensions();
  const ref = React.useRef<RNFlatList>(null!);
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

  const updateCurrentSlideIndex = React.useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const contentOffsetX = e.nativeEvent.contentOffset.x;
      const newCurrentIndex = Math.round(contentOffsetX / width);
      setCurrentSlideIndex(newCurrentIndex);
    },
    [],
  );

  const goToNextSlide = React.useCallback(() => {
    const nextSlideIndex = currentSlideIndex + 1;

    if (nextSlideIndex !== slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(prevIndex => prevIndex + 1);
    }
  }, [currentSlideIndex]);

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  const renderEachItem: ListRenderItem<typeof slides[0]> = React.useCallback(
    ({item}) => {
      return (
        <Box>
          <Image
            width={width}
            height={"2/3"}
            source={item?.image}
            alt={"onboarding-image"}
          />

          <LinearGradient
            width={"full"}
            end={{x: 0, y: 0}}
            start={{x: 0, y: 1}}
            // @ts-ignore
            alignItems={"center"}
            position={"absolute"}
            borderTopLeftRadius={30}
            borderTopRightRadius={30}
            // @ts-ignore
            justifyContent={"center"}
            colors={["#DF3BC0", "#472BBE"]}
            bottom={PAGINATION_INDICATOR_HEIGHT}
            height={height * 0.47 - PAGINATION_INDICATOR_HEIGHT}>
            <Box>
              <Text
                color={"white"}
                fontSize={"2xl"}
                textAlign={"center"}
                fontFamily={"SatoshiVariable-Bold"}>
                {item?.title}
              </Text>

              <Text
                mb={5}
                mt={1.5}
                mx={"auto"}
                fontSize={"md"}
                color={"white"}
                lineHeight={23}
                maxWidth={"3/5"}
                textAlign={"center"}>
                {item?.subtitle}
              </Text>
            </Box>

            <Box mb={5} width={"full"}>
              <Box height={PAGINATION_INDICATOR_HEIGHT} px={6}>
                <TouchableOpacity
                  p={4}
                  borderRadius={"lg"}
                  bg={"rgba(255,255,255, 0.3)"}
                  onPress={() => {
                    if (currentSlideIndex === slides.length - 1) {
                      navigation.navigate(CustomerStackRoutes.CUSTOMER_AUTH, {
                        screen: CustomerAuthStackRoutes.LOGIN_PROMPT,
                      });
                    } else {
                      goToNextSlide();
                    }
                  }}>
                  <Text
                    fontSize={"md"}
                    color={"white"}
                    textAlign={"center"}
                    fontFamily={"SatoshiVariable-Bold"}>
                    Get Started
                  </Text>
                </TouchableOpacity>
              </Box>
            </Box>
          </LinearGradient>
        </Box>
      );
    },
    [currentSlideIndex, goToNextSlide],
  );

  const flatlistContentContainerStyle = React.useMemo(() => {
    return {height: height * 1};
  }, [height]);

  return (
    <SafeAreaView style={styles.safeareaBox}>
      <StatusBar translucent backgroundColor={"transparent"} />

      <FlatList
        ref={ref}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={renderEachItem}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={flatlistContentContainerStyle}
      />

      <LinearGradient
        end={{x: 3, y: 3}}
        start={{x: 0, y: 1}}
        colors={["#DF3BC0", "#472BBE"]}>
        <HStack height={50} alignItems={"center"} justifyContent={"center"}>
          {/* Render indicator */}
          {slides.map((_, index) => (
            <Text
              mx={1}
              key={index}
              color={index === currentSlideIndex ? "white" : "#402B8C"}>
              ⬤
            </Text>
          ))}
        </HStack>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    // fontSize: 16,
    // marginTop: 10,
    // lineHeight: 23,
    // maxWidth: "70%",
    // marginVertical: 20,
    // color: COLORS.white,
    // textAlign: "center",
  },
  safeareaBox: {
    flex: 1,
    backgroundColor: "#DF3BC0",
  },
  title: {
    // fontSize: 25,
    // marginTop: 20,
    // fontWeight: "bold",
    // color: COLORS.white,
    // textAlign: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: "grey",
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    width: 290,
  },
});
export default OnboardingScreen;
