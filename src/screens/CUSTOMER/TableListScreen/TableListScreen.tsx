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
import JoinTableList from "./JoinTableList";

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

      {route.params.listType === TableListTypes.JOIN && (
        <JoinTableList {...tableSearchParams} onItemPress={handleItemPresss} />
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
    </View>
  );
};

export default TableListScreen;
