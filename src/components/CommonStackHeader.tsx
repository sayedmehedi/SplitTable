import React from "react";
import {splitAppTheme} from "@src/theme";
import Entypo from "react-native-vector-icons/Entypo";
import AppHeaderBackground from "./AppHeaderBackground";
import {StackHeaderProps} from "@react-navigation/stack";
import {
  Header,
  getHeaderTitle,
  HeaderBackButton,
} from "@react-navigation/elements";

const CommonStackHeader = (props: StackHeaderProps) => {
  const {back, route, layout, options, navigation} = props;

  const title = getHeaderTitle(options, route.name);

  return (
    <Header
      title={title}
      layout={layout}
      headerShadowVisible
      headerRight={options.headerRight}
      headerStyle={options.headerStyle}
      headerLeft={
        options.headerLeft
          ? options.headerLeft
          : (props: {
              tintColor?: string | undefined;
              pressColor?: string | undefined;
              pressOpacity?: number | undefined;
              labelVisible?: boolean | undefined;
            }) =>
              back && (
                <HeaderBackButton
                style={{
                  paddingLeft:15
                }}
                  {...props}
                  onPress={navigation.goBack}
                  canGoBack={navigation.canGoBack()}
                  backImage={() => (
                    <Entypo
                      size={25}
                      name={"chevron-thin-left"}
                      color={splitAppTheme.colors.black}
                    />
                  )}
                />
              )
      }
      headerBackground={AppHeaderBackground}
      headerLeftContainerStyle={options.headerLeftContainerStyle}
      headerRightContainerStyle={options.headerRightContainerStyle}
      headerTitleStyle={{
        fontSize: 22,
        fontWeight: "bold",
        color: splitAppTheme.colors.black,
        fontFamily: "SatoshiVariable-Bold",
        ...(typeof options.headerTitleStyle === "object"
          ? (options.headerTitleStyle as any)
          : {}),
      }}
      modal={options.presentation === "modal"}
      headerTitleAlign={options.headerTitleAlign ?? "center"}
    />
  );
};

export default CommonStackHeader;
