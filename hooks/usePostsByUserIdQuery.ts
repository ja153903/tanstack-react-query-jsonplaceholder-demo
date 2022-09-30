import { useQuery } from "@tanstack/react-query";

async function fetchPostsByUserId(uid: string) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${uid}`
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

type PostList = Omit<Post, "userId" | "body">[];

export function usePostsByUserIdQuery(
  uid: string,
  { onSuccess }: { onSuccess: (posts: PostList) => void }
) {
  return useQuery<PostList>(
    ["posts", "list", "userId", uid],
    () => fetchPostsByUserId(uid),
    {
      select: (posts) => posts.map(({ id, title }) => ({ id, title })),
      onSuccess,
    }
  );
}
