import { usePostByIdQuery } from "../hooks/usePostByIdQuery";
import { useFormContext } from "../providers/FormProvider";

function Post() {
  const { pid } = useFormContext()!;
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
