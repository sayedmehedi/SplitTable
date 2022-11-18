import React from "react";
import {AxiosError} from "axios";
import {container} from "@src/appEngine";
import auth from "@react-native-firebase/auth";
import {SocialLoginResponse} from "@src/models";
import {IAuthService} from "@core/services/IAuthService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {LoginManager, AccessToken} from "react-native-fbsdk-next";
import {
  useMutation,
  MutationFunction,
  UseMutationOptions,
} from "@tanstack/react-query";

const authService = container.get<IAuthService>(
  ServiceProviderTypes.AuthService,
);

const loginMutationFunction: MutationFunction<
  SocialLoginResponse
> = async () => {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    "public_profile",
    "email",
  ]);

  if (result.isCancelled) {
    throw new ApplicationError(
      new AxiosError("User cancelled the login process"),
    );
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw new ApplicationError(
      new AxiosError("Something went wrong obtaining access token"),
    );
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );

  const userCreds = await auth().signInWithCredential(facebookCredential);

  const email = userCreds.user.email as string;
  const firstName = userCreds.user.displayName as string;

  const response = await authService.socialLogin({
    email,
    firstName,
  });

  return response.data;
};

export default function useFacobookLoginMutation(
  options?: UseMutationOptions<SocialLoginResponse, ApplicationError>,
) {
  return useMutation<SocialLoginResponse, ApplicationError>(
    loginMutationFunction,
    options,
  );
}
