import {splitAppTheme} from "@src/theme";

export const BookingTypes = {
  UPCOMING: "upcoming",
  HISTORY: "history",
} as const;

export type BookingTypesType = typeof BookingTypes[keyof typeof BookingTypes];

export const BookingStatuses = {
  UPCOMING: "Upcoming",
  COMPLETED: "Completed",
  CANCELLED: "Canceled",
} as const;

export type BookingStatusesType =
  typeof BookingStatuses[keyof typeof BookingStatuses];

export const BookingStatusColors = {
  [BookingStatuses.UPCOMING]: splitAppTheme.colors.success[400],
  [BookingStatuses.COMPLETED]: splitAppTheme.colors.yellow[400],
  [BookingStatuses.CANCELLED]: splitAppTheme.colors.red[400],
} as const;
