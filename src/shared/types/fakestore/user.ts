export type Geolocation = {
  lat: string;
  long: string;
}

export type UserAddress = {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation?: Geolocation;
}

export type UserName = {
  firstname: string;
  lastname: string;
}

export type User = {
  id: number;
  email: string;
  username: string;
  password?: string;
  name?: UserName;
  address?: UserAddress;
  phone?: string;
}
