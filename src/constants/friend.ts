export const FriendshipStatuses = {
  FRIEND: "Friend",
  PENDING: "Pending",
  REJECTED: "Rejected",
} as const;

export type FriendshipStatus =
  typeof FriendshipStatuses[keyof typeof FriendshipStatuses];

export const FriendshipStatusQueryParams = {
  PENDING: 0,
  ACCEPTED: 1,
  REJECTED: 2,
} as const;

export type TFriendshipStatusQueryParams =
  typeof FriendshipStatusQueryParams[keyof typeof FriendshipStatusQueryParams];
