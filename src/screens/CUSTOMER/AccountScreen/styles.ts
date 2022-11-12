import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 0.3,
    borderBottomColor: "#707070",
  },
  editText: {
    fontSize: 13,
    color: "#023047",
    fontFamily: "Inter-Medium",
    textDecorationLine: "underline",
  },
  offerButton: {
    width: 110,
    height: 35,
    backgroundColor: "#51B764",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  socialMediaContainer: {
    height: 35,
    width: 35,
    borderRadius: 40,
    backgroundColor: "#D0D0D0",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 3,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    padding: 15,
    width: "96%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  modalInput: {
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 20,
    textAlign: "center",
    borderColor: "#C9C9C9",
  },
  updateButton: {
    width: 270,
    height: 50,
    backgroundColor: "red",
    borderRadius: 50,
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
  },
});

export default styles;
