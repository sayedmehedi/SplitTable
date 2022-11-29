import React from "react";
import {splitAppTheme} from "@src/theme";
import {View, ScrollView} from "react-native";
import {OwnerStackRoutes} from "@constants/routes";
import {useDisclosure} from "react-use-disclosure";
import {StackScreenProps} from "@react-navigation/stack";
import {CompositeScreenProps} from "@react-navigation/native";
import {FocusAwareStatusBar} from "@components/FocusAwareStatusBar";
import InformationUpdaterModal from "./modals/InformationUpdaterModal";
import InformationUpdaterItem from "./modals/InformationUpdaterItem";
import {RootStackParamList, OwnerStackParamList} from "@src/navigation";

type ResourceType = React.ComponentProps<typeof InformationUpdaterItem>["type"];

type Props = CompositeScreenProps<
  StackScreenProps<OwnerStackParamList, typeof OwnerStackRoutes.INFORMATION>,
  StackScreenProps<RootStackParamList>
>;

const InformationScreen = ({}: Props) => {
  const {isOpen, open, close} = useDisclosure();
  const [modalResourceType, setModalResourceType] = React.useState<
    ResourceType | ""
  >("");

  const handleOpenModal = React.useCallback(
    (resrouceType: ResourceType) => {
      setModalResourceType(resrouceType);
      open();
    },
    [open],
  );

  const handleCloseModal = React.useCallback(() => {
    setModalResourceType("");
    close();
  }, [close]);
  return (
    <ScrollView>
      <FocusAwareStatusBar
        barStyle={"dark-content"}
        backgroundColor={splitAppTheme.colors.white}
      />

      <View
        style={{paddingHorizontal: 12, backgroundColor: "#FFFFFF", flex: 1}}>
        <InformationUpdaterItem type="time" openModal={handleOpenModal} />

        <InformationUpdaterItem type="cuisine" openModal={handleOpenModal} />

        <InformationUpdaterItem type="cost" openModal={handleOpenModal} />

        <InformationUpdaterItem type="about" openModal={handleOpenModal} />

        <InformationUpdaterItem type="slider" openModal={handleOpenModal} />

        <InformationUpdaterModal
          isOpen={isOpen}
          onClose={handleCloseModal}
          type={modalResourceType}
        />
      </View>
    </ScrollView>
  );
};

export default InformationScreen;
