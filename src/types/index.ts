export type User = {
  name: string;
  id: string;
  alias: string;
  tenant: string;
  isAdmin: boolean;
  dbUserName: string;
  dbPassword: string;
  picture: string;
  dataSources: string[];
};

export type Admin = {
  name: string;
  id: string;
  alias: string;
};

export type Customer = {
  description: string;
  url: string;
  id: string;
  usersLimit: number;
};

export type CustomerUser = {
  name: string;
  id: string;
  alias: string;
  tenant: string;
  isAdmin: boolean;
  dbUserName: string;
  dbPassword: string;
  picture: string;
  dataSources: string[];
};
