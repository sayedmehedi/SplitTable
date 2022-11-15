import React from "react";
import dayjs from "dayjs";
import {splitAppTheme} from "@src/theme";
import useAppToast from "@hooks/useAppToast";
import {Controller, useForm} from "react-hook-form";
import AppGradientButton from "@components/AppGradientButton";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import SplitappSingleSelectCalender from "@components/SplitappCalender";
import {ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {addServerErrors, isResponseResultError} from "@utils/error-handling";
import useGetOwnerClubInfoQuery from "@hooks/clubs/useGetOwnerClubInfoQuery";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import useCreateOwnerClubHolidayMutation from "@hooks/clubs/useCreateOwnerClubHolidayMutation";
import {CompositeScreenProps} from "@react-navigation/native";
import {StackScreenProps} from "@react-navigation/stack";
import {OwnerStackParamList, RootStackParamList} from "@src/navigation";
import {OwnerStackRoutes} from "@constants/routes";

type FormValues = {
  name: string;
  date: Date | null;
};

type Props = CompositeScreenProps<
  StackScreenProps<OwnerStackParamList, typeof OwnerStackRoutes.ADD_HOLIDAY>,
  StackScreenProps<RootStackParamList>
>;

export default function AddHolidayScreen({navigation}: Props) {
  const toast = useAppToast();
  const {data: clubInfoResponse, isLoading: isClubInfoLoading} =
    useGetOwnerClubInfoQuery();

  const {
    mutate: createHoliday,
    isLoading: isCreating,
    data: createResponse,
    error: createError,
    isError: isCreateError,
  } = useCreateOwnerClubHolidayMutation();
  useHandleNonFieldError(createError);
  useHandleResponseResultError(createResponse);

  const {control, handleSubmit, setError} = useForm<FormValues>({
    defaultValues: {
      name: "",
      date: null,
    },
  });

  React.useEffect(() => {
    if (isCreateError) {
      addServerErrors(createError.field_errors, setError);
    }
  }, [setError, isCreateError, createError]);

  const handleAddHoliday = handleSubmit(values => {
    if (clubInfoResponse?.id) {
      createHoliday(
        {
          name: values.name,
          clubId: clubInfoResponse.id,
          date: dayjs(values.date).format("YYYY-MM-DD"),
        },
        {
          onSuccess(data) {
            if (!isResponseResultError(data)) {
              toast.success(data.success);
              navigation.goBack();
            }
          },
        },
      );
    }
  });

  if (isClubInfoLoading) {
    return <Text>Loading...</Text>;
  }

  if (!clubInfoResponse) {
    return <Text>No Data</Text>;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        padding: splitAppTheme.space[6],
      }}>
      <View style={{marginTop: splitAppTheme.space[4]}}>
        <Controller
          name={"date"}
          rules={{
            required: "This field is required",
          }}
          control={control}
          render={({field}) => (
            <SplitappSingleSelectCalender
              onChange={data => {
                field.onChange(data.dateString);
              }}
            />
          )}
        />
      </View>

      <View style={{marginTop: splitAppTheme.space[4]}}>
        <Controller
          rules={{
            required: "This field is required",
          }}
          name={"name"}
          control={control}
          render={({field}) => (
            <View style={styles.SectionStyle}>
              <TextInput
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                placeholder={"Holiday Title"}
                style={{flex: 1, paddingLeft: 20}}
              />
            </View>
          )}
        />
      </View>

      <View style={{marginTop: splitAppTheme.space[5]}}>
        <AppGradientButton
          title="Search"
          color="primary"
          variant={"solid"}
          touchableOpacityProps={{
            disabled: isCreating,
          }}
          onPress={handleAddHoliday}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  SectionStyle: {
    height: 50,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#F4F5F7",
  },
});
