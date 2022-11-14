import {
  View,
  Text,
  FlatList,
  LayoutAnimation,
  ListRenderItem,
  ActivityIndicator,
} from "react-native";
import {Faq} from "@src/models";
import React, {useState} from "react";
import {splitAppTheme} from "@src/theme";
import {AuthTypeNum} from "@constants/auth";
import {CustomerStackRoutes} from "@constants/routes";
import Entypo from "react-native-vector-icons/Entypo";
import {StackScreenProps} from "@react-navigation/stack";
import {CompositeScreenProps} from "@react-navigation/native";
import useHandleNonFieldError from "@hooks/useHandleNonFieldError";
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler";
import {CustomerStackParamList, RootStackParamList} from "@src/navigation";
import useInfiniteGetFaqsQuery from "@hooks/user/useInfiniteGetFaqsQuery";

type Props = CompositeScreenProps<
  StackScreenProps<CustomerStackParamList, typeof CustomerStackRoutes.FAQ>,
  StackScreenProps<RootStackParamList>
>;

const keyExtractor = (item: {id: number}) => `${item.id}`;

const FaqScreen = ({}: Props) => {
  const [active, setActive] = useState<number | null>(null);

  const {
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    error: infiniteGetResourcesError,
    data: infiniteGetResourcesResponse,
    isLoading: isLoadingInfiniteResources,
  } = useInfiniteGetFaqsQuery(
    {
      page: 1,
      userType: AuthTypeNum.CUSTOMER,
    },
    {
      getNextPageParam(lastPage) {
        if (lastPage.items?.has_more_data) {
          return {
            userType: AuthTypeNum.CUSTOMER,
            page: lastPage.items.current_page + 1,
          };
        }
      },
    },
  );
  useHandleNonFieldError(infiniteGetResourcesError);

  const resourceListData = React.useMemo(() => {
    return (
      infiniteGetResourcesResponse?.pages?.flatMap(eachPage => {
        return eachPage?.items?.data ?? [];
      }) ?? ([] as Faq[])
    );
  }, [infiniteGetResourcesResponse?.pages]);

  const handleFetchNextPage = React.useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const renderItem: ListRenderItem<Faq> = React.useCallback(
    ({item, index}) => {
      const onPress = () => {
        LayoutAnimation.easeInEaseOut();
        setActive(prevState => (index === prevState ? null : index));
      };

      const open = active === index;

      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={{
              // padding: 15,
              width: "100%",
              marginVertical: 5,
              justifyContent: "center",
            }}
            key={item.id}
            activeOpacity={1}
            onPress={() => onPress()}>
            <View
              style={{flexDirection: "row", justifyContent: "space-between"}}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "SatoshiVariable-Bold",
                  color: "#222B45",
                }}>
                {item.question}
              </Text>
              {open ? (
                <View
                  style={{
                    backgroundColor: "#8A8D9F",
                    height: 25,
                    width: 25,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Entypo name="chevron-small-down" size={8} color={"white"} />
                </View>
              ) : (
                <View
                  style={{
                    backgroundColor: "#8A8D9F",
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Entypo
                    name="chevron-small-right"
                    size={12}
                    color={"white"}
                  />
                </View>
              )}
            </View>
            <View style={{flexDirection: "row"}}>
              {open && (
                <View>
                  <Text>{item.answer}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </ScrollView>
      );
    },
    [active],
  );

  if (isLoadingInfiniteResources) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
    // return (
    //   <ScrollView>
    //     {ListHeaderComponent}

    //     <View p={6}>
    //       {new Array(5).fill(1).map((_, i) => (
    //         <Center width={"full"} key={i}>
    //           <HStack width={"full"} height={"32"} space={"5"} borderRadius={"md"}>
    //             <Skeleton
    //               height={"24"}
    //               width={"24"}
    //               borderRadius={"sm"}
    //               startColor="coolGray.100"
    //             />
    //             <VStack flex={"3"} space={"2.5"}>
    //               <Skeleton height={"5"} startColor="amber.300" />
    //               <Skeleton.Text lines={2} />

    //               <HStack space="2" alignItems="center">
    //                 <Skeleton size={"5"} borderRadius={"full"} />
    //                 <Skeleton height={"3"} flex={"2"} borderRadius={"full"} />
    //                 <Skeleton
    //                   height={"3"}
    //                   flex={"1"}
    //                   borderRadius={"full"}
    //                   startColor={"indigo.300"}
    //                 />
    //               </HStack>
    //             </VStack>
    //           </HStack>
    //         </Center>
    //       ))}
    //     </View>
    //   </ScrollView>
    // );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}>
      {isFetchingNextPage ? (
        <View style={{alignItems: "center", justifyContent: "center"}}>
          <ActivityIndicator size={"small"} />
        </View>
      ) : resourceListData.length === 0 ? (
        <View style={{alignItems: "center", justifyContent: "center"}}>
          <Text>No Data</Text>
        </View>
      ) : null}

      <FlatList
        onRefresh={refetch}
        data={resourceListData}
        refreshing={isRefetching}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={handleFetchNextPage}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: splitAppTheme.space["3"],
            }}
          />
        )}
        contentContainerStyle={{
          padding: splitAppTheme.space["6"],
        }}
      />
    </View>
  );
};

export default FaqScreen;
