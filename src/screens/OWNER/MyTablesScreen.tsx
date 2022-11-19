import React from "react";
import {splitAppTheme} from "@src/theme";
import {StatusBar, View} from "react-native";
import {OwnerStackRoutes} from "@constants/routes";
import {TTableItem} from "@components/owner/shared";
import {StackScreenProps} from "@react-navigation/stack";
import MyTableList from "@components/owner/MyTableList";
import {CompositeScreenProps} from "@react-navigation/native";
import {OwnerStackParamList, RootStackParamList} from "@src/navigation";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";

type Props = CompositeScreenProps<
  StackScreenProps<OwnerStackParamList, typeof OwnerStackRoutes.MY_TABLES>,
  StackScreenProps<RootStackParamList>
>;

const MyTablesScreen = ({route}: Props) => {
  const handleItemPresss = React.useCallback((item: TTableItem) => {}, []);

  return (
    <View
      style={{
        position: "relative",
        height: splitAppTheme.sizes.full,
      }}>
      <FocusAwareStatusBar
      // backgroundColor={"white"}
      // barStyle={"dark-content"}
      />

      <MyTableList onItemPress={handleItemPresss} />
    </View>
  );
};

export default MyTablesScreen;
