import React from "react";
import {splitAppTheme} from "@src/theme";
import {StatusBar, View} from "react-native";
import {OwnerStackRoutes} from "@constants/routes";
import {TTableItem} from "@components/owner/shared";
import {StackScreenProps} from "@react-navigation/stack";
import MyTableList from "@components/owner/MyTableList";
import {CompositeScreenProps} from "@react-navigation/native";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";
import {OwnerStackParamList, RootStackParamList} from "@src/navigation";

type Props = CompositeScreenProps<
  StackScreenProps<OwnerStackParamList, typeof OwnerStackRoutes.MY_TABLES>,
  StackScreenProps<RootStackParamList>
>;

const MyTablesScreen = ({route, navigation}: Props) => {
  const handleItemPresss = React.useCallback(
    (table: TTableItem) => {
      navigation.navigate(OwnerStackRoutes.TABLE_DETAILS, {
        tableId: table.id,
      });
    },
    [navigation],
  );

  const handleUpdatePress = React.useCallback(
    (table: TTableItem) => {
      navigation.navigate(OwnerStackRoutes.UPSERT_TABLE, {
        actionMode: "update",
        tableId: table.id,
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

      <MyTableList
        old={route.params?.old}
        onItemPress={handleItemPresss}
        onUpdatePress={handleUpdatePress}
      />
    </View>
  );
};

export default MyTablesScreen;
