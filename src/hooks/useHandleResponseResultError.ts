import React from "react";
import {ResponseResult} from "@src/models";
import {handleResponseResultError} from "@utils/error-handling";

function useHandleResponseResultError<T extends {}>(
  error: ResponseResult<T> | undefined | null,
) {
  React.useEffect(() => {
    if (error) {
      handleResponseResultError(error);
    }
  }, [JSON.stringify(error)]);

  return null;
}

export default useHandleResponseResultError;
