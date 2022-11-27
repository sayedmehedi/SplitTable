import {splitAppTheme} from "@src/theme";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  buttonContainer: {},
  linearGradient: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: splitAppTheme.radii.xl,
    paddingVertical: splitAppTheme.space[4],
  },
});

export default styles;
