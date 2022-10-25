import {splitAppTheme} from "@src/theme";
import {StyleSheet, Dimensions} from "react-native";

const screenWidth = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  buttonContainer: {},
  linearGradient: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: splitAppTheme.radii.xl,
    paddingVertical: splitAppTheme.space[5],
  },
});

export default styles;
