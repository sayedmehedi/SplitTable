import React from "react";
import {splitAppTheme} from "@src/theme";
import useAppToast from "@hooks/useAppToast";
import {isResponseResultError} from "@utils/error-handling";
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from "react-native-image-picker";
import {useDimensions} from "@react-native-community/hooks";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import ActionSheet, {ActionSheetRef} from "react-native-actions-sheet";
import CircularProgress from "react-native-circular-progress-indicator";
import useUpdateProfileMutation from "@hooks/user/useUpdateProfileMutation";
import {View, TouchableOpacity, Image, Alert, Text, Modal} from "react-native";

export default function ProfileImageUploader({
  disabled = false,
  imageUrl,
}: {
  disabled?: boolean;
  imageUrl: string;
}) {
  const toast = useAppToast();
  const actionSheetRef = React.useRef<ActionSheetRef>(null!);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const {
    window: {height: WINDOW_HEIGHT},
  } = useDimensions();

  const {
    error: updateError,
    mutate: updateProfile,
    isLoading: isUpdating,
  } = useUpdateProfileMutation();
  useHandleNonFieldError(updateError);

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
      updateProfile(
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
          onSuccess(data) {
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
    <View>
      <TouchableOpacity
        disabled={disabled || isUpdating}
        onPress={() => {
          if (actionSheetRef.current.isOpen()) {
            actionSheetRef.current.hide();
          } else {
            actionSheetRef.current.show();
          }
        }}
        style={{
          padding: 5,
          width: 155,
          height: 155,
          borderRadius: 78,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}>
        <Image
          style={{height: 150, width: 150, borderRadius: 75}}
          source={{
            uri: imageUrl,
          }}
        />
      </TouchableOpacity>

      <ActionSheet ref={actionSheetRef}>
        <View
          style={{
            paddingTop: splitAppTheme.space[3],
          }}>
          <TouchableOpacity onPress={handleTakePicture}>
            <View
              style={{
                padding: splitAppTheme.space[3],
              }}>
              <Text
                style={{
                  fontSize: splitAppTheme.fontSizes.md,
                  fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
                }}>
                Take photo
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSelectImage}>
            <View
              style={{
                padding: splitAppTheme.space[3],
              }}>
              <Text
                style={{
                  fontSize: splitAppTheme.fontSizes.md,
                  fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
                }}>
                Select photo
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ActionSheet>

      <Modal visible={isUpdating} transparent>
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
