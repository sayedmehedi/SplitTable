import React from "react";
import {TClubItem} from "./shared";
import {ClubListTypes} from "@constants/club";
import PopularClubList from "./PopularClubList";
import NearbyClubList from "./NearbyClubList";
import {CustomerStackRoutes} from "@constants/routes";
import ClubsByLocationList from "./ClubsByLocationList";
import {StackScreenProps} from "@react-navigation/stack";
import RecentVisitClubList from "./RecentVisitClubList";
import useDebouncedState from "@hooks/useDebouncedState";
import {CompositeScreenProps} from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Box,
  HStack,
  Icon,
  Input,
  Modal,
  Stagger,
  StatusBar,
  IconButton,
  useDisclose,
} from "native-base";

type Props = CompositeScreenProps<
  StackScreenProps<
    CustomerStackParamList,
    typeof CustomerStackRoutes.CLUB_LIST
  >,
  StackScreenProps<RootStackParamList>
>;

const ClubListScreen = ({route}: Props) => {
  const finalRef = React.useRef(null);
  const initialRef = React.useRef(null);
  const [clubSearchTerm, setClubSearchTerm] = React.useState("");
  const [debouncedClubSearchTerm] = useDebouncedState(clubSearchTerm, 500);
  const {isOpen: isClubSearchModalOpen, onToggle: setToggleClubSearchModal} =
    useDisclose();

  const {isOpen: isButtonOpened, onToggle: setButtonOpen} = useDisclose();

  const handleSearchTermChange = (text: string) => {
    setClubSearchTerm(text);
  };

  const clearClubSearchTerm = () => {
    setClubSearchTerm("");
  };

  const handleItemPresss = React.useCallback((item: TClubItem) => {}, []);

  return (
    <Box safeArea position={"relative"} h={"full"}>
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      {route.params.listType === ClubListTypes.BY_LOCATION && (
        <ClubsByLocationList
          onItemPress={handleItemPresss}
          locationId={route.params.locationId}
        />
      )}

      {route.params.listType === ClubListTypes.POPULAR && (
        <PopularClubList
          onItemPress={handleItemPresss}
          searchTerm={debouncedClubSearchTerm}
        />
      )}

      {route.params.listType === ClubListTypes.NEAR && (
        <NearbyClubList
          onItemPress={handleItemPresss}
          searchTerm={debouncedClubSearchTerm}
        />
      )}

      {route.params.listType === ClubListTypes.RECENT_VISIT && (
        <RecentVisitClubList
          onItemPress={handleItemPresss}
          searchTerm={debouncedClubSearchTerm}
        />
      )}

      <Modal
        finalFocusRef={finalRef}
        initialFocusRef={initialRef}
        isOpen={isClubSearchModalOpen}
        onClose={setToggleClubSearchModal}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header
            _text={{
              fontSize: "xl",
              fontWeight: "bold",
              fontFamily: "satoshi",
            }}>
            Seach Club
          </Modal.Header>
          <Modal.Body>
            <Input ref={initialRef} onChangeText={handleSearchTermChange} />
          </Modal.Body>
        </Modal.Content>
      </Modal>

      <Box position={"absolute"} bottom={"6"} right={"6"}>
        <Box alignItems="center">
          <Stagger
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
          </Stagger>
        </Box>

        <HStack justifyContent={"center"}>
          <IconButton
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
          />
        </HStack>
      </Box>
    </Box>
  );
};

export default ClubListScreen;
