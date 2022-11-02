import React from "react";
import dayjs from "dayjs";
import uuid from "react-native-uuid";
import {Clock} from "@constants/iconPath";
import useAppToast from "@hooks/useAppToast";
import {ClubListTypes} from "@constants/club";
import {SearchHistoryItem} from "@src/models";
import Feather from "react-native-vector-icons/Feather";
import useDebouncedState from "@hooks/useDebouncedState";
import {StackNavigationProp} from "@react-navigation/stack";
import {
  CustomerMainBottomTabRoutes,
  CustomerStackRoutes,
} from "@constants/routes";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import useGetSearchHistoryQuery from "@hooks/useGetSearchHistoryQuery";
import {useNavigation, CompositeNavigationProp} from "@react-navigation/native";
import useAddSearchHistoryItemMutation from "@hooks/useAddSearchHistoryItemMutation";
import useDeleteSearchHistoryItemMutation from "@hooks/useDeleteSearchHistoryItemMutation";

import {
  CustomerBottomTabParamList,
  CustomerStackParamList,
  RootStackParamList,
} from "@src/navigation";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {splitAppTheme} from "@src/theme";

type NavigationProps = CompositeNavigationProp<
  StackNavigationProp<CustomerStackParamList>,
  StackNavigationProp<RootStackParamList>
>;

const ClubSearchScreen = () => {
  const toast = useAppToast();
  const navigation = useNavigation<NavigationProps>();

  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedSearchTerm] = useDebouncedState(searchTerm, 500);

  const {
    error: getError,
    isError: isGetError,
    data: searchHistoryResponse,
    isLoading: isSearchHistoriesLoading,
  } = useGetSearchHistoryQuery();

  const {
    error: deleteError,
    isLoading: isDeleting,
    isError: isDeleteError,
    mutate: deleteSearchHistory,
  } = useDeleteSearchHistoryItemMutation();

  const {
    error: addError,
    isLoading: isAdding,
    isError: isAddError,
    mutate: addSearchHistory,
  } = useAddSearchHistoryItemMutation();

  React.useEffect(() => {
    if (isGetError) {
      toast.error(getError.message);
    }
  }, [isGetError, getError]);

  React.useEffect(() => {
    if (isDeleteError) {
      toast.error(deleteError.message);
    }
  }, [isDeleteError, deleteError]);

  React.useEffect(() => {
    if (isAddError) {
      toast.error(addError.message);
    }
  }, [isAddError, addError]);

  const handleSubmitSearchTerm = () => {
    if (!!searchTerm) {
      addSearchHistory(
        {
          data: searchTerm,
          id: uuid.v4().toString(),
          lastUsedTime: dayjs().toISOString(),
        },
        {
          onSuccess() {
            navigation.navigate(CustomerStackRoutes.CLUB_LIST, {
              searchTerm: searchTerm,
              headerTitle: "Search Result",
              listType: ClubListTypes.SEARCH_RESULT,
            });
          },
        },
      );
    }
  };

  const handleChange = (text: string) => {
    setSearchTerm(text);
  };

  const handleItemDelete = (id?: string) => {
    return () => {
      deleteSearchHistory(id);
    };
  };

  const filteredSearchHistories = React.useMemo(() => {
    return searchHistoryResponse?.filter(item =>
      item.data.toUpperCase().includes(debouncedSearchTerm.toUpperCase()),
    );
  }, [searchHistoryResponse, debouncedSearchTerm]);

  const handleItemPress = (item: SearchHistoryItem) => {
    return () => {
      navigation.navigate(CustomerStackRoutes.CLUB_LIST, {
        searchTerm: item.data,
        headerTitle: "Search Result",
        listType: ClubListTypes.SEARCH_RESULT,
      });
    };
  };

  return (
    <React.Fragment>
      <View
        style={{
          padding: splitAppTheme.space[6],
        }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}>
          <View
            style={{
              flex: 1,
            }}>
            <TextInput
              style={{
                padding: splitAppTheme.space[4],
                width: splitAppTheme.space.full,
                borderRadius: splitAppTheme.radii.lg,
                backgroundColor: splitAppTheme.colors.gray[100],
              }}
              value={searchTerm}
              onChangeText={handleChange}
              underlineColorAndroid={"transparent"}
              placeholder={"Type of club/bar name or location"}
            />
          </View>

          <View
            style={{
              marginLeft: splitAppTheme.space[5],
            }}>
            {isAdding ? (
              <ActivityIndicator size={"small"} />
            ) : (
              <TouchableOpacity
                style={{
                  height: 50,
                  width: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: splitAppTheme.radii.full,
                  backgroundColor: isAdding
                    ? "rgba(0,0,0,0.7)"
                    : "rgba(139, 118, 213, 0.95)",
                }}
                onPress={handleSubmitSearchTerm}>
                <MaterialIcons size={30} name={"search"} color={"white"} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View
          style={{
            marginTop: splitAppTheme.space[5],
          }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <View>
              <Text
                style={{
                  color: "black",
                }}>
                Search History
              </Text>
            </View>

            <View>
              <TouchableOpacity
                disabled={isDeleting}
                onPress={handleItemDelete()}>
                <Text
                  style={{
                    color: isDeleting
                      ? splitAppTheme.colors.red[100]
                      : splitAppTheme.colors.black,
                  }}>
                  Clear all
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView>
          {isSearchHistoriesLoading ? (
            new Array(20).fill(1).map((_, indx) => (
              <React.Fragment key={indx}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: splitAppTheme.space[3],
                  }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}>
                    {/* <Skeleton
                          width={"5"}
                          height={"5"}
                          borderRadius={"full"}
                          bg={"yellow.300"}
                        />
                        <Skeleton width={"3/5"} height={"5"} bg={"purple.300"} /> */}
                  </View>

                  {/* <Skeleton
                        width={"5"}
                        height={"5"}
                        borderRadius={"full"}
                        bg={"red.300"}
                      /> */}
                </View>
                {/* <Divider /> */}
              </React.Fragment>
            ))
          ) : filteredSearchHistories?.length === 0 ? (
            <Text
              style={{
                textAlign: "center",
                fontSize: splitAppTheme.fontSizes.sm,
                paddingVertical: splitAppTheme.space[5],
                fontFamily: splitAppTheme.fontConfig.Sathoshi[500].normal,
              }}>
              No history
            </Text>
          ) : (
            filteredSearchHistories?.map(item => (
              <Pressable key={item.id} onPress={handleItemPress(item)}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: splitAppTheme.space[3],
                  }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}>
                    <Clock height={20} width={20} />
                    <Text
                      style={{
                        fontSize: splitAppTheme.fontSizes.md,
                        marginLeft: splitAppTheme.space[3],
                        fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
                      }}>
                      {item.data}
                    </Text>
                  </View>

                  {isDeleting ? (
                    <ActivityIndicator size={"small"} />
                  ) : (
                    <TouchableOpacity
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: splitAppTheme.radii.full,
                      }}
                      onPress={handleItemDelete(item.id)}>
                      <MaterialIcons size={22} name={"close"} color={"red"} />
                    </TouchableOpacity>
                  )}
                </View>
                {/* <Divider /> */}
              </Pressable>
            ))
          )}
        </ScrollView>
      </View>
    </React.Fragment>
  );
};

export default ClubSearchScreen;
