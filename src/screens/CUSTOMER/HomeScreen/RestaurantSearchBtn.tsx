import React from "react";
import dayjs from "dayjs";
import styles from "./styles";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import uuid from "react-native-uuid";
import {Clock} from "@constants/iconPath";
import useAppToast from "@hooks/useAppToast";
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
import {TableListTypes} from "@constants/club";
import {SearchHistoryItem} from "@src/models";
import {splitAppTheme} from "@src/theme";

type Props = {};

type NavigationProps = CompositeNavigationProp<
  CompositeNavigationProp<
    BottomTabNavigationProp<
      CustomerBottomTabParamList,
      typeof CustomerMainBottomTabRoutes.HOME
    >,
    StackNavigationProp<CustomerStackParamList>
  >,
  StackNavigationProp<RootStackParamList>
>;

export default function RestaurantSearchBtn({
  isSearchModalOpen,
  toggleSearchModal,
}: Props) {
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

  const handleModalClose = () => {
    if (!isAdding) {
      toggleSearchModal();
    }
  };

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
            setSearchTerm("");
            toggleSearchModal();
            navigation.navigate(CustomerStackRoutes.TABLE_LIST, {
              searchTerm: searchTerm,
              headerTitle: "Search Result",
              listType: TableListTypes.SEARCH_RESULT,
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
      console.log("deleting");
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
      toggleSearchModal();
      navigation.navigate(CustomerStackRoutes.TABLE_LIST, {
        searchTerm: item.data,
        headerTitle: "Search Result",
        listType: TableListTypes.SEARCH_RESULT,
      });
    };
  };

  return (
    <React.Fragment>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => {
          navigation.navigate(CustomerStackRoutes.TABLE_SEARCH);
        }}>
        <Feather name="search" color={"#3B3B3B"} size={15} />
        <Text
          style={{
            marginLeft: splitAppTheme.space[2],
            fontSize: splitAppTheme.fontSizes.sm,
            color: "#3B3B3B",
          }}>
          Find your restaurant
        </Text>
      </TouchableOpacity>

      <Modal animationType={"slide"} visible onRequestClose={handleModalClose}>
        <View
          style={{
            padding: splitAppTheme.space[6],
          }}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
            }}>
            <View
              style={{
                flex: 1,
              }}>
              <TextInput
                style={{
                  width: splitAppTheme.sizes.full,
                  padding: splitAppTheme.space[4],
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
              <TouchableOpacity
                style={{
                  height: 50,
                  width: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: splitAppTheme.radii.full,
                  backgroundColor: "rgba(255, 77, 207, 0.7)",
                }}
                onPress={handleSubmitSearchTerm}>
                <MaterialIcons size={30} name={"search"} color={"white"} />
              </TouchableOpacity>

              {/* <IconButton
                width={"lg"}
                borderRadius={"full"}
                color={"primary"}
                disabled={isAdding}
                bg={"primary.100:aplha.70"}
                onPress={handleSubmitSearchTerm}
                icon={<Icon as={MaterialIcons} name={"search"} size={"xl"} />}
              /> */}
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
                <Text>Search History</Text>
              </View>

              <View>
                <TouchableOpacity
                  disabled={isDeleting}
                  onPress={handleItemDelete()}>
                  <Text>Clear all</Text>
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
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingVertical: splitAppTheme.space[3],
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
                  <View
                    style={{
                      height: 1,
                      backgroundColor: splitAppTheme.colors.gray[300],
                    }}
                  />
                </React.Fragment>
              ))
            ) : filteredSearchHistories?.length === 0 ? (
              <Text
                py={5}
                size={"sm"}
                textAlign={"center"}
                fontFamily={"Satoshi-Medium"}>
                No history
              </Text>
            ) : (
              filteredSearchHistories?.map(item => (
                <Pressable key={item.id} onPress={handleItemPress(item)}>
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingVertical: splitAppTheme.space[3],
                    }}>
                    <View
                      style={{
                        alignItems: "center",
                        flexDirection: "row",
                      }}>
                      <Clock height={20} width={20} />
                      <Text
                        style={{
                          fontSize: splitAppTheme.fontSizes.md,
                          fontFamily:
                            splitAppTheme.fontConfig.Sathoshi[500].normal,
                        }}>
                        {item.data}
                      </Text>
                    </View>

                    {/* <IconButton
                      size={"md"}
                      color={"red.300"}
                      disabled={isDeleting}
                      onPress={handleItemDelete(item.id)}
                      icon={
                        <Icon as={MaterialIcons} name={"close"} size={"md"} />
                      }
                    /> */}
                  </View>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: splitAppTheme.colors.gray[300],
                    }}
                  />
                </Pressable>
              ))
            )}
          </ScrollView>
        </View>
      </Modal>
    </React.Fragment>
  );
}
