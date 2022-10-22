import React from "react";
import {SearchHistoryItem} from "@src/models";
import {QueryKeys} from "@constants/query-keys";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";

export default function useDeleteSearchHistoryItemMutation() {
  const queryClient = useQueryClient();
  const {setItem, getItem} = useAsyncStorage("search-histories");

  return useMutation<void, Error, string | undefined>(
    async searchHistoryItemId => {
      const result = await getItem();

      let previousSearchHistories = [] as SearchHistoryItem[];

      if (!!result) {
        previousSearchHistories = JSON.parse(result);
      }

      if (!!searchHistoryItemId) {
        previousSearchHistories = previousSearchHistories.filter(
          item => item.id !== searchHistoryItemId,
        );
      } else {
        previousSearchHistories = [];
      }

      return await setItem(JSON.stringify(previousSearchHistories));
    },
    {
      onSuccess() {
        queryClient.refetchQueries([QueryKeys.SEARCH_HISTORY, "LIST"]);
      },
    },
  );
}
