import {IToastProps, useToast} from "native-base";
import React from "react";

export default function useAppToast() {
  const {show} = useToast();

  const success = React.useCallback(
    (title: string, props: Omit<IToastProps, "title"> = {}) => {
      show({
        title,
        bg: "success.600",
        variant: "solid",
        ...props,
      });
    },
    [],
  );

  const error = React.useCallback(
    (title: string, props: Omit<IToastProps, "title"> = {}) => {
      show({
        title,
        bg: "error.600",
        variant: "solid",
        ...props,
      });
    },
    [],
  );

  return {
    success,
    error,
  };
}
