import React from "react";
import Toast, {ToastShowParams} from "react-native-toast-message";

export default function useAppToast() {
  const success = React.useCallback(
    (msg: string, props: ToastShowParams = {}) => {
      Toast.show({
        text1: "Success",
        text2: msg,
        ...props,
      });
    },
    [],
  );

  const error = React.useCallback(
    (msg: string, props: ToastShowParams = {}) => {
      Toast.show({
        text1: "Error",
        text2: msg,
        type: "error",
        ...props,
      });
    },
    [],
  );

  const info = React.useCallback((msg: string, props: ToastShowParams = {}) => {
    Toast.show({
      text1: "Info",
      text2: msg,
      type: "info",
      ...props,
    });
  }, []);

  return {
    error,
    success,
    info,
  };
}
