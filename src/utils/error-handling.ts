import {ResponseResult} from "@src/models";
import Toast from "react-native-toast-message";
import {FieldValues, UseFormSetError} from "react-hook-form";

export function addServerErrors<T extends FieldValues>(
  errors: {[P in keyof T]: string} | Record<keyof T, string>,
  setError: UseFormSetError<T>,
) {
  return Object.keys(errors).forEach(key => {
    setError(key as any, {
      type: "server",
      message: errors[key as keyof T]!,
    });
  });
}

export function isResponseResultError<T extends {}>(
  responseResult: ResponseResult<T>,
): responseResult is {error: string} {
  return "error" in responseResult;
}

export function handleResponseResultError<T extends {}>(
  responseResult: ResponseResult<T>,
) {
  if (isResponseResultError(responseResult)) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: responseResult.error,
    });
  }
}
