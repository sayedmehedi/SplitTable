import React from "react";
import dayjs from "dayjs";
import styles from "./styles";
import uuid from "react-native-uuid";
import {Clock} from "@constants/iconPath";
import useAppToast from "@hooks/useAppToast";
import {TouchableOpacity, Modal} from "react-native";
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
  Icon,
  Text,
  Input,
  Button,
  HStack,
  Heading,
  Divider,
  Skeleton,
  IconButton,
  ScrollView,
  Pressable,
} from "native-base";
import {
  CustomerBottomTabParamList,
  CustomerStackParamList,
  RootStackParamList,
} from "@src/navigation";
import {ClubListTypes} from "@constants/club";
import {SearchHistoryItem} from "@src/models";

type Props = {
  isSearchModalOpen: boolean;
  toggleSearchModal: () => void;
};

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
      <TouchableOpacity style={styles.searchButton} onPress={toggleSearchModal}>
        <Feather name="search" color={"#3B3B3B"} size={15} />
        <Text marginLeft={2} fontSize={"sm"} color={"#3B3B3B"}>
          Find your restaurant
        </Text>
      </TouchableOpacity>

      <Modal
        animationType={"slide"}
        visible={isSearchModalOpen}
        onRequestClose={handleModalClose}>
        <Box p={6}>
          <HStack space={5} alignItems={"center"}>
            <Box flex={1}>
              <Input
                size={"lg"}
                variant={"filled"}
                _focus={{
                  bg: "gray.100",
                }}
                value={searchTerm}
                onChangeText={handleChange}
                placeholder={"Type of club/bar name or location"}
              />
            </Box>

            <Box>
              <IconButton
                size={"lg"}
                rounded={"full"}
                color={"primary"}
                disabled={isAdding}
                bg={"primary.100:aplha.70"}
                onPress={handleSubmitSearchTerm}
                icon={<Icon as={MaterialIcons} name={"search"} size={"xl"} />}
              />
            </Box>
          </HStack>

          <Box mt={5}>
            <HStack alignItems={"center"} justifyContent={"space-between"}>
              <Heading>Search History</Heading>

              <Button
                size={"lg"}
                variant={"ghost"}
                disabled={isDeleting}
                onPress={handleItemDelete()}>
                Clear all
              </Button>
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
                      <Skeleton
                        width={"5"}
                        height={"5"}
                        rounded={"full"}
                        bg={"yellow.300"}
                      />
                      <Skeleton w={"3/5"} h={"5"} bg={"purple.300"} />
                    </HStack>

                    <Skeleton
                      width={"5"}
                      height={"5"}
                      rounded={"full"}
                      bg={"red.300"}
                    />
                  </HStack>
                  <Divider />
                </React.Fragment>
              ))
            ) : filteredSearchHistories?.length === 0 ? (
              <Heading
                py={5}
                size={"sm"}
                textAlign={"center"}
                fontWeight={"semibold"}>
                No history
              </Heading>
            ) : (
              filteredSearchHistories?.map(item => (
                <Pressable key={item.id} onPress={handleItemPress(item)}>
                  <HStack
                    py={3}
                    alignItems={"center"}
                    justifyContent={"space-between"}>
                    <HStack space={3} alignItems={"center"}>
                      <Clock height={20} width={20} />
                      <Text fontWeight={"semibold"} fontSize={"md"}>
                        {item.data}
                      </Text>
                    </HStack>

                    <IconButton
                      size={"md"}
                      color={"red.300"}
                      disabled={isDeleting}
                      onPress={handleItemDelete(item.id)}
                      icon={
                        <Icon as={MaterialIcons} name={"close"} size={"md"} />
                      }
                    />
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
