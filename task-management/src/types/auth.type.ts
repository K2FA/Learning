export type RegisterType = {
  fullname: string;
  email: string;
  password: string;
  create_at?: Date;
};

export type LoginType = {
  email: string;
  password: string;
};
