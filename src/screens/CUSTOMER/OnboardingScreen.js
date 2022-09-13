import React,{useEffect} from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';
const {width, height} = Dimensions.get('window');

const COLORS = {primary: 'green', white: '#fff'};

const slides = [
  {
    id: '1',
    image: require('../../assets/onboarding1.jpg'),
    title: 'Choose Nearest Club/Bar',
    subtitle: 'Reference site about Lorem Ipsum,giving information origins as well as a random',
  },
  {
    id: '2',
    image: require('../../assets/onboarding2.jpg'),
    title: 'Book Tables',
    subtitle: 'Reference site about Lorem Ipsum,giving information origins as well as a random',
  },
  {
    id: '3',
    image: require('../../assets/onboarding3.jpg'),
    title: 'Enjoy!!!',
    subtitle: 'Reference site about Lorem Ipsum,giving information origins as well as a random',
  },
];

const OnboardingScreen = ({}) => {
  const navigation = useNavigation();
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  useEffect(()=>{
    SplashScreen.hide();

  },[])

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.primary}}>
      <StatusBar translucent backgroundColor="transparent" />

      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{height: height * 1}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({item}) => {
          return (
            <View>
              <Image source={item?.image} style={{height: '65%', width}} />

              <LinearGradient
              colors={['#DF3BC0','#472BBE']}
              start={{x: 0, y: 1}}
              end={{x: 0, y: 0}}
                style={{
                  
                  height: 380,
                  borderTopRightRadius:30,
                  borderTopLeftRadius:30,
                  position:'absolute',
                  bottom:0,
                  width:'100%',
                  alignItems:'center',
                 
                  justifyContent:'center'
                  
                }}>
                <View style={{marginTop:-10}}>
                  <Text style={styles.title}>{item?.title}</Text>
                  <Text style={styles.subtitle}>{item?.subtitle}</Text>
                </View>
                <View>
                  {currentSlideIndex == slides.length - 1 ? (
                    <View style={{height: 50}}>
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() => navigation.navigate('customerAuth')}>
                        <Text style={{fontWeight: 'bold', fontSize: 15,color:'white'}}>
                          Get Started
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={goToNextSlide}
                      style={styles.btn}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 16,
                          color: 'white',
                        }}>
                       Get Started
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {/* Render indicator */}
          {slides.map((_, index,key) => (
            <Text
            key={index}
            style={
              index === currentSlideIndex
                ? {color: 'white', marginHorizontal: 5}
                : {color: '#402B8C', marginHorizontal: 5}
            }>
            ⬤
          </Text>
          ))}
        </View>
              </LinearGradient>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.white,
    fontSize: 16,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
    marginVertical:20
  },
  title: {
    color: COLORS.white,
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    height: 50,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    width: 290,
  },
});
export default OnboardingScreen;
