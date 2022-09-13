import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {View, Text, Image, TouchableOpacity} from 'react-native';

const EachConversation = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      
      
      style={{
        height: 80,
        width: '100%',
        marginBottom: 1,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 15,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={{uri:'https://cdn-icons-png.flaticon.com/512/219/219986.png'}}
          style={{height: 50, width: 50, borderRadius: 25, marginRight: 20}}
        />

        <View>
          <Text
            style={{color: '#023047', fontFamily: 'Inter-Bold', fontSize: 15}}>
            Sayed Mehedi hasan
          </Text>

          <Text
            style={{
              fontSize: 12,
              color: '#023047',
              fontFamily: 'Inter-Regular',
            }}>
            Hi Juilan! See you After work?
          </Text>

          
        </View>
      </View>
      <Text
            style={{
              fontSize: 10,
              color: '#E62B56',
              fontFamily: 'Inter-Regular',
            }}>
            Now
          </Text>

     
    </TouchableOpacity>
  );
};

export default EachConversation;
