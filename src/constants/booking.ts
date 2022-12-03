export const BookingTypes = {
  UPCOMING: "upcoming",
  HISTORY: "history",
} as const;

export type BookingType = typeof BookingTypes[keyof typeof BookingTypes];
