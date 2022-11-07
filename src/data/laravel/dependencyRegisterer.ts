import {Container} from "inversify";
import {MenuService} from "./services/MenuService";
import {AuthService} from "./services/AuthService";
import {ClubService} from "./services/ClubService";
import {ReviewService} from "./services/ReviewService";
import {IMenuService} from "@core/services/IMenuService";
import {IAuthService} from "@core/services/IAuthService";
import {IClubService} from "@core/services/IClubService";
import {LocationService} from "./services/LocationService";
import {IReviewService} from "@core/services/IReviewService";
import {ServiceProviderTypes} from "@core/serviceProviderTypes";
import {ILocationService} from "@core/services/ILocationService";
import {NotificationService} from "./services/NotificationService";
import {INotificationService} from "@core/services/INotificationService";
import {UserService} from "./services/UserService";
import {IUserService} from "@core/services/IUserService";

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

  container
    .bind<INotificationService>(ServiceProviderTypes.NotificationService)
    .to(NotificationService);

  container
    .bind<IMenuService>(ServiceProviderTypes.MenuService)
    .to(MenuService);

  container
    .bind<IReviewService>(ServiceProviderTypes.ReviewService)
    .to(ReviewService);

  container
    .bind<IUserService>(ServiceProviderTypes.UserService)
    .to(UserService);
};
