import styled from "styled-components/native";
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
  PositionProps,
  ShadowProps,
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
>`
  ${compose(space, color, layout, flexbox, border, position, shadow)}
`;

export const View = Box;

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
>`
  ${compose(
    space,
    color,
    layout,
    flexbox,
    border,
    position,
    shadow,
    typography,
  )}
`;

export const TouchableOpacity = styled.TouchableOpacity<
  SpaceProps &
    ColorProps &
    LayoutProps &
    FlexProps &
    BorderProps &
    PositionProps &
    ShadowProps
>`
  ${compose(space, color, layout, flexbox, border, position, shadow)}
`;

export const Pressable = styled.Pressable<
  SpaceProps &
    ColorProps &
    LayoutProps &
    FlexProps &
    BorderProps &
    PositionProps &
    ShadowProps
>`
  ${compose(space, color, layout, flexbox, border, position, shadow)}
`;
