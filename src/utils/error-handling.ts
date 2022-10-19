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
