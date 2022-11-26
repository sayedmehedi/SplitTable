import dayjs from "dayjs";
import React from "react";
import {TableType} from "@src/models";
import {splitAppTheme} from "@src/theme";
import {AppTableListTypes} from "@constants/table";
import Ripple from "react-native-material-ripple";
import {Controller, useForm} from "react-hook-form";
import {CustomerStackRoutes} from "@constants/routes";
import {StackScreenProps} from "@react-navigation/stack";
import {useDimensions} from "@react-native-community/hooks";
import {CompositeScreenProps} from "@react-navigation/native";
import AppGradientButton from "@components/AppGradientButton";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import useGetLocationsQuery from "@hooks/clubs/useGetLocationsQuery";
import {AutocompleteDropdown} from "react-native-autocomplete-dropdown";
import SplitappSingleSelectCalender from "@components/SplitappCalender";
import {RootStackParamList, CustomerStackParamList} from "@src/navigation";
import useGetClubsBySearchTermQuery from "@hooks/clubs/useGetClubsBySearchTermQuery";
import useDebouncedState from "@hooks/useDebouncedState";
import {TextInput, TouchableOpacity} from "react-native-gesture-handler";
import FastImage from "react-native-fast-image";
import GenericListEmpty from "@components/GenericListEmpty";
import Entypo from "react-native-vector-icons/Entypo";
import {ScrollViewListItem} from "@components/ScrollViewListItem";

type FormValues = {
  date: string | null;
  location_id: string | null;
  table_type: TableType | null;
  distance: [number, number] | null;
};

type Props = CompositeScreenProps<
  StackScreenProps<
    CustomerStackParamList,
    typeof CustomerStackRoutes.TABLE_SEARCH
  >,
  StackScreenProps<RootStackParamList>
>;

const TableSearchScreen = ({route, navigation}: Props) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [dbncdSearchTerm] = useDebouncedState(searchTerm, 500);
  const {
    error: resourcesError,
    data: resourcesResponse,
    isLoading: isResourcesLoading,
  } = useGetClubsBySearchTermQuery({
    search: dbncdSearchTerm,
  });
  useHandleNonFieldError(resourcesError);

  const resourcesList = React.useMemo(() => {
    return resourcesResponse?.clubs?.data ?? [];
  }, [JSON.stringify(resourcesResponse?.clubs ?? {})]);

  return (
    <ScrollView
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: splitAppTheme.colors.white}}
      contentContainerStyle={{
        padding: splitAppTheme.space[6],
      }}>
      <View>
        <TextInput
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder={"Search by keyword"}
          style={{
            height: 50,
            padding: splitAppTheme.space[3],
            fontSize: splitAppTheme.fontSizes.lg,
            borderRadius: splitAppTheme.radii["lg"],
            borderWidth: splitAppTheme.borderWidths[2],
            borderColor: splitAppTheme.colors.secondary[500],
            fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
          }}
        />

        <View>
          {isResourcesLoading ? (
            <View
              style={{
                padding: splitAppTheme.space[3],
              }}>
              <ActivityIndicator size={"small"} />
            </View>
          ) : null}

          {dbncdSearchTerm !== "" ? (
            resourcesList.map(resource => (
              <Ripple
                style={{
                  marginTop: splitAppTheme.space[3],
                }}
                key={resource.id}
                onPress={() => {
                  navigation.navigate(CustomerStackRoutes.TABLE_LIST, {
                    headerTitle: resource.name,
                    listType: AppTableListTypes.BY_CLUB_ID,
                    searchTerm: {
                      clubId: resource.id,
                    },
                  });
                }}>
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    paddingBottom: splitAppTheme.space[3],
                    borderBottomWidth: splitAppTheme.borderWidths[1],
                    borderBottomColor: splitAppTheme.colors.coolGray[400],
                  }}>
                  <FastImage
                    source={{
                      uri: resource.image,
                    }}
                    style={{
                      height: 60,
                      width: 60,
                      borderRadius: splitAppTheme.radii.lg,
                    }}
                  />

                  <View
                    style={{
                      flex: 1,
                      height: splitAppTheme.sizes.full,
                      marginLeft: splitAppTheme.space[3],
                    }}>
                    <ScrollViewListItem
                      style={{
                        marginBottom: splitAppTheme.space[1],
                        fontSize: splitAppTheme.fontSizes.lg,
                        fontFamily: splitAppTheme.fontConfig.Roboto[400].normal,
                      }}
                      highlight={dbncdSearchTerm}
                      title={resource.name}
                    />

                    {/* <Text
                      >
                      {resource.name}
                    </Text> */}

                    <ScrollViewListItem
                      style={{
                        fontSize: splitAppTheme.fontSizes.sm,
                        fontFamily: splitAppTheme.fontConfig.Roboto[400].normal,
                      }}
                      highlight={dbncdSearchTerm}
                      title={resource.location}
                    />

                    {/* <Text
                      style={{
                        fontSize: splitAppTheme.fontSizes.sm,
                        fontFamily: splitAppTheme.fontConfig.Roboto[400].normal,
                      }}>
                      {resource.location}
                    </Text> */}
                  </View>

                  <View>
                    <Entypo name={"chevron-right"} size={30} />
                  </View>
                </View>
              </Ripple>
            ))
          ) : (
            <GenericListEmpty height={300} width={300} />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

// const TableSearchScreen = ({route, navigation}: Props) => {
//   const {
//     window: {width: WINDOW_WIDTH},
//   } = useDimensions();

//   const {
//     error: locationsError,
//     data: locationsResponse,
//     isLoading: isLocationsLoading,
//   } = useGetLocationsQuery();
//   useHandleNonFieldError(locationsError);

//   const {control, handleSubmit, setValue} = useForm<FormValues>({
//     defaultValues: {
//       date: null,
//       distance: null,
//       table_type: null,
//       location_id: null,
//     },
//   });

//   React.useEffect(() => {
//     if (route.params?.initialSearchTerms) {
//       const {date, distance, tableType} = route.params.initialSearchTerms;

//       if (date !== undefined) {
//         setValue("date", date);
//       }

//       if (distance !== undefined) {
//         setValue("distance", distance);
//       }

//       if (tableType !== undefined) {
//         setValue("table_type", tableType);
//       }
//     }
//   }, [
//     setValue,
//     route.params?.initialSearchTerms?.date,
//     route.params?.initialSearchTerms?.tableType,
//     route.params?.initialSearchTerms?.locationId,
//     route.params?.initialSearchTerms?.distance?.[0],
//     route.params?.initialSearchTerms?.distance?.[1],
//   ]);

//   const locationList = React.useMemo(() => {
//     return (
//       locationsResponse?.items?.map(location => ({
//         id: location.id.toString(),
//         title: location.location,
//       })) ?? []
//     );
//   }, [locationsResponse?.items]);

//   const handleSearch = handleSubmit(values => {
//     let locationIdInt = null;

//     if (values.location_id !== null) {
//       locationIdInt = parseInt(values.location_id);
//     }

//     if (locationIdInt !== null && isNaN(locationIdInt)) {
//       locationIdInt = null;
//     }

//     if (route.params?.listType !== undefined) {
//       const params =
//         route.params.listType === AppTableListTypes.BY_CLUB_ID
//           ? {
//               headerTitle: route.params.listScreenHeaderTitle,
//               searchTerm: {
//                 date: values.date ?? undefined,
//                 distance: values.distance ?? undefined,
//                 tableType: values.table_type ?? undefined,
//                 clubId: route.params.initialSearchTerms.clubId,
//                 locationId: locationIdInt !== null ? locationIdInt : undefined,
//               },
//               listType: route.params.listType,
//             }
//           : route.params.listType === AppTableListTypes.BY_LOCATION
//           ? {
//               headerTitle: route.params.listScreenHeaderTitle,
//               searchTerm: {
//                 date: values.date ?? undefined,
//                 distance: values.distance ?? undefined,
//                 tableType: values.table_type ?? undefined,
//                 clubId: route.params.initialSearchTerms?.clubId,
//                 locationId:
//                   locationIdInt !== null
//                     ? locationIdInt
//                     : route.params.initialSearchTerms.locationId,
//               },
//               listType: route.params.listType,
//             }
//           : {
//               headerTitle: route.params.listScreenHeaderTitle,
//               searchTerm: {
//                 date: values.date ?? undefined,
//                 distance: values.distance ?? undefined,
//                 tableType: values.table_type ?? undefined,
//                 clubId: route.params.initialSearchTerms?.clubId,
//                 locationId: locationIdInt !== null ? locationIdInt : undefined,
//               },
//               listType: route.params.listType,
//             };

//       navigation.navigate(CustomerStackRoutes.TABLE_LIST, params);
//     } else {
//       navigation.navigate(CustomerStackRoutes.TABLE_LIST, {
//         headerTitle: "Search Result",
//         searchTerm: {
//           date: values.date ?? undefined,
//           distance: values.distance ?? undefined,
//           tableType: values.table_type ?? undefined,
//           locationId: locationIdInt !== null ? locationIdInt : undefined,
//         },
//         listType: AppTableListTypes.SEARCH_RESULT,
//       });
//     }
//   });

//   return (
//     <ScrollView
//       nestedScrollEnabled
//       showsVerticalScrollIndicator={false}
//       style={{backgroundColor: splitAppTheme.colors.white}}
//       contentContainerStyle={{
//         padding: splitAppTheme.space[6],
//       }}>
//       <View
//         style={{
//           flex: 1,
//           height: splitAppTheme.sizes.full,
//         }}>
//         <Controller
//           name={"location_id"}
//           control={control}
//           render={({field}) => (
//             <View style={Platform.select({ios: {zIndex: 10}})}>
//               <AutocompleteDropdown
//                 inputHeight={50}
//                 dataSet={locationList}
//                 loading={isLocationsLoading}
//                 containerStyle={{flexGrow: 1, flexShrink: 1}}
//                 initialValue={route.params?.initialSearchTerms?.locationId?.toString()}
//                 onSelectItem={item => {
//                   field.onChange(item?.id ?? "");
//                 }}
//                 textInputProps={{
//                   autoCorrect: false,
//                   autoCapitalize: "none",
//                   placeholder: "Club Location",
//                   placeholderTextColor: splitAppTheme.colors.black,
//                   style: {
//                     color: splitAppTheme.colors.black,
//                     borderRadius: splitAppTheme.radii.xl,
//                   },
//                 }}
//                 rightButtonsContainerStyle={{
//                   right: 8,
//                   height: 30,

//                   alignSelf: "center",
//                 }}
//                 inputContainerStyle={{
//                   backgroundColor: splitAppTheme.colors.white,
//                   borderRadius: splitAppTheme.radii.xl,
//                   borderWidth: splitAppTheme.borderWidths[2],
//                   borderColor: splitAppTheme.colors.gray[300],
//                 }}
//               />
//             </View>
//           )}
//         />

//         <Controller
//           name={"table_type"}
//           control={control}
//           render={({field}) => (
//             <View
//               style={{
//                 width: "100%",
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 marginVertical: splitAppTheme.space[6],
//               }}>
//               <View style={{marginRight: splitAppTheme.space[4]}}>
//                 <Text
//                   style={{
//                     fontSize: splitAppTheme.fontSizes.md,
//                     fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
//                   }}>
//                   Type
//                 </Text>
//               </View>

//               <View
//                 style={{
//                   flex: 1,
//                   width: "100%",
//                   flexDirection: "row",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                 }}>
//                 <View style={{flex: 1}}>
//                   <Ripple onPress={() => field.onChange("booked")}>
//                     <View
//                       style={
//                         field.value === "booked"
//                           ? styles.tableTypeBtnContainerSelected
//                           : styles.tableTypeBtnContainer
//                       }>
//                       <Text
//                         style={
//                           field.value === "booked"
//                             ? styles.tableTypeBtnTextSelected
//                             : styles.tableTypeBtnText
//                         }>
//                         Book Table
//                       </Text>
//                     </View>
//                   </Ripple>
//                 </View>

//                 <View
//                   style={{
//                     flex: 1,
//                     marginLeft: splitAppTheme.space[3],
//                   }}>
//                   <Ripple onPress={() => field.onChange("split")}>
//                     <View
//                       style={
//                         field.value === "split"
//                           ? styles.tableTypeBtnContainerSelected
//                           : styles.tableTypeBtnContainer
//                       }>
//                       <Text
//                         style={
//                           field.value === "split"
//                             ? styles.tableTypeBtnTextSelected
//                             : styles.tableTypeBtnText
//                         }>
//                         Split Table
//                       </Text>
//                     </View>
//                   </Ripple>
//                 </View>
//               </View>
//             </View>
//           )}
//         />

//         <Controller
//           control={control}
//           name={"distance"}
//           render={({field}) => (
//             <View>
//               <Text
//                 style={{
//                   fontSize: splitAppTheme.fontSizes.md,
//                   fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
//                 }}>
//                 Distance
//               </Text>

//               <MultiSlider
//                 min={0}
//                 step={5}
//                 max={100}
//                 snapped
//                 sliderLength={WINDOW_WIDTH - splitAppTheme.space[6] * 2}
//                 containerStyle={{
//                   alignItems: "center",
//                 }}
//                 trackStyle={{
//                   height: splitAppTheme.sizes[1],
//                 }}
//                 selectedStyle={{
//                   backgroundColor: splitAppTheme.colors.primary[300],
//                 }}
//                 markerStyle={{
//                   width: splitAppTheme.sizes[4],
//                   height: splitAppTheme.sizes[4],
//                   backgroundColor: splitAppTheme.colors.primary[300],
//                 }}
//                 onValuesChangeFinish={rangeData => {
//                   field.onChange(rangeData);
//                 }}
//                 values={field.value !== null ? field.value : [0, 100]}
//               />

//               {field.value !== null && (
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                   }}>
//                   <View>
//                     <Text>Min {field.value[0]} mi</Text>
//                   </View>

//                   <View>
//                     <Text>Max {field.value[1]} mi</Text>
//                   </View>
//                 </View>
//               )}
//             </View>
//           )}
//         />

//         <View style={{marginTop: splitAppTheme.space[6]}}>
//           <Text
//             style={{
//               fontSize: splitAppTheme.fontSizes.md,
//               marginBottom: splitAppTheme.space[3],
//               fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
//             }}>
//             Choose date
//           </Text>

//           <View style={{marginTop: splitAppTheme.space[4]}}>
//             <Controller
//               name={"date"}
//               control={control}
//               render={({field}) => (
//                 <SplitappSingleSelectCalender
//                   initialDate={field.value ?? undefined}
//                   onChange={data => {
//                     field.onChange(data.dateString);
//                   }}
//                 />
//               )}
//             />
//           </View>
//         </View>

//         <View style={{marginTop: splitAppTheme.space[5]}}>
//           <AppGradientButton
//             title="Search"
//             color="primary"
//             variant={"solid"}
//             onPress={handleSearch}
//           />
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

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
