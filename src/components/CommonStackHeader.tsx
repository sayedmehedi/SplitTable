import React from "react";
import {splitAppTheme} from "@src/theme";
import Entypo from "react-native-vector-icons/Entypo";
import {StackHeaderProps} from "@react-navigation/stack";
import {
  Header,
  getHeaderTitle,
  HeaderBackground,
  HeaderBackButton,
} from "@react-navigation/elements";

const headerBackground = () => (
  <HeaderBackground
    style={{
      elevation: 20,
      backgroundColor: splitAppTheme.colors.white,
      shadowColor: splitAppTheme.colors.primary[400],
    }}
  />
);

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
                  {...props}
                  onPress={navigation.goBack}
                  canGoBack={navigation.canGoBack()}
                  backImage={() => (
                    <Entypo
                      size={20}
                      name={"chevron-thin-left"}
                      color={splitAppTheme.colors.black}
                    />
                  )}
                />
              )
      }
      headerBackground={headerBackground}
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
