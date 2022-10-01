import { useFormContext, useWatch } from "react-hook-form";
import { usePostByIdQuery } from "../hooks/usePostByIdQuery";

function Post() {
  const { control } = useFormContext();
  const pid = useWatch({ control, name: "pid" });
  const { data: currentPost, isLoading, isError } = usePostByIdQuery(pid);

  if (isLoading) {
    return <div>Loading post..</div>;
  }

  if (isError) {
    return <div>Something went wrong loading the post</div>;
  }

  return (
    <div>
      <h1>{currentPost.title}</h1>
      <p>{currentPost.body}</p>
    </div>
  );
}

export default Post;
