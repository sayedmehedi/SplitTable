import { View, Text } from 'react-native'
import React from 'react'
import Button from '../../../components/Button'

const LocationEnablePromptScreen = ({navigation}) => {
  return (
    <View>
      <Button width={290} color={"primary"} variant={"solid"} title={'Enable Location'} 
    onPress={()=>navigation.navigate('customerMainTab')}
    />
    </View>
  )
}

export default LocationEnablePromptScreen