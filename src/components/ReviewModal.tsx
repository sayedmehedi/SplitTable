import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {splitAppTheme} from "@src/theme";
import useAppToast from "@hooks/useAppToast";
import Toast from "react-native-toast-message";
import {AirbnbRating} from "react-native-ratings";
import {isResponseResultError} from "@utils/error-handling";
import AntDesign from "react-native-vector-icons/AntDesign";
import AppGradientButton from "@components/AppGradientButton";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import useAddClubReviewMutation from "@hooks/clubs/useAddClubReviewMutation";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";

type Props = {
  open: boolean;
  reviewerId: number;
  onClose: () => void;
};

export default function ReviewModal({onClose, open, reviewerId}: Props) {
  const toast = useAppToast();
  const [review, setReview] = React.useState("");
  const [rating, setRating] = React.useState<number>(1);
  const [fieldErrors, setFieldErrors] = React.useState<string[]>([]);

  const {
    mutate: addClubReview,
    data: clubReviewResponse,
    error: addClubReviewError,
    isError: isAddClubReviewError,
    isLoading: isAddingClubReview,
  } = useAddClubReviewMutation();
  useHandleNonFieldError(addClubReviewError);
  useHandleResponseResultError(clubReviewResponse);

  React.useEffect(() => {
    if (isAddClubReviewError) {
      setFieldErrors(Object.values(addClubReviewError.field_errors));
    }
  }, [isAddClubReviewError]);

  const handleSubmitReview = () => {
    if (review === "") {
      toast.error("Please write review");
      return;
    }

    addClubReview(
      {
        reviewerId,
        review,
        rating,
      },
      {
        onSuccess(data) {
          if (!isResponseResultError(data)) {
            toast.success(data.success);
            onClose();
          }
        },
      },
    );
  };

  return (
    <>
      <Modal visible={open} transparent onRequestClose={() => onClose()}>
        <View
          style={{
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
            height: splitAppTheme.sizes.full,
            backgroundColor: "rgba(0,0,0,0.7)",
          }}>
          <View
            style={{
              top: 0,
              position: "absolute",
              width: splitAppTheme.sizes.full,
            }}>
            <Pressable
              onPress={() => onClose()}
              style={{
                marginLeft: "auto",
                marginTop: splitAppTheme.space[6],
                marginRight: splitAppTheme.space[6],
              }}>
              <AntDesign name={"close"} size={33} color={"white"} />
            </Pressable>
          </View>

          <View
            style={{
              justifyContent: "center",
              width: splitAppTheme.sizes.full,
            }}>
            <View
              style={{
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto",
                justifyContent: "center",
                padding: splitAppTheme.space[4],
                backgroundColor: splitAppTheme.colors.white,
              }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: splitAppTheme.fontSizes.xl,
                  fontFamily: splitAppTheme.fontConfig.Sathoshi[700].normal,
                }}>
                Add Your Review
              </Text>

              <View style={{marginVertical: splitAppTheme.space[3]}}>
                <AirbnbRating
                  size={25}
                  showRating
                  reviewSize={15}
                  defaultRating={1}
                  onFinishRating={setRating}
                  ratingContainerStyle={{flexDirection: "row-reverse"}}
                />
              </View>

              <View>
                <TextInput
                  multiline
                  numberOfLines={5}
                  onFocus={() => {
                    setFieldErrors([]);
                  }}
                  onChangeText={setReview}
                  textAlignVertical={"top"}
                  placeholder={"Write Review"}
                  style={{
                    borderRadius: splitAppTheme.radii.lg,
                    paddingVertical: splitAppTheme.space[4],
                    paddingHorizontal: splitAppTheme.space[5],
                    borderWidth: splitAppTheme.borderWidths[1],
                  }}
                />

                {fieldErrors.map((errorMsg, i) => (
                  <Text
                    key={i}
                    style={{
                      textAlign: "center",
                      marginTop: splitAppTheme.space[2],
                      fontSize: splitAppTheme.fontSizes.xs,
                      color: splitAppTheme.colors.red[500],
                    }}>
                    {errorMsg}
                  </Text>
                ))}
              </View>

              <View style={{marginVertical: splitAppTheme.space[4]}}>
                <AppGradientButton
                  color={"primary"}
                  variant={"solid"}
                  title={"Submit"}
                  loading={isAddingClubReview}
                  onPress={handleSubmitReview}
                />
              </View>

              <View>
                <TouchableOpacity onPress={() => onClose()}>
                  <Text
                    style={{
                      textAlign: "center",
                      textDecorationLine: "underline",
                      fontSize: splitAppTheme.fontSizes.md,
                    }}>
                    No, I write it later
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <Toast />
      </Modal>
    </>
  );
}
