import {View, Text,Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

const ProfileScreen = () => {
  return (
    <View>
      <LinearGradient
        colors={['#DF3BC0', '#472BBE']}
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        style={{
          height: 150,
          width: '100%',
        }}>
        <SafeAreaView>
          <TouchableOpacity
            style={{
              padding: 15,

              width: 50,
            }}>
            <Feather name="chevron-left" size={25} color={'white'} />
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
      <TouchableOpacity style={{
        padding:5,
        backgroundColor:'white',
        height:155,
        width:155,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:78,
        alignSelf:'center',
        marginTop:-75
      }}>
        <Image 
        style={{height:150,width:150,borderRadius:75}}
        source={{uri:'https://images.pexels.com/photos/1391495/pexels-photo-1391495.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}}/>
      </TouchableOpacity>
      <View style={{alignSelf:'center',alignItems:'center'}}>
        <Text style={{
            fontFamily:'SatoshiVariable-Bold',
            fontSize:26,
            color:'#030819'
        }}>John Smith</Text>
        <Text style={{
            color:'#8A8D9F',
            fontFamily:'Satoshi-Regular',
            fontSize:14
        }}>Las Vegas, NV 89109</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
