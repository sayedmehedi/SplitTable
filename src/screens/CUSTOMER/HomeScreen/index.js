import {View, Text, Pressable} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {FlatList, ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';
import {MapIcon, LasVegas, Miami, Chicago} from '../../../Constants/iconPath';
import {productData} from '../../../Constants/dummy';
import EachClubItem from '../../../components/EachClubItem';
import EachNearByItem from './EachNearByItem';
import EachRecentVisitsItem from './EachRecentVisitsItem';



const category = [
  {
    id: 1,
    title: 'Las Vegas',
    icon: LasVegas,
  },
  {
    id: 2,
    title: 'Miami',
    icon: Miami,
  },
  {
    id: 3,
    title: 'Chicago',
    icon: Chicago,
  },
];


const renderClubItem = ({item}) => <EachClubItem item={item} />;
const renderNearByItem = ({item}) => <EachNearByItem item={item} />;
const renderRecentVisitItems = ({item}) => <EachRecentVisitsItem item={item} />;
const HomeScreen = ({navigation}) => {
  const renderItem = ({item}) => {
    
    //console.log(item);
    return (
      <Pressable
      onPress={()=>navigation.navigate('clubList')}
      >
        <View style={{margin: 5, alignItems: 'center'}}>
          <item.icon />
          <Text style={{color: 'black'}}>{item.title}</Text>
        </View>
      </Pressable>
    );
  };
  return (
    <View style={{flex: 1,backgroundColor:'#FFFFFF'}}>
     <ScrollView contentContainerStyle={{
      backgroundColor:'#FFFFFF'
     }}>
     <LinearGradient
        colors={['#DF3BC0', '#472BBE']}
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        style={{
          height: 240,
          width: '100%',
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text
              style={{
                fontFamily: 'SatoshiVariable-Bold',
                fontSize: 20,
                color: '#FFFFFF',
              }}>
              Good Evening!
            </Text>
            <Text
              style={{
                fontFamily: 'SatoshiVariable-Bold',
                fontSize: 16,
                color: '#FFFFFF',
              }}>
              Alexa Smith
            </Text>
          </View>
          <View
            style={{
              height: 45,
              width: 45,
              borderRadius: 45,
              backgroundColor: 'rgba(255,255,255, 0.2)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 17,
                width: 17,
                borderRadius: 17,
                backgroundColor: '#402B8C',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: -12,
                marginRight: -25,
                marginBottom: -8,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 10}}>
                2
              </Text>
            </View>
            <MaterialIcons
              name="notifications-none"
              color={'white'}
              size={30}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.searchButton}>
          <Feather name="search" color={'#C3C3C3'} size={15} />
          <Text
            style={{
              marginLeft: 8,
              fontFamily: 'Satoshi-Regular',
              fontSize: 14,
              color: '#C3C3C3',
            }}>
            Find your restaurant
          </Text>
        </TouchableOpacity>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MapIcon height={16} width={16} style={{color: 'white'}} />
          <Text
            style={{
              fontFamily: 'Satoshi-Regular',
              fontSize: 14,
              color: 'white',
              marginLeft: 10,
            }}>
            Nevada, Las Vegas
          </Text>
        </View>
      </LinearGradient>
      <View style={{paddingVertical:10}}>
      <FlatList
        horizontal
        data={category}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      </View>

      <View style={{
        flexDirection:'row',
        alignItems:"center",
        justifyContent:'space-between',
        paddingHorizontal:20,
        marginVertical:10
      }}>
        <Text style={{
          fontFamily:'SatoshiVariable-Bold',
          fontSize:20,
          color:'#030819'
        }}>Popular Clubs/Bars</Text>
        <Text style={{
          fontFamily:'Satoshi-Regular',
          fontSize:14,
          color:"#262B2E"
        }}>See all</Text>
      </View>

     <View style={{padding:0,}}>
     <FlatList
        horizontal
        data={productData}
        renderItem={renderClubItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
     </View>
       <View style={{
        flexDirection:'row',
        alignItems:"center",
        justifyContent:'space-between',
        paddingHorizontal:20,
        marginVertical:10
      }}>
        <Text style={{
          fontFamily:'SatoshiVariable-Bold',
          fontSize:20,
          color:'#030819'
        }}>Near by You</Text>
        <Text style={{
          fontFamily:'Satoshi-Regular',
          fontSize:14,
          color:"#262B2E"
        }}>See all</Text>
      </View>
      <View style={{padding:20}}>
      <FlatList
       
       data={productData}
       renderItem={renderNearByItem}
       keyExtractor={item => item.id}
     />
      </View>
      <View style={{
        flexDirection:'row',
        alignItems:"center",
        justifyContent:'space-between',
        paddingHorizontal:20,
        marginVertical:10
      }}>
        <Text style={{
          fontFamily:'SatoshiVariable-Bold',
          fontSize:20,
          color:'#030819'
        }}>Your Recent Visits</Text>
        <Text style={{
          fontFamily:'Satoshi-Regular',
          fontSize:14,
          color:"#262B2E"
        }}>See all</Text>
      </View>
      <View style={{padding:10}}>
      <FlatList
       horizontal
       data={productData}
       renderItem={renderRecentVisitItems}
       keyExtractor={item => item.id}
       showsHorizontalScrollIndicator={false}
     />
      </View>
     </ScrollView>
    </View>
  );
};

export default HomeScreen;
