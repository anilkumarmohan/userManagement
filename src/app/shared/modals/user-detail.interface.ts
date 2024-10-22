export interface UserDetails {
    id?: number;
    name?: string;
    username?: string,
    email?: string;
    address?: address;
    geo?: any;
  } 

  export interface address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  }