import { View, Text, StyleSheet, FlatList, LayoutAnimation } from 'react-native'
import React, { useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Entypo from 'react-native-vector-icons/Entypo'

const data = [
  {
    id: 1,
    name: 'How to send my package?'
  },
  {
    id: 2,
    name: 'Can i change pick up location?'
  },
  {
    id: 3,
    name: 'How to Edit Profile?'
  }, {
    id: 4,
    name: 'What does Lorem mean?'
  },
  {
    id: 5,
    name: 'Can i send a fragile package?'
  },
  {
    id: 6,
    name: 'How to send my package?'
  },
  {
    id: 7,
    name: 'Why do we use Lorem Inpsum?'
  }

]

const FaqScreen = () => {

  const [active, setActive] = useState(null);

  const renderItem = ({ item, index }) => {
    const onPress = item => {

      LayoutAnimation.easeInEaseOut();
      setActive(index == active ? null : index);

    };

    const open = active == index;
    return (
    
         <ScrollView 
      

      showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={{
            width: '100%',
           
            justifyContent: 'center',
            padding: 15,
            marginVertical:5
          }}
          onPress={() => onPress(item)}
          activeOpacity={1}
          key={item.id}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text
              style={{
                
                fontSize: 16,
                fontFamily: 'SatoshiVariable-Bold',
                color:"#222B45"
              }}>
              {item.name}
            </Text>
            {open ? (
               <View style={{
                backgroundColor:'#8A8D9F',
                height:25,
                width:25,
                borderRadius:15,
                justifyContent:'center',
                alignItems:'center'
               }}>
                <Entypo name="chevron-small-down" size={8} color={'white'} />
                </View>
              
            ) : (
              <View style={{
                backgroundColor:'#8A8D9F',
                height:20,
                width:20,
                borderRadius:10,
                justifyContent:'center',
                alignItems:'center'
               }}>
                 <Entypo   name="chevron-small-right" size={12} color={'white'} />
                </View>
             
            )}
          </View>
          <View style={{ flexDirection: 'row' }}>
            {open && (
              <View>
                <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </ScrollView>
   
    );
  };
  return (
    <View style={{
        flex:1,
        backgroundColor:'#FFFFFF'
    }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}

      />
    </View>

  )
}

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#FF3FCB",
  },

  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: '#FF3FCB',
    backgroundColor: '#F4F5F7',
    borderRadius: 25

  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
    width: 45,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    backgroundColor: '#F4F5F7',
    borderRadius: 25,
    color: '#FF3FCB'
  },
})

export default FaqScreen