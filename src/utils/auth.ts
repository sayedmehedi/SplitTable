import {AuthGender, GenderType} from "@constants/auth";

export function makeGenderLabelFromValue(gender: GenderType) {
  if (gender === AuthGender.MEN) {
    return "Male";
  }

  if (gender === AuthGender.WOMEN) {
    return "Female";
  }

  return "Other";
}
