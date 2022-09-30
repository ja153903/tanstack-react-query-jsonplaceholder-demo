import { usePostsByUserIdQuery } from "../hooks/usePostsByUserIdQuery";
import { useFormContext } from "../providers/FormProvider";

type SelectPostProps = {
  uid: string;
};

function SelectPost({ uid }: SelectPostProps) {
  const { pid, setPid } = useFormContext()!;
  const {
    data: posts,
    isLoading,
    isError,
  } = usePostsByUserIdQuery(uid, {
    onSuccess: (posts) => {
      setPid(posts[0].id.toString());
    },
  });

  if (isLoading) {
    return <div>Loading results</div>;
  }

  if (isError) {
    return <div>No results to load</div>;
  }

  return (
    <select value={pid} onChange={(e) => setPid(e.target.value)}>
      {posts.map((post) => (
        <option key={post.id} value={post.id}>
          {post.title}
        </option>
      ))}
    </select>
  );
}

export default SelectPost;
