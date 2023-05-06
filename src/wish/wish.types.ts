export type CreateWishDto = {
  name: string;
  wish: string;
};

export type Wish = {
  name: string;
  address: string;
  wish: string;
};

export type EnvironmentVariables = {
  WISH_EMAIL_SENDER_ADDRESS: string;
  WISH_EMAIL_SEND_TO_ADDRESS: string;
};
