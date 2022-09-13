import { View, Text,ImageBackground } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'

const ClubDetailsScreen = () => {
  return (
    <View>
        <ImageBackground 
        style={{
            height:300,
            width:'100%'
        }}
        source={require('../../../assets/images/img3.jpg')}
        >
            <SafeAreaView>
                <View style={{flexDirection:'row',justifyContent:'space-between',padding:15}}>

                    <FontAwesome5 name='chevron-left' size={25} color={'white'}/>

                    <View style={{flexDirection:'row'}}>
                        <AntDesign name='sharealt' size={25} color={'white'}/>
                        <View style={{
                            height:28,
                            width:28,
                            borderRadius:28,
                            backgroundColor:'#707070',
                            justifyContent:'center',
                            alignItems:'center',
                            marginLeft:6
                        }}>
                            <AntDesign name='heart' size={15} color={'white'}/>
                        </View>

                    </View>

                </View>
            </SafeAreaView>

        </ImageBackground>
      
    </View>
  )
}

export default ClubDetailsScreen