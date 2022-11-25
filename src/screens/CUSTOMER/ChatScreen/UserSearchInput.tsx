import React from "react";
import truncate from "lodash.truncate";
import {splitAppTheme} from "@src/theme";
import {ScrollViewListItem} from "./ScrollViewListItem";
import LinearGradient from "react-native-linear-gradient";
import {useDimensions} from "@react-native-community/hooks";
import useSearchUserQuery from "@hooks/user/useSearchUserQuery";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import ActionSheet, {ActionSheetRef} from "react-native-actions-sheet";
import {AutocompleteDropdown} from "react-native-autocomplete-dropdown";
import {Image, Platform, Text, TouchableOpacity, View} from "react-native";
import useSendInvitationMutation from "@hooks/chat/useSendInvitationMutation";
import useHandleResponseResultError from "@hooks/useHandleResponseResultError";
import {isResponseResultError} from "@utils/error-handling";
import useAppToast from "@hooks/useAppToast";
import FastImage from "react-native-fast-image";

type SuggestionItem = {
  title: string;
  image: string;
  id: string;
  location: string;
  email: string;
};

export default function UserSearchInput() {
  const toast = useAppToast();
  const {
    window: {height: WINDOW_HEIGHT},
  } = useDimensions();
  const [q, setQ] = React.useState("");
  const searchRef = React.useRef<any>(null!);
  const dropdownController = React.useRef<any>(null);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<SuggestionItem | null>(
    null,
  );
  const actionSheetRef = React.useRef<ActionSheetRef>(null!);

  const {data: usersData, isFetching: isUsersFetching} = useSearchUserQuery(
    {
      q,
    },
    {
      enabled: dropdownOpen,
    },
  );

  //   console.log("searchRef", searchRef.current);

  const {
    mutate: sendInvitation,
    isLoading: isSending,
    error: sendError,
    data: sendResponse,
  } = useSendInvitationMutation({
    onSuccess(data) {
      if (!isResponseResultError(data)) {
        toast.success(data.success);
        searchRef.current.clear();
        actionSheetRef.current.hide();
      }
    },
  });
  useHandleResponseResultError(sendResponse);
  useHandleNonFieldError(sendError);

  const usersSuggestion: SuggestionItem[] = React.useMemo(() => {
    return (
      usersData?.users?.data?.map(user => ({
        title: user.name,
        email: user.email,
        image: user.image,
        id: user.id.toString(),
        location: user.location,
      })) ?? []
    );
  }, [JSON.stringify(usersData ?? {})]);

  const handleSendInvitation = () => {
    if (selectedUser?.id) {
      sendInvitation({
        receiverId: +selectedUser.id,
      });
    }
  };

  return (
    <View style={Platform.select({ios: {zIndex: 10}})}>
      <AutocompleteDropdown
        onClear={() => {
          setSelectedUser(null);
          actionSheetRef.current.hide();
        }}
        inputHeight={44}
        // @ts-ignore
        ref={searchRef}
        controller={controller => {
          dropdownController.current = controller;
        }}
        direction={Platform.select({ios: "down"})}
        onChangeText={setQ}
        dataSet={usersSuggestion}
        // @ts-ignore
        onSelectItem={(item: SuggestionItem) => {
          if (item !== null) {
            setSelectedUser(item);
            actionSheetRef.current.show();
          }
        }}
        debounce={600}
        suggestionsListMaxHeight={WINDOW_HEIGHT * 0.4}
        onOpenSuggestionsList={setDropdownOpen}
        loading={isUsersFetching}
        useFilter={false}
        textInputProps={{
          autoCorrect: false,
          autoCapitalize: "none",
          placeholder: "Search",
          placeholderTextColor: splitAppTheme.colors.black,
          style: {
            color: splitAppTheme.colors.black,
            borderRadius: splitAppTheme.radii.xl,
          },
        }}
        rightButtonsContainerStyle={{
          right: 8,
          height: 30,

          alignSelf: "center",
        }}
        inputContainerStyle={{
          backgroundColor: splitAppTheme.colors.white,
          borderRadius: splitAppTheme.radii.xl,
          borderWidth: splitAppTheme.borderWidths[2],
          borderColor: splitAppTheme.colors.gray[300],
        }}
        suggestionsListContainerStyle={{
          position: "relative",
          top: 0,
        }}
        containerStyle={{flexGrow: 1, flexShrink: 1}}
        // @ts-ignore
        renderItem={(item: SuggestionItem, text) => (
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              padding: splitAppTheme.space[3],
            }}>
            <View>
              <FastImage
                source={{uri: item.image}}
                style={{
                  height: splitAppTheme.sizes[12],
                  width: splitAppTheme.sizes[12],
                  borderRadius: splitAppTheme.radii.full,
                }}
              />
            </View>
            <View style={{marginLeft: splitAppTheme.space[3]}}>
              <ScrollViewListItem highlight={text} title={item.title} />

              <View style={{marginTop: splitAppTheme.space[2]}}>
                <ScrollViewListItem
                  highlight={text}
                  style={{
                    fontSize: splitAppTheme.fontSizes.sm,
                  }}
                  title={truncate(item.email, {length: 22})}
                />
              </View>
            </View>
          </View>
        )}
        // ChevronIconComponent={
        //   <Feather name="chevron-down" size={20} color="#fff" />
        // }
        // ClearIconComponent={<Feather name="x-circle" size={18} color="#fff" />}
        // showChevron={false}
        // closeOnBlur={false}
        //  showClear={false}
      />

      <ActionSheet ref={actionSheetRef} containerStyle={{}}>
        <LinearGradient
          end={{x: 0, y: 0}}
          start={{x: 0, y: 1}}
          colors={[
            splitAppTheme.colors.primary[400],
            splitAppTheme.colors.secondary[400],
          ]}>
          <View
            style={{
              alignItems: "center",
              paddingVertical: splitAppTheme.space[5],
            }}>
            <View>
              <FastImage
                source={{uri: selectedUser?.image}}
                style={{
                  width: splitAppTheme.sizes[24],
                  height: splitAppTheme.sizes[24],
                  borderRadius: splitAppTheme.radii.full,
                }}
              />
            </View>

            <View style={{marginTop: splitAppTheme.space[5]}}>
              <Text
                style={{
                  color: splitAppTheme.colors.white,
                  fontSize: splitAppTheme.fontSizes.xl,
                  fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
                }}>
                {selectedUser?.title}
              </Text>
            </View>

            <View style={{marginTop: splitAppTheme.space[2]}}>
              <Text
                style={{
                  textAlign: "center",
                  color: splitAppTheme.colors.white,
                  fontSize: splitAppTheme.fontSizes.sm,
                  fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
                }}>
                {selectedUser?.location}
              </Text>
            </View>

            <View style={{marginTop: splitAppTheme.space[5]}}>
              <TouchableOpacity
                disabled={isSending}
                onPress={handleSendInvitation}>
                <View
                  style={{
                    borderRadius: splitAppTheme.radii.xl,
                    borderColor: splitAppTheme.colors.white,
                    paddingVertical: splitAppTheme.space[2],
                    paddingHorizontal: splitAppTheme.space[3],
                    borderWidth: splitAppTheme.borderWidths[2],
                  }}>
                  <Text
                    style={{
                      color: splitAppTheme.colors.white,
                      fontSize: splitAppTheme.fontSizes.lg,
                      fontFamily: splitAppTheme.fontConfig.Roboto[500].normal,
                    }}>
                    Invite
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ActionSheet>
    </View>
  );
}
