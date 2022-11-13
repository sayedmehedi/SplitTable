import React from "react";
import {TTableItem} from "./shared";
import {splitAppTheme} from "@src/theme";
import {StatusBar, View} from "react-native";
import {TableListTypes} from "@constants/table";
import SplitTableList from "./SplitTableList";
import BookedTableList from "./BookedTableList";
import RecentVisits from "./RecentVisitClubList";
import {useDisclosure} from "react-use-disclosure";
import {CustomerStackRoutes} from "@constants/routes";
import {StackScreenProps} from "@react-navigation/stack";
import TablesByLocationList from "./TablesByLocationList";
import TableListBySearchTerm from "./TableListBySearchTerm";
import {CompositeScreenProps} from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {TableCommonSearchParams} from "@src/models";

type Props = CompositeScreenProps<
  StackScreenProps<
    CustomerStackParamList,
    typeof CustomerStackRoutes.TABLE_LIST
  >,
  StackScreenProps<RootStackParamList>
>;

const TableListScreen = ({route}: Props) => {
  const {isOpen: isButtonOpened, toggle: setButtonOpen} = useDisclosure();
  const [clubSearchTermDraft, setClubSearchTermDraft] = React.useState("");
  const [tableSearchParams, setTableSearchParams] =
    React.useState<TableCommonSearchParams>({});
  const {isOpen: isClubSearchModalOpen, toggle: setToggleClubSearchModal} =
    useDisclosure();

  React.useEffect(() => {
    if (route.params.listType === TableListTypes.SEARCH_RESULT) {
      setTableSearchParams(route.params.searchTerm);
    }
  }, [route.params.listType]);

  const handleSearchTermChange = (text: string) => {
    setClubSearchTermDraft(text);
  };

  const handleItemPresss = React.useCallback((item: TTableItem) => {}, []);

  return (
    <View
      style={{
        position: "relative",
        height: splitAppTheme.sizes.full,
      }}>
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      {route.params.listType === TableListTypes.BY_LOCATION && (
        <TablesByLocationList
          onItemPress={handleItemPresss}
          locationId={route.params.locationId}
        />
      )}

      {route.params.listType === TableListTypes.BOOKED && (
        <BookedTableList
          {...tableSearchParams}
          onItemPress={handleItemPresss}
        />
      )}

      {route.params.listType === TableListTypes.SPLIT && (
        <SplitTableList {...tableSearchParams} onItemPress={handleItemPresss} />
      )}

      {route.params.listType === TableListTypes.RECENT_VISIT && (
        <RecentVisits {...tableSearchParams} onItemPress={handleItemPresss} />
      )}

      {route.params.listType === TableListTypes.SEARCH_RESULT && (
        <TableListBySearchTerm
          {...tableSearchParams}
          onItemPress={handleItemPresss}
        />
      )}

      {/* <Modal
        size={"xl"}
        bottom={"4"}
        avoidKeyboard
        finalFocusRef={finalRef}
        animationPreset={"slide"}
        initialFocusRef={initialRef}
        isOpen={isClubSearchModalOpen}
        onClose={setToggleClubSearchModal}>
        <View>
          <Modal.CloseButton />
          <Modal.Header
            _text={{
              fontSize: "xl",
              fontWeight: "bold",
              fontFamily: "satoshi",
            }}>
            Search Club
          </Modal.Header>
          <Modal.Body>
            <FormControl>
              <Input
                ref={initialRef}
                onChangeText={handleSearchTermChange}
                InputRightElement={
                  <Button
                    w="1/5"
                    height={"full"}
                    size={"sm"}
                    borderRadius={"none"}
                    onPress={handleSubmitDraftClubSearchTerm}>
                    Submit
                  </Button>
                }
              />
            </FormControl>
          </Modal.Body>
        </Vi>
      </Modal> */}

      <View
        style={{
          position: "absolute",
          bottom: splitAppTheme.space[6],
          right: splitAppTheme.space[6],
        }}>
        <View
          style={{
            alignItems: "center",
          }}>
          {/* <Stagger
            visible={isButtonOpened}
            initial={{
              opacity: 0,
              scale: 0,
              translateY: 34,
            }}
            animate={{
              translateY: 0,
              scale: 1,
              opacity: 1,
              transition: {
                type: "spring",
                mass: 0.8,
                stagger: {
                  offset: 30,
                  reverse: true,
                },
              },
            }}
            exit={{
              translateY: 34,
              scale: 0.5,
              opacity: 0,
              transition: {
                duration: 100,
                stagger: {
                  offset: 30,
                  reverse: true,
                },
              },
            }}>
            {!clubSearchTerm ? (
              <IconButton
                mb={"4"}
                size={"lg"}
                variant={"solid"}
                bg={"secondary.400"}
                borderRadius={"full"}
                onPress={setToggleClubSearchModal}
                _pressed={{
                  bg: "secondary.100",
                }}
                icon={
                  <Icon
                    size={"6"}
                    name={"search"}
                    as={MaterialIcons}
                    color={"warmGray.50"}
                  />
                }
              />
            ) : (
              <IconButton
                mb={"4"}
                size={"lg"}
                bg={"rose.400"}
                variant={"solid"}
                borderRadius={"full"}
                onPress={clearClubSearchTerm}
                _pressed={{
                  bg: "rose.100",
                }}
                icon={
                  <Icon
                    size={"6"}
                    name={"clear"}
                    as={MaterialIcons}
                    color={"warmGray.50"}
                  />
                }
              />
            )}
          </Stagger> */}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}>
          {/* <IconButton
            size={"lg"}
            bg={"cyan.400"}
            variant={"solid"}
            borderRadius={"full"}
            onPress={setButtonOpen}
            _pressed={{
              bg: "cyan.100",
            }}
            icon={
              <Icon
                size={"6"}
                color={"warmGray.50"}
                name={"dots-horizontal"}
                as={MaterialCommunityIcons}
              />
            }
          /> */}
        </View>
      </View>
    </View>
  );
};

export default TableListScreen;
