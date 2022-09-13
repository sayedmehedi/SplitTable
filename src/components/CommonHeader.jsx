import React from 'react';
import {useTheme} from '../Providers/ThemeProvider';
import Entypo from "react-native-vector-icons/Entypo"
import {
  Header,
  getHeaderTitle,
  HeaderBackground,
  HeaderBackButton,
} from '@react-navigation/elements';

/**
 * @param {import("@react-navigation/stack").StackHeaderProps} props
 */
const CommonHeader = props => {
  const theme = useTheme();

  const {
    back,
    route,
    layout,
    options,
    progress,
    navigation,
    styleInterpolator,
  } = props;

  const title = getHeaderTitle(options, route.name);

  return (
    <Header
      title={title}
      layout={layout}
      headerShadowVisible
      headerTitleAlign={options.headerTitleAlign ?? "center"}
      headerTitleStyle={{
        fontSize: 22,
        fontWeight: '700',
        color: theme.colors.black,
        ...options.headerTitleStyle
      }}
      modal={options.presentation === 'modal'}
      headerLeft={(props) => {
        return back && (
        <HeaderBackButton  
          {...props}
         
          canGoBack={navigation.canGoBack()} 
          onPress={navigation.goBack}
          backImage={() => <Entypo size={30} name={"chevron-thin-left"} color={theme.colors.black}/>}
        />
        )
      }}
      headerBackground={() => (
        <HeaderBackground style={{
          elevation: 20,
          backgroundColor: theme.colors.white, 
          shadowColor: theme.colors.primary[900],
        }} />
      )}

      // options={{
      //   headerStyle: {},
      //   headerTitleAlign: 'center',
      //   headerTitleStyle: {
      //     fontSize: 22,
      //     fontWeight: '700',
      //     color: 'red',
      //   },
      //   headerLeftContainerStyle: {},
      //   headerRightContainerStyle: {

      //   },
      //   headerShadowVisible: true,
      //   headerTitleContainerStyle: {

      //   },
      //   headerBackgroundContainerStyle: {

      //   },
      //   headerTintColor: theme.colors.primary[900],
      //   headerPressColor: theme.colors.primary[900],
      //   headerStatusBarHeight: 80,
      
      //   ...props.options,
      // }}
    />
  );
};

export default CommonHeader;
