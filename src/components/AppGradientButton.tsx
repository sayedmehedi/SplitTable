import React from "react";
import {
  View,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";
import LinearGradient, {
  LinearGradientProps,
} from "react-native-linear-gradient";
import {splitAppTheme} from "@src/theme";

type SolidBtnProps = {
  title: string;
  loading?: boolean;
  textProps?: TextProps;
  width?: number | string;
  onPress: (e: any) => void;
  linearGradientProps?: LinearGradientProps;
  touchableOpacityProps?: TouchableOpacityProps;
};

type OutlinedBtnProps = {
  title: string;
  color: string;
  loading?: boolean;
  textProps?: TextProps;
  width?: number | string;
  onPress: (e: any) => void;
  touchableOpacityProps?: TouchableOpacityProps;
};

type BtnProps = {
  title: string;
  loading?: boolean;
  textProps?: TextProps;
  width?: number | string;
  onPress: (e: any) => void;
  variant: "solid" | "outlined";
  color: "primary" | "secondary" | string;
  linearGradientProps?: LinearGradientProps;
  touchableOpacityProps?: TouchableOpacityProps;
};

const SecondaryButton = ({
  width,
  title,
  onPress,
  textProps = {},
  loading = false,
  linearGradientProps,
  touchableOpacityProps = {},
}: SolidBtnProps) => {
  let defaultStyles: LinearGradientProps["style"] = {
    height: 50,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  };

  if (!!width) {
    defaultStyles.width = width;
  }

  if (
    linearGradientProps?.style &&
    typeof linearGradientProps?.style === "object"
  ) {
    defaultStyles = {
      ...defaultStyles,
      ...linearGradientProps.style,
    };
  }

  return (
    <TouchableOpacity onPress={onPress} {...touchableOpacityProps}>
      <LinearGradient
        end={{x: 1, y: 0}}
        start={{x: 0, y: 0}}
        {...(linearGradientProps ?? {})}
        colors={["#00C1FF", "#402B8C"]}
        style={defaultStyles}>
        {loading ? (
          <ActivityIndicator size={"small"} />
        ) : (
          <Text
            style={{
              color: splitAppTheme.colors.white,
              fontSize: 16,
              fontWeight: "500",
            }}
            {...textProps}>
            {title}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const PrimaryButton = ({
  width,
  title,
  onPress,
  textProps = {},
  loading = false,
  linearGradientProps,
  touchableOpacityProps = {},
}: SolidBtnProps) => {
  let defaultStyles: LinearGradientProps["style"] = {
    height: 50,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  };

  if (!!width) {
    defaultStyles.width = width;
  }

  if (
    linearGradientProps?.style &&
    typeof linearGradientProps?.style === "object"
  ) {
    defaultStyles = {
      ...defaultStyles,
      ...linearGradientProps.style,
    };
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      {...touchableOpacityProps}
      disabled={loading || touchableOpacityProps.disabled}>
      <LinearGradient
        end={{x: 1, y: 0}}
        start={{x: 0, y: 0}}
        {...linearGradientProps}
        colors={["#402B8C", "#FF3FCB"]}
        style={defaultStyles}>
        {loading ? (
          <ActivityIndicator size={"small"} />
        ) : (
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: splitAppTheme.colors.white,
            }}
            {...textProps}>
            {title}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const OutlinedButton = ({
  title,
  onPress,
  textProps = {},
  loading = false,
  color: propColor = "",
  touchableOpacityProps = {},
}: OutlinedBtnProps) => {
  let color, borderColor;

  if (propColor === "primary") {
    color = splitAppTheme.colors.primary[300];
    borderColor = splitAppTheme.colors.primary[300];
  } else if (propColor === "primary") {
    color = splitAppTheme.colors.secondary[300];
    borderColor = splitAppTheme.colors.secondary[300];
  } else {
    color = propColor;
    borderColor = propColor;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      {...touchableOpacityProps}
      disabled={loading || touchableOpacityProps.disabled}>
      <View
        style={{
          height: 50,
          borderColor,
          borderWidth: 1,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
        }}>
        {loading ? (
          <ActivityIndicator size={"small"} />
        ) : (
          <Text style={{color, fontSize: 16, fontWeight: "500"}} {...textProps}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const AppGradientButton = (props: BtnProps) => {
  if (props.color === "primary" && props.variant === "solid") {
    return <PrimaryButton {...props} />;
  }

  if (props.color === "secondary" && props.variant === "solid") {
    return <SecondaryButton {...props} />;
  }

  return <OutlinedButton {...props} />;
};

export default AppGradientButton;
