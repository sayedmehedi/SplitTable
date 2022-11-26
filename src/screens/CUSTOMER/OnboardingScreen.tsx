import React from "react";
import {RootStackParamList} from "@src/navigation";
import SplashScreen from "react-native-splash-screen";
import {StackScreenProps} from "@react-navigation/stack";
import {useDimensions} from "@react-native-community/hooks";
import {CustomerStackRoutes, RootStackRoutes} from "@constants/routes";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  FlatList as RNFlatList,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import {splitAppTheme} from "@src/theme";
import LinearGradient from "react-native-linear-gradient";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";
import FastImage from "react-native-fast-image";

const slides = [
  {
    id: "1",
    image: require("@assets/onboarding1.jpg"),
    title: "Joining Tables",
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

type Props = StackScreenProps<
  RootStackParamList,
  typeof RootStackRoutes.CUSTOMER_ONBOARDING
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
    ({item, index}) => {
      return (
        <View>
          <FastImage
            style={{
              width: width,
              height: splitAppTheme.sizes["2/3"],
            }}
            source={item?.image}
          />

          <LinearGradient
            style={{
              position: "absolute",
              borderTopLeftRadius: 30,
              // justifyContent: "center",
              borderTopRightRadius: 30,
              width: splitAppTheme.sizes.full,
              bottom: 0,
              height: height * 0.43 - PAGINATION_INDICATOR_HEIGHT,
            }}
            end={{x: 0, y: 0}}
            start={{x: 0, y: 1}}
            colors={[
              splitAppTheme.colors.primary[400],
              splitAppTheme.colors.secondary[400],
            ]}>
            <View
              style={{
                paddingTop: height * 0.47 * 0.12,
              }}>
              <Text
                style={{
                  textAlign: "center",
                  color: splitAppTheme.colors.white,
                  fontSize: splitAppTheme.fontSizes["2xl"],
                  fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                }}>
                {item?.title}
              </Text>

              <Text
                style={{
                  lineHeight: 23,
                  textAlign: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                  color: splitAppTheme.colors.white,
                  marginTop: splitAppTheme.space[1.5],
                  marginBottom: splitAppTheme.space[5],
                  fontSize: splitAppTheme.fontSizes.md,
                  maxWidth: splitAppTheme.sizes["3/5"],
                }}>
                {item?.subtitle}
              </Text>
            </View>

            {index === slides.length - 1 ? (
              <View
                style={{
                  width: splitAppTheme.sizes.full,
                  marginBottom: splitAppTheme.space[5],
                }}>
                <View
                  style={{
                    paddingHorizontal: splitAppTheme.space[6],
                  }}>
                  <TouchableOpacity
                    style={{
                      padding: splitAppTheme.space[4],
                      borderRadius: splitAppTheme.radii.lg,
                      backgroundColor: "rgba(255,255,255, 0.3)",
                    }}
                    onPress={() => {
                      navigation.navigate(
                        RootStackRoutes.CUSTOMER_LOGIN_PROMPT,
                      );
                    }}>
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontSize: splitAppTheme.fontSizes.md,
                        fontFamily:
                          splitAppTheme.fontConfig.Sathoshi[700].normal,
                      }}>
                      Get Started
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View
                style={{
                  width: splitAppTheme.sizes.full,
                  marginBottom: splitAppTheme.space[5],
                  marginTop: height * 0.47 * 0.12,
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: splitAppTheme.space[6],
                  }}>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate(
                          RootStackRoutes.CUSTOMER_LOGIN_PROMPT,
                        );
                      }}>
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          fontSize: splitAppTheme.fontSizes.md,
                          fontFamily:
                            splitAppTheme.fontConfig.Sathoshi[700].normal,
                        }}>
                        Skip
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        goToNextSlide();
                      }}>
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          fontSize: splitAppTheme.fontSizes.md,
                          fontFamily:
                            splitAppTheme.fontConfig.Sathoshi[700].normal,
                        }}>
                        Next
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </LinearGradient>
        </View>
      );
    },
    [currentSlideIndex, goToNextSlide],
  );

  const flatlistContentContainerStyle = React.useMemo(() => {
    return {height: height * 1};
  }, [height]);

  return (
    <View style={styles.safeareaBox}>
      <FocusAwareStatusBar
        translucent
        barStyle={"light-content"}
        backgroundColor={"transparent"}
      />

      <FlatList
        ref={ref}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={renderEachItem}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        // contentContainerStyle={flatlistContentContainerStyle}
      />

      <LinearGradient
        end={{x: 3, y: 3}}
        start={{x: 0, y: 1}}
        colors={["#DF3BC0", "#472BBE"]}>
        <View
          style={{
            height: 50,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}>
          {/* Render indicator */}
          {slides.map((_, index) => (
            <Text
              style={{
                marginHorizontal: splitAppTheme.space[1],
                color: index === currentSlideIndex ? "white" : "#402B8C",
              }}
              key={index}>
              ⬤
            </Text>
          ))}
        </View>
      </LinearGradient>
    </View>
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
    width: 290,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255, 0.3)",
  },
});
export default OnboardingScreen;
