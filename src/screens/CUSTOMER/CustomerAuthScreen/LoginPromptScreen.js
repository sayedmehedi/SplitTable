import {View, Text, StatusBar, Image, StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';

const LoginPromptScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
      <LinearGradient
        colors={['#DF3BC0', '#472BBE']}
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Image
            source={require('../../../assets/logo-white.png')}
            style={{height: 100, width: 160}}
          />
        </View>

        <View style={{flex: 1, justifyContent: 'space-around'}}>
          <Text>Welcome!</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('signin')}
            style={styles.emailButton}>
            <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
              Continue with email
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.emailButton,
              {
                backgroundColor: 'rgba(255,255,255, 0.3)',
                borderColor: 'rgba(255,255,255, 0.3)',
                marginVertical: 20,
              },
            ]}>
            <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
              Continue with Phone Number
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                height: 1,
                width: 100,
                backgroundColor: 'white',
              }}
            />
            <Text style={{marginHorizontal: 20, color: 'white'}}>OR</Text>
            <View
              style={{
                height: 1,
                width: 100,
                backgroundColor: 'white',
              }}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.socialButtonContainer}></TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButtonContainer}></TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButtonContainer}></TouchableOpacity>
          </View>
          <Text>
            Don't have an account?<Text>Sign Up</Text>
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  emailButton: {
    width: 290,
    height: 50,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
  },
  socialButtonContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});

export default LoginPromptScreen;
