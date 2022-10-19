import {injectable} from "inversify";
import {
  REACT_APP_API_BASE_URL,
  REACT_APP_MEDIA_BASE_URL,
} from "react-native-dotenv";

@injectable()
export class ConfigService {
  public get apiBaseURL(): string {
    return REACT_APP_API_BASE_URL;
  }

  public get mediaBaseUrl(): string {
    return REACT_APP_MEDIA_BASE_URL;
  }

  public get contentType(): string {
    return "application/json";
  }

  public get accept(): string {
    return "application/json";
  }
}
