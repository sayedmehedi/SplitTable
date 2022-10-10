import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const MenuItemScreen = ({navigation}) => {
  return (
    <View style={{flex:1,backgroundColor:'#FFFFFF',padding:20}}>
        <TouchableOpacity
        onPress={()=>navigation.navigate('addMenuItem')}
        style={styles.addMenuButton}>
            <Text style={{color:'#FF3FCB'}}>+ Add Menu Item</Text>
        </TouchableOpacity>
      
    </View>
  )
}

const styles = StyleSheet.create({
    addMenuButton:{
        height:50,
        width:'100%',
        borderWidth:2,
        borderColor:'#FF3FCB',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5
    }
})

export default MenuItemScreen