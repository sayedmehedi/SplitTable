import {StyleSheet, Dimensions} from "react-native";

const screenWidth = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  buttonContainer: {
    height: 50,
    width: screenWidth / 2 - 20,
  },
});

export default styles;
