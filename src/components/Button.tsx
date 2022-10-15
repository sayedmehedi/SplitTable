import React from "react";
import {useTheme} from "@providers/ThemeProvider";
import {View, Text, TouchableOpacity} from "react-native";
import LinearGradient from "react-native-linear-gradient";

/**
 *
 * @typedef {Object} SolidBtnProps
 * @property {string} title
 * @property {number} width
 * @property {Function} onPress
 * @property {import("react-native").TouchableOpacityProps} touchableOpacityProps
 * @property {import("react-native-linear-gradient").LinearGradientProps} linearGradientProps
 * @property {import("react-native").TextProps} textProps
 */

/**
 *
 * @typedef {Object} OutlinedBtnProps
 * @property {string} title
 * @property {number} width
 * @property {string} color
 * @property {Function} onPress
 * @property {import("react-native").TouchableOpacityProps} touchableOpacityProps
 * @property {import("react-native").TextProps} textProps
 */

/**
 *
 * @typedef {Object} BtnProps
 * @property {string} title
 * @property {number} width
 * @property {Function} onPress
 * @property {import("react-native").TouchableOpacityProps} touchableOpacityProps
 * @property {import("react-native-linear-gradient").LinearGradientProps} linearGradientProps
 * @property {import("react-native").TextProps} textProps
 * @property {("solid" | "outlined")} variant
 * @property {("primary" | "secondary" | String)} color
 */

/**
 * @param {SolidBtnProps} props
 */
const SecondaryButton = ({
  width,
  onPress,
  title,
  touchableOpacityProps = {},
  textProps = {},
  linearGradientProps = {},
}) => {
  const theme = useTheme();
  const defaultStyles = {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.borderRadius,
    marginVertical: 5,
  };

  if (width) {
    defaultStyles.width = width;
  }

  return (
    <TouchableOpacity
      //style={{marginVertical:5}}
      onPress={onPress}
      {...touchableOpacityProps}>
      <LinearGradient
        end={{x: 1, y: 0}}
        start={{x: 0, y: 0}}
        colors={["#00C1FF", "#402B8C"]}
        {...linearGradientProps}
        style={{...defaultStyles, ...(linearGradientProps.style ?? {})}}>
        <Text
          style={{color: theme.colors.white, fontSize: 16, fontWeight: "500"}}
          {...textProps}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

/**
 * @param {SolidBtnProps} props
 */
const PrimaryButton = ({
  width,
  onPress,
  title,
  touchableOpacityProps = {},
  textProps = {},
  linearGradientProps = {},
}) => {
  const theme = useTheme();

  const defaultStyles = {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.borderRadius,
    marginVertical: 5,
  };

  if (width) {
    defaultStyles.width = width;
  }

  return (
    <TouchableOpacity onPress={onPress} {...touchableOpacityProps}>
      <LinearGradient
        end={{x: 1, y: 0}}
        start={{x: 0, y: 0}}
        {...linearGradientProps}
        colors={["#402B8C", "#FF3FCB"]}
        style={{...defaultStyles, ...(linearGradientProps.style ?? {})}}>
        <Text
          style={{color: theme.colors.white, fontSize: 16, fontWeight: "500"}}
          {...textProps}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

/**
 * @param {OutlinedBtnProps} props
 */
const OutlinedButton = ({
  color: propColor = "",
  onPress,
  title,
  touchableOpacityProps = {},
  textProps = {},
}) => {
  const theme = useTheme();
  let color, borderColor;

  if (propColor === "primary") {
    color = theme.colors.primary[900];
    borderColor = theme.colors.primary[900];
  } else if (propColor === "primary") {
    color = theme.colors.secondary[900];
    borderColor = theme.colors.secondary[900];
  } else {
    color = propColor;
    borderColor = propColor;
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          height: 50,
          borderColor,
          borderWidth: 1,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: theme.borderRadius,
        }}>
        <Text style={{color, fontSize: 16, fontWeight: "500"}}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

/**
 * @param {BtnProps} props
 */
const Button = props => {
  if (props.color === "primary" && props.variant === "solid") {
    return <PrimaryButton {...props} />;
  }

  if (props.color === "secondary" && props.variant === "solid") {
    return <SecondaryButton {...props} />;
  }

  return <OutlinedButton {...props} />;
};

export default Button;
