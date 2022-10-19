import React from "react";
import {AuthContext} from "@providers/AuthProvider";
import useTryProviderContext from "./useTryProviderContext";

const useAuthContext = () => useTryProviderContext(AuthContext);

export default useAuthContext;
