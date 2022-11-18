import React from "react";
import {splitAppTheme} from "@src/theme";
import LinearGradient from "react-native-linear-gradient";
import {useDimensions} from "@react-native-community/hooks";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {View, Text, TouchableOpacity, Alert, Modal} from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import ActionSheet, {ActionSheetRef} from "react-native-actions-sheet";
import CircularProgress from "react-native-circular-progress-indicator";
import useAddUserImageMutation from "@hooks/user/useAddUserPhotoMutation";
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from "react-native-image-picker";
import {isResponseResultError} from "@utils/error-handling";
import useAppToast from "@hooks/useAppToast";

export default function AddUserPhotoBtn() {
  const toast = useAppToast();
  const actionSheetRef = React.useRef<ActionSheetRef>(null!);
  const {
    window: {height: WINDOW_HEIGHT},
  } = useDimensions();
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const {
    mutate: uploadUserImage,
    isLoading: isUploading,
    error: imageUploadError,
  } = useAddUserImageMutation();
  useHandleNonFieldError(imageUploadError);

  const handleImageResult = (result: ImagePickerResponse) => {
    if (result.errorCode) {
      switch (result.errorCode) {
        case "camera_unavailable":
          Alert.alert("Error", "Your device has no camera");
          break;
        case "permission":
          Alert.alert(
            "Permission Error",
            "Please allow permission to open camera and gallery",
          );
          break;
        default:
          Alert.alert("Error", result.errorMessage);
          break;
      }
    }
    if (
      !result.didCancel &&
      result.assets !== undefined &&
      result.assets.length === 1
    ) {
      uploadUserImage(
        {
          image: {
            uri: result.assets[0].uri!,
            type: result.assets[0].type!,
            name: result.assets[0].fileName!,
          },
          onUploadProgress(sent, total) {
            const progress = Math.round((sent / total) * 100);
            console.log("progress is", progress);
            setUploadProgress(progress);
          },
        },
        {
          onSuccess(data, variables, context) {
            if (!isResponseResultError(data)) {
              setUploadProgress(0);
              toast.success(data.success);
            }

            actionSheetRef.current.hide();
          },
        },
      );
    }
  };

  const handleTakePicture = async () => {
    try {
      // You can also use as a promise without 'callback':
      const result = await launchCamera({
        quality: 0.8,
        maxWidth: 800,
        maxHeight: 800,
        mediaType: "photo",
      });

      handleImageResult(result);
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    }
  };

  const handleSelectImage = async () => {
    try {
      // You can also use as a promise without 'callback':
      const result = await launchImageLibrary({
        quality: 0.8,
        maxWidth: 800,
        maxHeight: 800,
        mediaType: "photo",
      });

      console.log("image selecing result is", result);

      handleImageResult(result);
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    }
  };

  return (
    <View
      style={{
        marginTop: splitAppTheme.space[3],
        position: "absolute",
        bottom: 0,
        width: splitAppTheme.sizes.full,
      }}>
      <View>
        <TouchableOpacity
          onPress={() => {
            if (actionSheetRef.current.isOpen()) {
              actionSheetRef.current.hide();
            } else {
              actionSheetRef.current.show();
            }
          }}>
          <LinearGradient
            end={{x: 0, y: 0}}
            start={{x: 0, y: 1}}
            colors={["#402BBC", "#00C1FF"]}>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                paddingVertical: splitAppTheme.space[3],
              }}>
              <View>
                <FontAwesome5Icon
                  size={30}
                  color={"white"}
                  name={"camera-retro"}
                />
              </View>

              <View style={{marginLeft: splitAppTheme.space[3]}}>
                <Text
                  style={{
                    color: splitAppTheme.colors.white,
                    fontSize: splitAppTheme.fontSizes.lg,
                    fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
                  }}>
                  Add Your Photo
                </Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <ActionSheet ref={actionSheetRef}>
        <TouchableOpacity onPress={handleTakePicture} disabled={isUploading}>
          <View
            style={{
              padding: splitAppTheme.space[3],
            }}>
            <Text>Take photo</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSelectImage} disabled={isUploading}>
          <View
            style={{
              padding: splitAppTheme.space[3],
            }}>
            <Text>Select photo</Text>
          </View>
        </TouchableOpacity>
      </ActionSheet>

      <Modal visible={isUploading} transparent>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            height: WINDOW_HEIGHT,
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.7)",
          }}>
          <View>
            <CircularProgress
              radius={50}
              maxValue={100}
              duration={2000}
              titleColor={"black"}
              value={uploadProgress}
              activeStrokeColor={"white"}
              progressValueColor={"white"}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
