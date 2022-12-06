import React from "react";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {IReviewService} from "@core/services/IReviewService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {AddClubReviewRequest, AddClubReviewResponse} from "@src/models";
import {
  useMutation,
  useQueryClient,
  MutationFunction,
  UseMutationOptions,
} from "@tanstack/react-query";

const service = container.get<IReviewService>(
  ServiceProviderTypes.ReviewService,
);

const mutationFunction: MutationFunction<
  AddClubReviewResponse,
  AddClubReviewRequest
> = data => service.addClubReview(data).then(response => response.data);

export default function useAddClubReviewMutation(
  options?: UseMutationOptions<
    AddClubReviewResponse,
    ApplicationError,
    AddClubReviewRequest
  >,
) {
  const queryClient = useQueryClient();

  return useMutation<
    AddClubReviewResponse,
    ApplicationError,
    AddClubReviewRequest
  >(mutationFunction, {
    ...options,
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries([QueryKeys.BOOKING]);
      await queryClient.invalidateQueries([
        QueryKeys.REVIEW,
        "LIST",
        "infinite",
        {ownerId: variables.reviewerId},
      ]);
      options?.onSuccess?.(data, variables, context);
    },
  });
}
