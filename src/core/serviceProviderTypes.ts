/**
 * InversifyJS need to use the type as identifiers at runtime.
 * We use symbols as identifiers but you can also use classes and or string literals.
 */
export const ServiceProviderTypes = {
  HttpClient: Symbol("HttpClient"),
  UserService: Symbol("UserService"),
  AuthService: Symbol("AuthService"),
  MenuService: Symbol("MenuService"),
  ClubService: Symbol("ClubService"),
  ReviewService: Symbol("ReviewService"),
  LocationService: Symbol("LocationService"),
  NotificationService: Symbol("NotificationService"),
};
