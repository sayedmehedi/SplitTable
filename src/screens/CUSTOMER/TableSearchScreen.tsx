import dayjs from "dayjs";
import React from "react";
import {TableType} from "@src/models";
import {splitAppTheme} from "@src/theme";
import Ripple from "react-native-material-ripple";
import {Controller, useForm} from "react-hook-form";
import SplitappSingleSelectCalender from "@components/SplitappCalender";
import {useDimensions} from "@react-native-community/hooks";
import {StackNavigationProp} from "@react-navigation/stack";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import {Text, View, ScrollView, StyleSheet} from "react-native";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import useGetLocationsQuery from "@hooks/clubs/useGetLocationsQuery";
import {AutocompleteDropdown} from "react-native-autocomplete-dropdown";
import {
  CustomerStackRoutes,
  CustomerMainBottomTabRoutes,
} from "@constants/routes";
import {useNavigation, CompositeNavigationProp} from "@react-navigation/native";

import {
  RootStackParamList,
  CustomerStackParamList,
  CustomerBottomTabParamList,
} from "@src/navigation";
import AppGradientButton from "@components/AppGradientButton";
import {TableListTypes} from "@constants/club";

type NavigationProps = CompositeNavigationProp<
  StackNavigationProp<CustomerStackParamList>,
  StackNavigationProp<RootStackParamList>
>;

type FormValues = {
  date: string | null;
  location_id: string | null;
  table_type: TableType | null;
  distance: [number, number] | null;
};

const TableSearchScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const {
    window: {width: WINDOW_WIDTH},
  } = useDimensions();

  const {
    error: locationsError,
    data: locationsResponse,
    isLoading: isLocationsLoading,
  } = useGetLocationsQuery();
  useHandleNonFieldError(locationsError);

  const {control, handleSubmit} = useForm<FormValues>({
    defaultValues: {
      date: null,
      distance: null,
      table_type: null,
      location_id: null,
    },
  });

  const locationList = React.useMemo(() => {
    return (
      locationsResponse?.items?.map(location => ({
        id: location.id.toString(),
        title: location.location,
      })) ?? []
    );
  }, [locationsResponse?.items]);

  const handleSearch = handleSubmit(values => {
    navigation.navigate(CustomerStackRoutes.TABLE_LIST, {
      headerTitle: "Search Result",
      searchTerm: {
        date: values.date ?? undefined,
        distance: values.distance ?? undefined,
        tableType: values.table_type ?? undefined,
        locationId:
          values.location_id !== null
            ? parseInt(values.location_id)
            : undefined,
      },
      listType: TableListTypes.SEARCH_RESULT,
    });
  });

  return (
    <ScrollView
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: splitAppTheme.colors.white}}
      contentContainerStyle={{
        padding: splitAppTheme.space[6],
      }}>
      <View
        style={{
          flex: 1,
          height: splitAppTheme.sizes.full,
        }}>
        <Controller
          name={"location_id"}
          control={control}
          render={({field}) => (
            <View>
              <AutocompleteDropdown
                inputHeight={50}
                dataSet={locationList}
                loading={isLocationsLoading}
                containerStyle={{flexGrow: 1, flexShrink: 1}}
                onSelectItem={item => {
                  field.onChange(item?.id ?? "");
                }}
                textInputProps={{
                  autoCorrect: false,
                  autoCapitalize: "none",
                  placeholder: "Club Location",
                  placeholderTextColor: splitAppTheme.colors.black,
                  style: {
                    color: splitAppTheme.colors.black,
                    borderRadius: splitAppTheme.radii.xl,
                  },
                }}
                rightButtonsContainerStyle={{
                  right: 8,
                  height: 30,

                  alignSelf: "center",
                }}
                inputContainerStyle={{
                  backgroundColor: splitAppTheme.colors.white,
                  borderRadius: splitAppTheme.radii.xl,
                  borderWidth: splitAppTheme.borderWidths[2],
                  borderColor: splitAppTheme.colors.gray[300],
                }}
              />
            </View>
          )}
        />

        <Controller
          name={"table_type"}
          control={control}
          render={({field}) => (
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: splitAppTheme.space[6],
              }}>
              <View style={{marginRight: splitAppTheme.space[4]}}>
                <Text
                  style={{
                    fontSize: splitAppTheme.fontSizes.md,
                    fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
                  }}>
                  Type
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                <View style={{flex: 1}}>
                  <Ripple onPress={() => field.onChange("booked")}>
                    <View
                      style={
                        field.value === "booked"
                          ? styles.tableTypeBtnContainerSelected
                          : styles.tableTypeBtnContainer
                      }>
                      <Text
                        style={
                          field.value === "booked"
                            ? styles.tableTypeBtnTextSelected
                            : styles.tableTypeBtnText
                        }>
                        Book Table
                      </Text>
                    </View>
                  </Ripple>
                </View>

                <View
                  style={{
                    flex: 1,
                    marginLeft: splitAppTheme.space[3],
                  }}>
                  <Ripple onPress={() => field.onChange("split")}>
                    <View
                      style={
                        field.value === "split"
                          ? styles.tableTypeBtnContainerSelected
                          : styles.tableTypeBtnContainer
                      }>
                      <Text
                        style={
                          field.value === "split"
                            ? styles.tableTypeBtnTextSelected
                            : styles.tableTypeBtnText
                        }>
                        Split Table
                      </Text>
                    </View>
                  </Ripple>
                </View>
              </View>
            </View>
          )}
        />

        <Controller
          control={control}
          name={"distance"}
          render={({field}) => (
            <View>
              <Text
                style={{
                  fontSize: splitAppTheme.fontSizes.md,
                  fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
                }}>
                Distance
              </Text>

              <MultiSlider
                min={0}
                step={5}
                max={100}
                snapped
                sliderLength={WINDOW_WIDTH - splitAppTheme.space[6] * 2}
                containerStyle={{
                  alignItems: "center",
                }}
                trackStyle={{
                  height: splitAppTheme.sizes[1],
                }}
                selectedStyle={{
                  backgroundColor: splitAppTheme.colors.primary[300],
                }}
                markerStyle={{
                  width: splitAppTheme.sizes[4],
                  height: splitAppTheme.sizes[4],
                  backgroundColor: splitAppTheme.colors.primary[300],
                }}
                onValuesChangeFinish={rangeData => {
                  console.log("range data", rangeData);
                  field.onChange(rangeData);
                }}
                values={field.value !== null ? field.value : [0, 100]}
              />

              {field.value !== null && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}>
                  <View>
                    <Text>Min {field.value[0]} mi</Text>
                  </View>

                  <View>
                    <Text>Max {field.value[1]} mi</Text>
                  </View>
                </View>
              )}
            </View>
          )}
        />

        <View style={{marginTop: splitAppTheme.space[6]}}>
          <Text
            style={{
              fontSize: splitAppTheme.fontSizes.md,
              marginBottom: splitAppTheme.space[3],
              fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
            }}>
            Choose date
          </Text>

          <View style={{marginTop: splitAppTheme.space[4]}}>
            <Controller
              name={"date"}
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
        </View>

        <View style={{marginTop: splitAppTheme.space[5]}}>
          <AppGradientButton
            title="Search"
            color="primary"
            variant={"solid"}
            onPress={handleSearch}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tableTypeBtnContainer: {
    padding: splitAppTheme.space[2],
    borderRadius: splitAppTheme.radii.lg,
    borderWidth: splitAppTheme.borderWidths[2],
    borderColor: splitAppTheme.colors.primary[300],
  },
  tableTypeBtnText: {
    textAlign: "center",
    fontSize: splitAppTheme.fontSizes.md,
    color: splitAppTheme.colors.primary[300],
    fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
  },

  tableTypeBtnContainerSelected: {
    padding: splitAppTheme.space[2],
    borderRadius: splitAppTheme.radii.lg,
    borderWidth: splitAppTheme.borderWidths[2],
    backgroundColor: splitAppTheme.colors.primary[300],
    borderColor: splitAppTheme.colors.primary[300],
  },
  tableTypeBtnTextSelected: {
    textAlign: "center",
    color: splitAppTheme.colors.white,
    fontSize: splitAppTheme.fontSizes.md,
    fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
  },
});

export default TableSearchScreen;
