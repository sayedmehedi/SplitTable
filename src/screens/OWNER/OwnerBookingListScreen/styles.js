import { StyleSheet,Dimensions } from "react-native";

const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    buttonContainer:{
        width:screenWidth/2-20,
        height:50,
        

    }
})

export default styles;