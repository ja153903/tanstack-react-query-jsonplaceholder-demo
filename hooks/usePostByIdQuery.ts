import { useQuery } from "@tanstack/react-query";

async function fetchPostByUserId(pid: string) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${pid}`
    );
    return await response.json();
  } catch (e) {
    return e;
  }
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export function usePostByIdQuery(pid: string) {
  return useQuery<Post>(["posts", pid], () => fetchPostByUserId(pid));
}
