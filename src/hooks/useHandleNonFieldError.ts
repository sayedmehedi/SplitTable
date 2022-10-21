import React from "react";
import useAppToast from "./useAppToast";
import {ApplicationError} from "@core/domain/ApplicationError";

function useHandleNonFieldError(error: ApplicationError | undefined | null) {
  const toast = useAppToast();

  console.log("non field error is", error);

  React.useEffect(() => {
    if (error) {
      toast.error(error.non_field_error);
    }
  }, [error?.non_field_error]);

  return null;
}

export default useHandleNonFieldError;
