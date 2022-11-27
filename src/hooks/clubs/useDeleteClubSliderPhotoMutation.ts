import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IClubService} from "@core/services/IClubService";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {DeleteSliderImageRequest, DeleteSliderImageResponse} from "@src/models";
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import {ApplicationError} from "@core/domain/ApplicationError";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

function useDeleteClubSliderPhotoMutation(
  options: UseMutationOptions<
    DeleteSliderImageResponse,
    ApplicationError,
    DeleteSliderImageRequest
  > = {},
) {
  const queryClient = useQueryClient();

  return useMutation<
    DeleteSliderImageResponse,
    ApplicationError,
    DeleteSliderImageRequest
  >(
    value =>
      service.deleteClubSliderImage(value).then(response => response.data),
    {
      ...options,
      async onSuccess(_data, _variables, _context) {
        await queryClient.invalidateQueries([QueryKeys.CLUB, "INFO"]);

        options.onSuccess?.(_data, _variables, _context);
      },
    },
  );
}

export default useDeleteClubSliderPhotoMutation;
