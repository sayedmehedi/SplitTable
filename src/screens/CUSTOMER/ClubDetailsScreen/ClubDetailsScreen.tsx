import React from "react";
import {CustomerStackRoutes} from "@constants/routes";
import {StackScreenProps} from "@react-navigation/stack";

import {CompositeScreenProps} from "@react-navigation/native";
import ClubDetailsInformation from "./ClubDetailsInformation";
import ClubDetailsAndReviewList from "./ClubDetailsAndReviewList";
import ClubDetailsAndMenuListScreen from "./ClubDetailsAndMenuList";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";

type Props = CompositeScreenProps<
  StackScreenProps<
    CustomerStackParamList,
    typeof CustomerStackRoutes.CLUB_DETAILS
  >,
  StackScreenProps<RootStackParamList>
>;

const ClubDetailsScreen = ({navigation, route}: Props) => {
  const [tabValue, setTabValue] = React.useState("menu");

  const jumpTo = React.useCallback((value: string) => {
    setTabValue(value);
  }, []);

  switch (tabValue) {
    case "information":
      return (
        <ClubDetailsInformation jumpTo={jumpTo} clubId={route.params.clubId} />
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
};

export default ClubDetailsScreen;
