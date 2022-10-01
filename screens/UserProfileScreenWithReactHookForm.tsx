import { useForm, FormProvider } from "react-hook-form";
import { useUserByIdQuery } from "../hooks/useUserByIdQuery";
import SelectPostWithReactHookForm from "../components/SelectPostWithReactHookForm";
import PostWithReactHookForm from "../components/PostWithReactHookForm";

// @ts-ignore
function UserProfileScreenWithReactHookForm({ userId, onBackToUsersClick }) {
  const { data: user, isLoading, isError } = useUserByIdQuery(userId);
  const methods = useForm();

  if (isLoading) {
    return <div>We are fetching the current user</div>;
  }

  if (isError) {
    return <div>Something went wrong fetching the user</div>;
  }

  return (
    <FormProvider {...methods}>
      <div>
        <p>Hi, this is the profile of {user.name}</p>
        <SelectPostWithReactHookForm uid={userId} />
        <PostWithReactHookForm />
        <button onClick={onBackToUsersClick}>Go Back to User List</button>
      </div>
    </FormProvider>
  );
}

export default UserProfileScreenWithReactHookForm;
