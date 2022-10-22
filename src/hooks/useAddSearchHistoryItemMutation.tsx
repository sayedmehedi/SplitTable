import React from "react";
import dayjs from "dayjs";
import {SearchHistoryItem} from "@src/models";
import {QueryKeys} from "@constants/query-keys";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";

const CAPACITY = 20;

export default function useAddSearchHistoryItemMutation() {
  const queryClient = useQueryClient();
  const {setItem, getItem} = useAsyncStorage("search-histories");

  return useMutation<void, Error, SearchHistoryItem>(
    async newSearchHistoryItem => {
      const result = await getItem();

      let previousSearchHistories = [] as SearchHistoryItem[];

      if (!!result) {
        previousSearchHistories = JSON.parse(result);
      }

      previousSearchHistories.push(newSearchHistoryItem);

      previousSearchHistories.sort((sh1, sh2) => {
        const sh1LastUsedTime = sh1.lastUsedTime;
        const sh2LastUsedTime = sh2.lastUsedTime;

        if (dayjs(sh1LastUsedTime).isSame(sh2LastUsedTime)) {
          return 0;
        }

        if (dayjs(sh1LastUsedTime).isBefore(sh2LastUsedTime)) {
          return -1;
        }

        return 1;
      });

      while (previousSearchHistories.length > CAPACITY) {
        previousSearchHistories.unshift();
      }

      return await setItem(JSON.stringify(previousSearchHistories));
    },
    {
      onSuccess() {
        queryClient.invalidateQueries([QueryKeys.SEARCH_HISTORY, "LIST"]);
      },
    },
  );
}
