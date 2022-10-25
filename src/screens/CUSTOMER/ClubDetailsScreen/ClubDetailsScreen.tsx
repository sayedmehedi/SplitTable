import React from "react";
import {StatusBar} from "native-base";
import {useWindowDimensions} from "react-native";
import {CustomerStackRoutes} from "@constants/routes";
import {StackScreenProps} from "@react-navigation/stack";
import {CompositeScreenProps} from "@react-navigation/native";
import ClubDetailsInformation from "./ClubDetailsInformation";
import ClubDetailsAndReviewList from "./ClubDetailsAndReviewList";
import ClubDetailsAndMenuListScreen from "./ClubDetailsAndMenuList";
import {SceneRendererProps, TabView} from "react-native-tab-view";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";

type Props = CompositeScreenProps<
  StackScreenProps<
    CustomerStackParamList,
    typeof CustomerStackRoutes.CLUB_DETAILS
  >,
  StackScreenProps<RootStackParamList>
>;

const ClubDetailsScreen = ({navigation, route}: Props) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: "menus"},
    {key: "reviews"},
    {key: "information"},
  ]);

  const renderScene = React.useCallback(
    ({
      jumpTo,
      route: tabRoute,
    }: SceneRendererProps & {
      route: {
        key: string;
      };
    }) => {
      switch (tabRoute.key) {
        case "information":
          return (
            <ClubDetailsInformation
              jumpTo={jumpTo}
              clubId={route.params.clubId}
            />
          );
        case "reviews":
          return (
            <ClubDetailsAndReviewList
              jumpTo={jumpTo}
              clubId={route.params.clubId}
            />
          );
        default:
          return (
            <ClubDetailsAndMenuListScreen
              jumpTo={jumpTo}
              clubId={route.params.clubId}
            />
          );
      }
    },
    [],
  );

  return (
    <React.Fragment>
      <StatusBar translucent backgroundColor={"transparent"} />

      <TabView
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderTabBar={() => null}
        navigationState={{index, routes}}
        initialLayout={{width: layout.width}}
      />
    </React.Fragment>
  );
};

export default ClubDetailsScreen;
