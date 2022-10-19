import {Container} from "inversify";
import {AuthService} from "./services/AuthService";
import {IAuthService} from "@core/services/IAuthService";
import {FrontendService} from "./services/FrontendService";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {IFrontendService} from "@core/services/IFrontendService";

export const registerLaravelServices = (container: Container) => {
  container
    .bind<IAuthService>(ServiceProviderTypes.AuthService)
    .to(AuthService);

  container
    .bind<IFrontendService>(ServiceProviderTypes.FrontendService)
    .to(FrontendService);
};
