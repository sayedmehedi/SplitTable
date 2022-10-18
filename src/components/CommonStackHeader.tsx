import React from "react";
import {useTheme} from "native-base";
import Entypo from "react-native-vector-icons/Entypo";
import {StackHeaderProps} from "@react-navigation/stack";
import {
  Header,
  getHeaderTitle,
  HeaderBackground,
  HeaderBackButton,
} from "@react-navigation/elements";

const CommonStackHeader = (props: StackHeaderProps) => {
  const theme = useTheme();

  const {back, route, layout, options, navigation} = props;

  const title = getHeaderTitle(options, route.name);

  const headerBackground = React.useCallback(
    () => (
      <HeaderBackground
        style={{
          elevation: 20,
          backgroundColor: theme.colors.white,
          shadowColor: theme.colors.primary[900],
        }}
      />
    ),
    [theme.colors.white, theme.colors.primary[900]],
  );

  const headerLeft = React.useCallback(
    (props: {
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
              size={30}
              name={"chevron-thin-left"}
              color={theme.colors.black}
            />
          )}
        />
      ),
    [navigation.goBack, navigation.canGoBack, theme.colors.black, back],
  );

  const headerTitleStyle = React.useMemo(() => {
    return {
      fontSize: 22,
      fontWeight: "bold",
      color: theme.colors.black,
      fontFamily: "SatoshiVariable-Bold",
      ...(typeof options.headerTitleStyle === "object"
        ? (options.headerTitleStyle as any)
        : {}),
    };
  }, [theme.colors.black, options.headerTitleStyle]);

  return (
    <Header
      title={title}
      layout={layout}
      headerShadowVisible
      headerLeft={headerLeft}
      headerBackground={headerBackground}
      headerTitleStyle={headerTitleStyle}
      modal={options.presentation === "modal"}
      headerTitleAlign={options.headerTitleAlign ?? "center"}
    />
  );
};

export default CommonStackHeader;
