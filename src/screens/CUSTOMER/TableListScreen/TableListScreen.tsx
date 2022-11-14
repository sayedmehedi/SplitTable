import React from "react";
import {TTableItem} from "./shared";
import {splitAppTheme} from "@src/theme";
import {StatusBar, View} from "react-native";
import {AppTableListTypes} from "@constants/table";
import SplitTableList from "./SplitTableList";
import BookedTableList from "./BookedTableList";
import RecentVisits from "./RecentVisitClubList";
import {useDisclosure} from "react-use-disclosure";
import {CustomerStackRoutes} from "@constants/routes";
import {StackScreenProps} from "@react-navigation/stack";
import TableListByLocation from "./TableListByLocation";
import TableListBySearchTerm from "./TableListBySearchTerm";
import {CompositeScreenProps} from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {TableCommonSearchParams} from "@src/models";
import JoinTableList from "./JoinTableList";
import TableListByClubId from "./TableListByClubId";

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
    if (route.params.listType === AppTableListTypes.SEARCH_RESULT) {
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
      {route.params.listType === AppTableListTypes.BY_LOCATION && (
        <TableListByLocation
          onItemPress={handleItemPresss}
          locationId={route.params.locationId}
        />
      )}

      {route.params.listType === AppTableListTypes.BY_CLUB_ID && (
        <TableListByClubId
          clubId={route.params.clubId}
          onItemPress={handleItemPresss}
        />
      )}

      {route.params.listType === AppTableListTypes.BOOKED && (
        <BookedTableList
          {...tableSearchParams}
          onItemPress={handleItemPresss}
        />
      )}

      {route.params.listType === AppTableListTypes.SPLIT && (
        <SplitTableList {...tableSearchParams} onItemPress={handleItemPresss} />
      )}

      {route.params.listType === AppTableListTypes.JOIN && (
        <JoinTableList {...tableSearchParams} onItemPress={handleItemPresss} />
      )}

      {route.params.listType === AppTableListTypes.RECENT_VISIT && (
        <RecentVisits {...tableSearchParams} onItemPress={handleItemPresss} />
      )}

      {route.params.listType === AppTableListTypes.SEARCH_RESULT && (
        <TableListBySearchTerm
          {...tableSearchParams}
          onItemPress={handleItemPresss}
        />
      )}
    </View>
  );
};

export default TableListScreen;
