import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Button from '../../../components/Button'

const EmailVerificationScreen = ({navigation}) => {
  return (
    <View style={{flex:1,backgroundColor:'#FFFFFF',padding:20}}>
      <View style={{backgroundColor:'white',padding:30,alignItems:'center',marginTop:30}}>
        <Text style={{
          fontFamily:'SatoshiVariable-Bold',
          fontSize:24,
          color:'#00C1FF'
        }}>Verification Code</Text>
        <Text style={{
           fontFamily:'Satoshi-Regular',
           fontSize:14,
           color:'#262B2E',
           marginVertical:10
        }}>An authentication code has been sent to</Text>
        <Text style={{
           fontFamily:'Satoshi-Regular',
           fontSize:16,
           color:'#00C1FF',
        }}>john..@gmail.com</Text>

        <OTPInputView
        style={{ width: '100%', height: 170,backgroundColor:'white'}}
        pinCount={4}
        
        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        // onCodeChanged = {code => { this.setState()}}
        
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={(code => {
          console.log(`Code is $, you are good to go!`)
        })}
      />
      <Text style={{
        fontFamily:'Satoshi-Regular',
        fontSize:14,
        color:'#262B2E',
      }}>I didn't received code<Text style={{color:'#FF3FCB',fontFamily:'SatoshiVariable-Bold'}}> Resend Coee</Text></Text>
      <Text style={{color:'red'}}>1:20 Sec left</Text>
      </View>
       <Button width={'100%'} color={"primary"} variant={"solid"} title={'Verify Now'} 
    onPress={()=>navigation.navigate('locationEnable')}
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
    width: 60,
    height: 60,
    borderWidth: 0,
    borderBottomWidth: 1,
    color:'#FF3FCB',
    backgroundColor:'#F4F5F7',
    borderRadius:30
    
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
    width: 60,
    height: 60,
    borderWidth: 0,
    borderBottomWidth: 1,
    backgroundColor:'#F4F5F7',
    borderRadius:30,
    color:'#FF3FCB'
  },
})


export default EmailVerificationScreen