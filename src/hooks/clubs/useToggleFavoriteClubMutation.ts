import React from "react";
import {container} from "@src/appEngine";
import {
  ToggleFavoriteClubRequest,
  ToggleFavoriteClubResponse,
} from "@src/models";
import {IClubService} from "@core/services/IClubService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {
  useMutation,
  MutationFunction,
  UseMutationOptions,
} from "@tanstack/react-query";

const service = container.get<IClubService>(ServiceProviderTypes.ClubService);

const mutationFunction: MutationFunction<
  ToggleFavoriteClubResponse,
  ToggleFavoriteClubRequest
> = async data => {
  const response = await service.toggleFavoriteClub(data);

  return response.data;
};

export default function useToggleFavoriteClubMutation(
  options?: UseMutationOptions<
    ToggleFavoriteClubResponse,
    ApplicationError,
    ToggleFavoriteClubRequest
  >,
) {
  return useMutation<
    ToggleFavoriteClubResponse,
    ApplicationError,
    ToggleFavoriteClubRequest
  >(mutationFunction, options);
}
