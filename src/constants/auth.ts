export const AuthTypes = {
  CUSTOMER: "customer",
  OWNER: "owner",
} as const;

export const AuthTypeNum = {
  CUSTOMER: 3,
  OWNER: 2,
} as const;

export const AuthGender = {
  MEN: "men",
  WOMEN: "women",
  OTHER: "other",
} as const;

export type GenderType = typeof AuthGender[keyof typeof AuthGender];
