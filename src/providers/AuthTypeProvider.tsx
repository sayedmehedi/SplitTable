import React from "react";
import {AuthTypes} from "@constants/auth";

export const AuthTypeContext = React.createContext<{
  authType: null | typeof AuthTypes[keyof typeof AuthTypes];
  changeAuthType: (
    newAuthType: null | typeof AuthTypes[keyof typeof AuthTypes],
  ) => void;
}>({
  authType: null,
  changeAuthType() {},
});

export default function AuthTypeProvider({children}: React.PropsWithChildren) {
  const [authType, setAuthType] = React.useState<
    null | typeof AuthTypes[keyof typeof AuthTypes]
  >(null);

  const changeAuthType = (
    newAuthType: null | typeof AuthTypes[keyof typeof AuthTypes],
  ) => {
    setAuthType(newAuthType);
  };

  return (
    <AuthTypeContext.Provider value={{authType, changeAuthType}}>
      {children}
    </AuthTypeContext.Provider>
  );
}
