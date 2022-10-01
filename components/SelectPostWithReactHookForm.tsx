import { useFormContext } from "react-hook-form";
import { usePostsByUserIdQuery } from "../hooks/usePostsByUserIdQuery";

type SelectPostProps = {
  uid: string;
};

function SelectPost({ uid }: SelectPostProps) {
  const { register, setValue } = useFormContext();
  const {
    data: posts,
    isLoading,
    isError,
  } = usePostsByUserIdQuery(uid, {
    onSuccess: (posts) => {
      setValue("pid", posts[0].id.toString());
    },
  });

  if (isLoading) {
    return <div>Loading results</div>;
  }

  if (isError) {
    return <div>No results to load</div>;
  }

  return (
    <select {...register("pid")}>
      {posts.map((post) => (
        <option key={post.id} value={post.id}>
          {post.title}
        </option>
      ))}
    </select>
  );
}

export default SelectPost;
