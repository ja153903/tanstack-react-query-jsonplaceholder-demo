import { useQuery } from "@tanstack/react-query";

/**
 *   {
 *     "id": 1,
 *     "name": "Leanne Graham",
 *     "username": "Bret",
 *     "email": "Sincere@april.biz",
 *     "address": {
 *       "street": "Kulas Light",
 *       "suite": "Apt. 556",
 *       "city": "Gwenborough",
 *       "zipcode": "92998-3874",
 *       "geo": {
 *         "lat": "-37.3159",
 *         "lng": "81.1496"
 *       }
 *     },
 *     "phone": "1-770-736-8031 x56442",
 *     "website": "hildegard.org",
 *     "company": {
 *       "name": "Romaguera-Crona",
 *       "catchPhrase": "Multi-layered client-server neural-net",
 *       "bs": "harness real-time e-markets"
 *     }
 */

export interface GeoLocation {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoLocation;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

async function fetchUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    return await response.json();
  } catch (e) {
    return e;
  }
}

export function useUsersQuery() {
  return useQuery<User[]>(["users"], fetchUsers);
}
