import React from "react";
import {container} from "@src/appEngine";
import auth from "@react-native-firebase/auth";
import {SocialLoginResponse} from "@src/models";
import {IAuthService} from "@core/services/IAuthService";
import {ApplicationError} from "@core/domain/ApplicationError";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
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
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  const userCreds = await auth().signInWithCredential(googleCredential);

  const email = userCreds.user.email as string;

  const response = await authService.socialLogin({
    email,
    lastName: "",
    firstName: "",
  });

  return response.data;
};

export default function useGoogleLoginMutation(
  options?: UseMutationOptions<SocialLoginResponse, ApplicationError>,
) {
  return useMutation<SocialLoginResponse, ApplicationError>(
    loginMutationFunction,
    options,
  );
}
