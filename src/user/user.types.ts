export type User = {
  username: string;
  uid: string;
};

export type UserProfile = {
  userUid: string;
  address: string;
  birthdate: string;
};

export type Environment = {
  USER_API_BASE_URL: string;
};
