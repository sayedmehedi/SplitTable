import {
  OwnerProfileData,
  CustomerProfileData,
  GetProfileDataResponse,
} from "@src/models";

export function isCustomerProfile(
  profile: GetProfileDataResponse | undefined | null,
): profile is CustomerProfileData {
  return !isOwnerProfile(profile);
}

export function isOwnerProfile(
  profile: GetProfileDataResponse | undefined | null,
): profile is OwnerProfileData {
  return !!profile && "club" in profile && "job_role" in profile;
}
