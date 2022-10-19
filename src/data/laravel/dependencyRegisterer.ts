import {Container} from "inversify";
import {AuthService} from "./services/AuthService";
import {IAuthService} from "@core/services/AuthService";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";

export const registerLaravelServices = (container: Container) => {
  container
    .bind<IAuthService>(ServiceProviderTypes.AuthService)
    .to(AuthService);
};
