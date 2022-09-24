import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  StatusBar,
  Image
} from 'react-native';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import SplashScreen from 'react-native-splash-screen';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../components/Button';

const sliderImage = [
  {
    id: '001',
    image:require('../assets/1.jpg')
},
{
    id: '002',
    image: require('../assets/2.jpg'),
},
{
  id: '003',
  image: require('../assets/3.jpg'),
},

]

const InitialScreen = ({navigation}) => {

  const [dimension, setDimension] = useState(Dimensions.get('screen'));
  const [selectedIndex, setSelectedIndex] = useState(0);
  // const [sliderImage,setSliderImage] = useState([
  //   require('../assets/1.jpg'),
  //   require('../assets/2.jpg'),
  //   require('../assets/3.jpg')
  // ])

  const scrollRef = useRef();
  let intervalId = null;

  const onSlideChange = useCallback(() => {
    const newIndex =
      selectedIndex === sliderImage.length - 1 ? 0 : selectedIndex + 1;

    setSelectedIndex(newIndex);

    scrollRef?.current?.scrollTo({
      animated: true,
      y: 0,
      x: dimension.width * newIndex,
    });
  }, [selectedIndex]);

  const startInterval = useCallback(() => {
    intervalId = setInterval(onSlideChange, 3000);
  }, [onSlideChange]);

  useEffect(() => {
    startInterval();

    return () => {
      clearInterval(intervalId);
    };
  }, [onSlideChange]);

  const onTouchStart = () => {
    clearInterval(intervalId);
  };

  const onTouchEnd = () => {
    startInterval();
  };

  const setIndex = event => {
    let viewSize = event.nativeEvent.layoutMeasurement.width;
    let contentOffset = event.nativeEvent.contentOffset.x;
    let carouselIndex = Math.floor(contentOffset / viewSize);
    setSelectedIndex(carouselIndex);
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);


  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{flex: 1,}}>
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
              style={{
                width: dimension?.width * 1,
                height: dimension?.height * 1,
                resizeMode: 'cover',
              }}
              PlaceholderContent={<ActivityIndicator />}></ImageBackground>
          ))}
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            bottom: 30,
            alignSelf: 'center',
          }}>
          {sliderImage.map((val, key) => (
            <Text
              key={key}
              style={
                key === selectedIndex
                  ? {color: '#FF3FCB', marginHorizontal: 5}
                  : {color: '#402B8C', marginHorizontal: 5}
              }>
              ⬤
            </Text>
          ))}
        </View>

        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.3)',
            position: 'absolute',
            flex: 1,
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Image source={require('../assets/logo-white.png')}
            style={{height:100,width:160,marginBottom:10}}
            />
            <View style={{marginVertical:30,alignItems:"center"}}>
            <Text style={{color:'white',fontSize:18}}>Are You</Text>
            <Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>Customer or Club/Bar Owner</Text>
            <Text style={{color:'white',fontSize:18}}>Please Choose One!</Text>
            </View>
            

          <Button width={290} color={"secondary"} variant={"solid"} title={"Customer"}/>
          <Button width={290} color={"primary"} variant={"solid"} title={'Club/Bar Owner'} 
          onPress={()=>navigation.navigate('customer')}
          />
        </View>
      </View>
    </>
  );
};

export default InitialScreen;