import { View, Text,StatusBar,StyleSheet } from 'react-native'
import React from 'react'

const Header = ({title}) => {
  return (
    <>
    <StatusBar  StatusBarStyle="dark-content" />
    <View style={styles.container}>

    </View>
    </>
  )
}
const styles = StyleSheet.create({
    container:{
        height:70,
        width:'100%',
        backgroundColor:'#FFFFFF',
        shadowColor:'#FF3FCB',
        elevation:20,
        
    }
})

export default Header