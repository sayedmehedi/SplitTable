import React from 'react';
import EachConversation from './EachConversation';
import {View, Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';

const categories = [
  {
    id: '1',
    name: 'Electronics & Media',
    uri: 'https://cdn-icons-png.flaticon.com/512/219/219986.png',
  },
  {
    id: '2',
    name: 'Home & Garden',
    uri: 'https://cdn-icons-png.flaticon.com/512/219/219986.png',
  },
  {
    id: '3',
    name: 'Clothing Shoes',
    uri: 'https://cdn-icons-png.flaticon.com/512/219/219986.png',
  },
  {
    id: '4',
    name: 'Vehicles',
    uri: 'https://cdn-icons-png.flaticon.com/512/219/219986.png',
  },
  {
    id: '5',
    name: 'Electronic',
    uri: 'https://cdn-icons-png.flaticon.com/512/219/219986.png',
  },
];

const renderAllUser = ({item}) => <EachConversation item={item} />;

const ChatScreen = () => {
  return (
    <View style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <SafeAreaView style={{
        padding:15
      }}>
        <View>
          <Text
            style={{
              fontFamily: 'SatoshiVariable-Bold',
              fontSize: 22,
              color: '#030819',
            }}>
            Chat
          </Text>
          <Text
            style={{
              color: '#707070',
              fontFamily: 'Satoshi-Regular',
              fontSize: 14,
              marginVertical:8
            }}>
            You have 2 new message
          </Text>
          <TextInput
          placeholder='Search'
          style={{
            height:44,
            width:'100%',
            borderRadius:8,
            borderWidth:1,
            borderColor:'#D8D8D8',
            paddingLeft:10
          }}
          />
        </View>
        <FlatList
            data={categories}
            renderItem={renderAllUser}
            keyExtractor={item => item.id}
          />
      </SafeAreaView>
      
    </View>
  );
};

export default ChatScreen;
