import { useQuery } from "@tanstack/react-query";

import type { User } from "./useUsersQuery";

async function fetchUserById(uid: string) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${uid}`
    );
    return await response.json();
  } catch (e) {
    return e;
  }
}

export function useUserByIdQuery(uid: string) {
  return useQuery<User>(["users", uid], () => fetchUserById(uid), {
    enabled: !!uid,
  });
}
