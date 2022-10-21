import {Container} from "inversify";
import {AuthService} from "./services/AuthService";
import {ClubService} from "./services/ClubService";
import {IAuthService} from "@core/services/IAuthService";
import {IClubService} from "@core/services/IClubService";
import {LocationService} from "./services/LocationService";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {ILocationService} from "@core/services/ILocationService";

export const registerLaravelServices = (container: Container) => {
  container
    .bind<IAuthService>(ServiceProviderTypes.AuthService)
    .to(AuthService);

  container
    .bind<IClubService>(ServiceProviderTypes.ClubService)
    .to(ClubService);

  container
    .bind<ILocationService>(ServiceProviderTypes.LocationService)
    .to(LocationService);
};
