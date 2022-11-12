import React from "react";
import useAppToast from "./useAppToast";
import {ApplicationError} from "@core/domain/ApplicationError";

function useHandleNonFieldError(
  error: ApplicationError | Error | undefined | null,
) {
  const toast = useAppToast();

  React.useEffect(() => {
    if (!!error && "non_field_error" in error) {
      toast.error(error.non_field_error);
    } else if (!!error) {
      toast.error(error.message);
    }
  }, [error]);

  return null;
}

export default useHandleNonFieldError;
