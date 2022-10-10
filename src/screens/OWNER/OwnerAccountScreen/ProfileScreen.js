import {View, Text,Image,Dimensions,FlatList} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

const screenWidth = Dimensions.get('screen').width;

const photoStory = [
  {
    id:1,
    uri: 'https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111-1500x1000.jpg',
    like:'33',
    disLike:'12'
  },
  {
    id:2,
    uri: 'https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111-1500x1000.jpg',
    like:'33',
    disLike:'12'
  },
  {
    id:3,
    uri: 'https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111-1500x1000.jpg',
    like:'33',
    disLike:'12'
  },
  {
    id:4,
    uri: 'https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111-1500x1000.jpg',
    like:'33',
    disLike:'12'
  },
  {
    id:5,
    uri: 'https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111-1500x1000.jpg',
    like:'33',
    disLike:'12'
  },
  {
    id:6,
    uri: 'https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111-1500x1000.jpg',
    like:'33',
    disLike:'12'
  },
  {
    id:7,
    uri: 'https://cdn-icons-png.flaticon.com/512/219/219986.png',
    like:'33',
    disLike:'12'
  },
  {
    id:8,
    uri: 'https://cdn-icons-png.flaticon.com/512/219/219986.png',
    like:'33',
    disLike:'12'
  },
  {
    id:9,
    uri: 'https://cdn-icons-png.flaticon.com/512/219/219986.png',
    like:'33',
    disLike:'12'
  },
  {
    id:10,
    uri: 'https://cdn-icons-png.flaticon.com/512/219/219986.png',
    like:'33',
    disLike:'12'
  },
  {
    id:11,
    uri: 'https://cdn-icons-png.flaticon.com/512/219/219986.png',
    like:'33',
    disLike:'12'
  }

]

const renderAllStory = ({item}) => <View style={{margin:3}}>
  <Image
  source={{uri:item.uri}}
  style={{
    height:100,
    width:screenWidth/3-10
  }}
  />
</View>

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

      <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:30,marginVertical:10}}>
        <View style={{alignItems:'center'}}>
          <LinearGradient
          colors={['#DF3BC0', '#472BBE']}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          style={{
            height: 40,
            width: 40,
            justifyContent:'center',
            alignItems:'center',
            borderRadius:20
          }}
          >
            <Text style={{color:'white'}}>2</Text>

          </LinearGradient>
          <Text>Books</Text>
        </View>

        <View style={{alignItems:'center'}}>
          <LinearGradient
          colors={[ '#402BBC','#00C1FF']}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          style={{
            height: 40,
            width: 40,
            justifyContent:'center',
            alignItems:'center',
            borderRadius:20
          }}
          >
            <Text style={{color:'white'}}>23</Text>

          </LinearGradient>
          <Text>Reviews</Text>
        </View>

        <View style={{alignItems:'center'}}>
          <LinearGradient
          colors={['#201648', '#7359D1']}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          style={{
            height: 40,
            width: 40,
            justifyContent:'center',
            alignItems:'center',
            borderRadius:20
          }}
          >
            <Text style={{color:'white'}}>2</Text>

          </LinearGradient>
          <Text>Photos</Text>
        </View>
      </View>

      <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10,marginVertical:10}}>
        
          <LinearGradient
          colors={['#472BBE','#DF3BC0']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            height: 40,
            width: screenWidth/3-10,
            justifyContent:'center',
            alignItems:'center',
            borderRadius:5
          }}
          >
            <Text style={{color:'white'}}>Photo Store</Text>

          </LinearGradient>
      

       
          <LinearGradient
          colors={[ '#402BBC','#00C1FF']}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          style={{
            height: 40,
            width: screenWidth/3-10,
            justifyContent:'center',
            alignItems:'center',
            borderRadius:5
          }}
          >
            <Text style={{color:'white'}}>Reviews</Text>

          </LinearGradient>
        

      
          <LinearGradient
          colors={['#201648', '#7359D1']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            height: 40,
            width: screenWidth/3-10,
            justifyContent:'center',
            alignItems:'center',
            borderRadius:5
          }}
          >
            <Text style={{color:'white'}}>Chat</Text>

          </LinearGradient>
         
      </View>

      <View style={{alignItems:'center'}}>
      <FlatList
          data={photoStory}
          renderItem={renderAllStory}
          keyExtractor={item => item.id}
          numColumns={3}
          showsVerticalScrollIndicator={false}
        />
      </View>




    </View>
  );
};

export default ProfileScreen;
