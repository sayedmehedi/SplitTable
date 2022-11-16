import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {SupportedPaymentMethods} from "@src/models";
import {ConfigService} from "@config/ConfigService";
import useGetAuthDataQuery from "./useGetAuthDataQuery";
import {useQuery, UseQueryOptions} from "@tanstack/react-query";

const configService = container.get<ConfigService>(ConfigService);

type Payload = {
  amount: string;
  bookingId: number;
  paymentMethod: SupportedPaymentMethods;
};

type QueryKey = [typeof QueryKeys.PAYMENT, "GATEWAY", Payload];

export default function useGetPaymentUrlQuery(
  data: {
    amount: string;
    bookingId: number;
    paymentMethod: SupportedPaymentMethods;
  },
  options: UseQueryOptions<string, Error, string, QueryKey> = {},
) {
  const {data: authData, isLoading: isAuthDataLoading} = useGetAuthDataQuery();

  return useQuery<string, Error, string, QueryKey>(
    [QueryKeys.PAYMENT, "GATEWAY", data],
    () => {
      const token = authData?.token;

      const {amount, bookingId, paymentMethod} = data;

      return `${configService.apiBaseURL}/payment?token=${token}&booking_id=${bookingId}&payment_method=${paymentMethod}&amount=${amount}`;
    },
    {
      enabled: !isAuthDataLoading && authData?.token !== undefined,
      networkMode: "always",
      ...options,
    },
  );
}
