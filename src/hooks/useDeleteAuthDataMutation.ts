import {StorageKeys} from "@constants/storage";
import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";

function useDeleteAuthDataMutation(
  options: UseMutationOptions<void, Error> = {},
) {
  const {removeItem} = useAsyncStorage(StorageKeys.AUTH_DATA);

  return useMutation<void, Error>(
    () => {
      return removeItem();
    },
    {
      ...options,
      async onSuccess(_data, _variables, _context) {
        options.onSuccess?.(_data, _variables, _context);
      },
    },
  );
}

export default useDeleteAuthDataMutation;
