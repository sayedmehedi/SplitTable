import React from "react";
import {TTableItem} from "./shared";
import {splitAppTheme} from "@src/theme";
import JoinTableList from "./JoinTableList";
import {StatusBar, View} from "react-native";
import SplitTableList from "./SplitTableList";
import BookedTableList from "./BookedTableList";
import RecentVisits from "./RecentVisitClubList";
import {AppTableListTypes} from "@constants/table";
import {TableCommonSearchParams} from "@src/models";
import TableListByClubId from "./TableListByClubId";
import {CustomerStackRoutes} from "@constants/routes";
import {StackScreenProps} from "@react-navigation/stack";
import TableListByLocation from "./TableListByLocation";
import TableListBySearchTerm from "./TableListBySearchTerm";
import {CompositeScreenProps} from "@react-navigation/native";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";

type Props = CompositeScreenProps<
  StackScreenProps<
    CustomerStackParamList,
    typeof CustomerStackRoutes.TABLE_LIST
  >,
  StackScreenProps<RootStackParamList>
>;

const TableListScreen = ({route, navigation}: Props) => {
  const [tableSearchParams, setTableSearchParams] =
    React.useState<TableCommonSearchParams>({});

  React.useEffect(() => {
    setTableSearchParams(route.params.searchTerm ?? {});
  }, [JSON.stringify(route.params.searchTerm ?? {})]);

  const handleItemPresss = React.useCallback((item: TTableItem) => {
    navigation.navigate(CustomerStackRoutes.TABLE_DETAILS, {
      tableId: item.id,
    });
  }, []);

  const handleJoinTableItemPresss = React.useCallback(
    (item: TTableItem) => {
      navigation.navigate(CustomerStackRoutes.JOIN_TABLE_DETAILS, {
        tableId: item.id,
      });
    },
    [navigation],
  );

  return (
    <View
      style={{
        position: "relative",
        height: splitAppTheme.sizes.full,
      }}>
      <FocusAwareStatusBar
        barStyle={"dark-content"}
        backgroundColor={splitAppTheme.colors.white}
      />
      {route.params.listType === AppTableListTypes.BY_LOCATION && (
        <TableListByLocation
          {...tableSearchParams}
          onItemPress={handleItemPresss}
          locationId={route.params.searchTerm.locationId}
        />
      )}

      {route.params.listType === AppTableListTypes.BY_CLUB_ID && (
        <TableListByClubId
          {...tableSearchParams}
          onItemPress={handleItemPresss}
          clubId={route.params.searchTerm.clubId}
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
        <JoinTableList
          {...tableSearchParams}
          onItemPress={handleJoinTableItemPresss}
        />
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
