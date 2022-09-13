import { View, Text } from 'react-native'
import React from 'react'
import Button from '../../../components/Button'

const EmailLoginScreen = ({navigation}) => {
  return (
    <Button width={290} color={"primary"} variant={"solid"} title={'Sign in'} 
    onPress={()=>navigation.navigate('emailVerification')}
    />
    
       
      
    
  )
}

export default EmailLoginScreen