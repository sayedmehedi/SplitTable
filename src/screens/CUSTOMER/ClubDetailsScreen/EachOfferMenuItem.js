import {View, Text, Image,} from 'react-native';
import React from 'react';

const EachOfferMenuItem = ({item}) => {
  return (
    <View
      style={{
        height: 100,
        width: '100%',

        flexDirection: 'row',
        
        backgroundColor:'rgba(255,255,255,0.9)',
        marginVertical:10
        
        
        
        
        
        
      }}>
      <Image
        source={item.uri}
        style={{
          height: 100,
          width: 100,
          
        }}
      />
      <View style={{padding: 10, justifyContent: 'space-between',}}>
        <Text
          style={{
            fontFamily: 'Satoshi-Medium',
            color: '#262B2E',
            fontSize: 18,
          }}>
          {item.name}
        </Text>
        <View style={{width:'80%',}}>
            <Text
            numberOfLines={3}
             style={{
                fontFamily:'Satoshi-Regular',
                fontSize:10,
                color:'#8A8D9F'

            }}>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print,</Text>
        </View>

        <Text style={{
            fontFamily:"SatoshiVariable-Bold",
            fontSize:12,
            color:'#00C1FF'
        }}>Price: $2123</Text>
      </View>
    </View>
  );
};



export default EachOfferMenuItem;
