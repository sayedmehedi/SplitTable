export const FriendshipStatuseText = {
  FRIEND: "Friend",
  PENDING: "Pending",
  REJECTED: "Rejected",
} as const;

export type FriendshipStatus =
  typeof FriendshipStatuseText[keyof typeof FriendshipStatuseText];

export const FriendshipStatusNum = {
  PENDING: 0,
  ACCEPTED: 1,
  REJECTED: 2,
} as const;

export type TFriendshipStatusNum =
  typeof FriendshipStatusNum[keyof typeof FriendshipStatusNum];
