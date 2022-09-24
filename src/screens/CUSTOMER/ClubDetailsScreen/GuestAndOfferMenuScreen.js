import { View, Text, StyleSheet  } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'

const GuestAndOfferMenuScreen = ({navigation}) => {
  return (
    <View style={{
      
      backgroundColor:'#FFFFFF',
      flex:1
    }}>
      <View style={{padding:20}}>
      <View style={{alignSelf:'center'}}>
        <Text style={{
          fontFamily:'Satoshi-Regular',
          fontSize:25,
          color:'#030819'
        }}>Number of Guest</Text>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <TouchableOpacity style={{
            height:60,
            width:60,
            borderRadius:30,
            borderWidth:1,
            borderColor:'#030819',
            justifyContent:'center',
            alignItems:'center'
          }}>
            <Text>minus</Text>
          </TouchableOpacity>

          <Text style={{fontFamily:'SatoshiVariable-Bold',fontSize:38,margin:20}}>3</Text>
          <TouchableOpacity style={{
            height:60,
            width:60,
            borderRadius:30,
            borderWidth:1,
            borderColor:'#FF3FCB',
            justifyContent:'center',
            alignItems:'center'
          }}>
            <Text>plus</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={
        {
          fontFamily:'Satoshi-Medium',
          fontSize:25,
          color:'#030819'
        }
      }>Do you want to add offer menu items?</Text>
      <View style={{flexDirection:'row',marginTop:20}}>
      <LinearGradient
       colors={[ '#402B8C','#FF3FCB']}
       start={{x: 0, y: 0}}
       end={{x: 1, y: 0}}
       style={{
         height: 60,
         width: 100,
         
         alignItems:'center',
         justifyContent:'center',
         borderRadius:5
         
         
       }}
      >

      
        <Text style={{
            fontFamily:'Satoshi-Medium',
            color:'white',
            fontSize:16

        }}>Yes</Text>
       
        </LinearGradient>
        <TouchableOpacity style={{
          height:60,
          width:100,
          borderWidth:1,
          borderColor:'#00C1FF',
          justifyContent:'center',
          alignItems:'center',marginLeft:10
        }}>
          <Text>No</Text>
        </TouchableOpacity>
      </View>
      </View>
      
      <LinearGradient
       colors={[ '#402B8C','#FF3FCB']}
       start={{x: 0, y: 0}}
       end={{x: 1, y: 0}}
       style={{
         height: 70,
         width: '100%',
         flexDirection:'row',
         alignItems:'center',
         justifyContent:'space-between',
         paddingHorizontal:10,
         position:'absolute',
         bottom:0
       }}
      >

      
        <Text style={{
            fontFamily:'Satoshi-Medium',
            color:'white',
            fontSize:16

        }}>Tue, 17 Jun,10:30am</Text>
       <TouchableOpacity
       onPress={()=>navigation.navigate('addMenuItem')}
       style={styles.continueButton}>
        <Text style={{color:'#FF3FCB'}}>Continue</Text>
        
        </TouchableOpacity>
        </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  continueButton: {
    height: 50,
    width: 130,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GuestAndOfferMenuScreen