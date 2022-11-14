import React from "react";
import {container} from "@src/appEngine";
import {IReviewService} from "@core/services/IReviewService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {AddClubReviewRequest, AddClubReviewResponse} from "@src/models";
import {
  useMutation,
  MutationFunction,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import {QueryKeys} from "@constants/query-keys";

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
        {ownerId: variables.ownerId},
      ]);
      optionsRef.current?.onSuccess?.(data, variables, context);
    },
  });
}
