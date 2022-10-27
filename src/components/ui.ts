import styled from "styled-components/native";
import RnLinearGradient from "react-native-linear-gradient";
import {ActivityIndicator, TextInputProps} from "react-native";
import {
  space,
  layout,
  color,
  border,
  shadow,
  compose,
  flexbox,
  position,
  typography,
  SpaceProps,
  ColorProps,
  LayoutProps,
  FlexProps,
  BorderProps,
  ShadowProps,
  PositionProps,
  TypographyProps,
} from "styled-system";

export const Box = styled.View<
  SpaceProps &
    ColorProps &
    LayoutProps &
    FlexProps &
    BorderProps &
    PositionProps &
    ShadowProps
>(compose(space, color, layout, flexbox, border, position, shadow));

export const View = Box;

export const Center = styled(Box)`
  align-items: center;
  justify-content: center;
`;

export const Divider = styled(Box)`
  height: 1px;
  background-color: #dddddd;
`;

export const HStack = styled(Box)`
  display: flex;
  flex-direction: row;
`;

export const VStack = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const Text = styled.Text<
  SpaceProps &
    ColorProps &
    LayoutProps &
    FlexProps &
    BorderProps &
    PositionProps &
    ShadowProps &
    TypographyProps
>(compose(space, color, layout, flexbox, border, position, shadow, typography));

export const TouchableOpacity = styled.TouchableOpacity<
  SpaceProps &
    ColorProps &
    LayoutProps &
    FlexProps &
    BorderProps &
    PositionProps &
    ShadowProps
>(compose(space, color, layout, flexbox, border, position, shadow));

export const Pressable = styled.Pressable<
  SpaceProps &
    ColorProps &
    LayoutProps &
    FlexProps &
    BorderProps &
    PositionProps &
    ShadowProps
>(compose(space, color, layout, flexbox, border, position, shadow));

export const Image = styled.Image<
  SpaceProps &
    ColorProps &
    LayoutProps &
    FlexProps &
    BorderProps &
    PositionProps &
    ShadowProps
>(compose(space, color, layout, flexbox, border, position, shadow));

export const ImageBackground = styled.ImageBackground<
  SpaceProps &
    ColorProps &
    LayoutProps &
    FlexProps &
    BorderProps &
    PositionProps &
    ShadowProps
>(compose(space, color, layout, flexbox, border, position, shadow));

export const Spinner = ActivityIndicator;

export const ScrollView = styled.ScrollView<
  SpaceProps &
    ColorProps &
    LayoutProps &
    FlexProps &
    BorderProps &
    PositionProps &
    ShadowProps
>(compose(space, color, layout, flexbox, border, position, shadow));

export const FlatList = styled.FlatList<
  SpaceProps &
    ColorProps &
    LayoutProps &
    FlexProps &
    BorderProps &
    PositionProps &
    ShadowProps
>(compose(space, color, layout, flexbox, border, position, shadow));

export const Input = styled.TextInput<
  TextInputProps &
    SpaceProps &
    ColorProps &
    LayoutProps &
    FlexProps &
    BorderProps &
    PositionProps &
    ShadowProps
>(compose(space, color, layout, flexbox, border, position, shadow));

export const StatusBar = styled.StatusBar``;

export const Modal = styled.Modal``;

export const LinearGradient = styled(RnLinearGradient)<
  SpaceProps &
    ColorProps &
    LayoutProps &
    FlexProps &
    BorderProps &
    PositionProps &
    ShadowProps
>(compose(space, color, layout, flexbox, border, position, shadow));
