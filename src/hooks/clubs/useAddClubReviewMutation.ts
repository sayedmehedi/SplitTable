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
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  return useMutation<
    AddClubReviewResponse,
    ApplicationError,
    AddClubReviewRequest
  >(mutationFunction, {
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries([
        QueryKeys.REVIEW,
        "LIST",
        "infinite",
        {ownerId: variables.reviewerId},
      ]);
      optionsRef.current?.onSuccess?.(data, variables, context);
    },
  });
}