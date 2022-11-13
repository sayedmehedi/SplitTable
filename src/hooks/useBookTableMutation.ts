import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {BookTableRequest, BookTableResponse} from "@src/models";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

function useBookTableMutation(
  options: UseMutationOptions<
    BookTableResponse,
    ApplicationError,
    BookTableRequest
  > = {},
) {
  const queryClient = useQueryClient();

  return useMutation<BookTableResponse, ApplicationError, BookTableRequest>(
    data => {
      return service.bookTable(data).then(response => response.data);
    },
    {
      ...options,
      async onSuccess(_data, _variables, _context) {
        await queryClient.invalidateQueries([QueryKeys.TRANSACTION]);
        await queryClient.invalidateQueries([QueryKeys.UPCOMING_BOOKING]);

        options.onSuccess?.(_data, _variables, _context);
      },
    },
  );
}

export default useBookTableMutation;
