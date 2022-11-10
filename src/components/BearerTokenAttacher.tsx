import React from "react";
import {Axios} from "axios";
import {View, Text} from "react-native";
import {AuthData} from "@src/models";
import {container} from "@src/appEngine";
import {QueryKeys} from "@constants/query-keys";
import {useQueryClient} from "@tanstack/react-query";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";

const queryKey = [QueryKeys.AUTH_DATA];
const httpClient = container.get<Axios>(ServiceProviderTypes.HttpClient);

export default function BearerTokenAttacher(props: React.PropsWithChildren) {
  const queryClient = useQueryClient();

  React.useEffect(() => {
    const authData = queryClient.getQueryData<AuthData>(queryKey);

    if (!!authData) {
      console.log("setting auth token to http client header", authData.token);

      httpClient.defaults.headers.common.Authorization = `Bearer ${authData.token}`;
    } else {
      console.log("removing old auth token from http client header");

      httpClient.defaults.headers.common.Authorization = ``;
    }
  }, [queryClient]);

  return <>{props.children}</>;
}
