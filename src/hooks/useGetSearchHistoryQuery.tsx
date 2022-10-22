import React from "react";
import {SearchHistoryItem} from "@src/models";
import {useQuery} from "@tanstack/react-query";
import {QueryKeys} from "@constants/query-keys";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";

const queryKey = [QueryKeys.SEARCH_HISTORY, "LIST"] as const;

export default function useGetSearchHistoryQuery() {
  const {getItem} = useAsyncStorage("search-histories");

  return useQuery<
    SearchHistoryItem[],
    Error,
    SearchHistoryItem[],
    typeof queryKey
  >(
    queryKey,
    async () => {
      const result = await getItem();

      if (!result) {
        return [];
      }

      return JSON.parse(result);
    },
    {
      networkMode: "always",
    },
  );
}
