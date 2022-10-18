import {splitAppTheme} from "@src/theme";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  scrollViewContentContainerStyle: {
    backgroundColor: splitAppTheme.colors.white,
  },

  headerContainer: {},

  searchButton: {
    height: 50,
    width: "100%",
    borderRadius: 8,
    paddingLeft: 15,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: splitAppTheme.colors.white,
  },
});

export default styles;
