import React from "react";
import useDebounce from "./useDebounce";

export const useDebouncedState = <S extends unknown>(
  initialState: S,
  durationInMs: number,
) => {
  const [internalState, setInternalState] = React.useState<S>(initialState);

  const debouncedFunction = useDebounce<S, void>(
    setInternalState,
    durationInMs,
  );

  React.useEffect(() => {
    debouncedFunction(initialState);
  }, [initialState, debouncedFunction]);

  return [internalState, debouncedFunction] as const;
};

export default useDebouncedState;
