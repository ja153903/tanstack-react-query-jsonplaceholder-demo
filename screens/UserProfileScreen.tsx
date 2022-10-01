import { useUserByIdQuery } from "../hooks/useUserByIdQuery";
import SelectPost from "../components/SelectPost";
import Post from "../components/Post";
import { FormContext } from "../providers/FormProvider";
import { useForm } from "../hooks/useForm";
import type { Schema } from "../hooks/useForm";

type UserProfileScreenProps = {
  userId: string;
  onBackToUsersClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const UserProfileFormSchema: Schema = {
  pid: { type: "string" },
  // what if this is driven by async data? We can create schema
  // within the component instead
  users: { type: "multiselect", value: { options: ["1", "2", "4"] } },
};

function UserProfileScreen({
  userId,
  onBackToUsersClick,
}: UserProfileScreenProps) {
  const { data: user, isLoading, isError } = useUserByIdQuery(userId);
  const formMethods = useForm(UserProfileFormSchema);

  if (isLoading) {
    return <div>We are fetching the current user</div>;
  }

  if (isError) {
    return <div>Something went wrong fetching the user</div>;
  }

  return (
    <FormContext.Provider value={formMethods}>
      <div>
        <p>Hi, this is the profile of {user.name}</p>
        <SelectPost uid={userId} />
        <Post />
        <button onClick={onBackToUsersClick}>Go Back to User List</button>
      </div>
    </FormContext.Provider>
  );
}

export default UserProfileScreen;
