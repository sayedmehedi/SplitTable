import { View, Text } from 'react-native'
import React from 'react'
import Button from '../../../components/Button'

const EmailVerificationScreen = ({navigation}) => {
  return (
    <View>
       <Button width={290} color={"primary"} variant={"solid"} title={'Verify Now'} 
    onPress={()=>navigation.navigate('locationEnable')}
    />
    </View>
  )
}

export default EmailVerificationScreen