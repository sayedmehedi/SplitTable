import {CustomerProfileData, GetProfileDataResponse} from "@src/models";

export function isCustomerProfile(
  profile: GetProfileDataResponse | undefined | null,
): profile is CustomerProfileData {
  return !!profile && !("job_role" in profile);
}
