import React from "react";
import dayjs from "dayjs";
import styles from "./styles";
import {Modal} from "react-native";
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
  Box,
  Text,
  Input,
  HStack,
  Divider,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "@components/ui";
import {
  CustomerBottomTabParamList,
  CustomerStackParamList,
  RootStackParamList,
} from "@src/navigation";
import {ClubListTypes} from "@constants/club";
import {SearchHistoryItem} from "@src/models";

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
      navigation.navigate(CustomerStackRoutes.CLUB_LIST, {
        searchTerm: item.data,
        headerTitle: "Search Result",
        listType: ClubListTypes.SEARCH_RESULT,
      });
    };
  };

  return (
    <React.Fragment>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => {
          navigation.navigate(CustomerStackRoutes.CLUB_SEARCH);
        }}>
        <Feather name="search" color={"#3B3B3B"} size={15} />
        <Text marginLeft={2} fontSize={"sm"} color={"#3B3B3B"}>
          Find your restaurant
        </Text>
      </TouchableOpacity>

      <Modal animationType={"slide"} visible onRequestClose={handleModalClose}>
        <Box p={6}>
          <HStack alignItems={"center"}>
            <Box flex={1}>
              <Input
                p={4}
                bg={"gray.100"}
                width={"full"}
                borderRadius={"lg"}
                value={searchTerm}
                onChangeText={handleChange}
                underlineColorAndroid={"transparent"}
                placeholder={"Type of club/bar name or location"}
              />
            </Box>

            <Box ml={5}>
              <TouchableOpacity
                size={50}
                borderRadius={"full"}
                alignItems={"center"}
                justifyContent={"center"}
                bg={"rgba(255, 77, 207, 0.7)"}
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
            </Box>
          </HStack>

          <Box mt={5}>
            <HStack alignItems={"center"} justifyContent={"space-between"}>
              <Box>
                <Text>Search History</Text>
              </Box>

              <Box>
                <TouchableOpacity
                  disabled={isDeleting}
                  onPress={handleItemDelete()}>
                  <Text>Clear all</Text>
                </TouchableOpacity>
              </Box>
            </HStack>
          </Box>

          <ScrollView>
            {isSearchHistoriesLoading ? (
              new Array(20).fill(1).map((_, indx) => (
                <React.Fragment key={indx}>
                  <HStack
                    py={3}
                    alignItems={"center"}
                    justifyContent={"space-between"}>
                    <HStack space={3} alignItems={"center"}>
                      {/* <Skeleton
                        width={"5"}
                        height={"5"}
                        borderRadius={"full"}
                        bg={"yellow.300"}
                      />
                      <Skeleton width={"3/5"} height={"5"} bg={"purple.300"} /> */}
                    </HStack>

                    {/* <Skeleton
                      width={"5"}
                      height={"5"}
                      borderRadius={"full"}
                      bg={"red.300"}
                    /> */}
                  </HStack>
                  <Divider />
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
                  <HStack
                    py={3}
                    alignItems={"center"}
                    justifyContent={"space-between"}>
                    <HStack space={3} alignItems={"center"}>
                      <Clock height={20} width={20} />
                      <Text fontFamily={"Satoshi-Medium"} fontSize={"md"}>
                        {item.data}
                      </Text>
                    </HStack>

                    {/* <IconButton
                      size={"md"}
                      color={"red.300"}
                      disabled={isDeleting}
                      onPress={handleItemDelete(item.id)}
                      icon={
                        <Icon as={MaterialIcons} name={"close"} size={"md"} />
                      }
                    /> */}
                  </HStack>
                  <Divider />
                </Pressable>
              ))
            )}
          </ScrollView>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
