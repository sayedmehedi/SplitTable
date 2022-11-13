import {StyleProp, ViewStyle} from "react-native";

declare module "react-native-range-slider" {
  export interface IRangeSlider {
    minValue?: number;
    maxValue?: number;
    disableRange?: boolean;
    selectedMinimum?: number;
    selectedMaximum?: number;
    tintColor?: string;
    handleColor?: string;
    handleBorderColor?: string;
    handleBorderWidth?: number;
    handleDiameter?: number;
    tintColorBetweenHandles?: string;
    minLabelColour?: string;
    maxLabelColour?: string;
    lineHeight?: number;
    preffix?: string;
    suffix?: string;
    hideLabels?: boolean;
    style?: StyleProp<ViewStyle>;
    onChange: (data: any) => void;
  }

  function RangeSlider(props: IRangeSlider): JSX.Element;

  export default RangeSlider;
}
