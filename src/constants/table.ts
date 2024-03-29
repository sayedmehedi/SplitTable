export const AppTableListTypes = {
  ALL: "all",
  JOIN: "join",
  SPLIT: "split",
  BOOKED: "booked",
  BY_CLUB_ID: "byClubId",
  BY_LOCATION: "byLocation",
  RECENT_VISIT: "recentVisit",
  SEARCH_RESULT: "searchResult",
} as const;

export const AppTableTypes = {
  SPLIT: "split",
  BOOKED: "booked",
} as const;

export const TableBookingStatusTypes = {
  BOOKED: "Booked",
  EMPTY: "Empty",
} as const;

export const TableCancelStatusTypes = {
  CANCELLED: "Canceled",
  NULL: null,
} as const;
