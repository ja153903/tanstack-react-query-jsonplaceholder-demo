import { useState } from "react";
import { useUserByIdQuery } from "../hooks/useUserByIdQuery";
import SelectPost from "../components/SelectPost";
import Post from "../components/Post";
import { FormContext } from "../providers/FormProvider";

type UserProfileScreenProps = {
  userId: string;
};

function UserProfileScreen({ userId }: UserProfileScreenProps) {
  const { data: user, isLoading, isError } = useUserByIdQuery(userId);
  const [pid, setPid] = useState<string>("");

  if (isLoading) {
    return <div>We are fetching the current user</div>;
  }

  if (isError) {
    return <div>Something went wrong fetching the user</div>;
  }

  return (
    <FormContext.Provider value={{ pid, setPid }}>
      <div>
        <p>Hi, this is the profile of {user.name}</p>
        <SelectPost uid={userId} />
        <Post />
      </div>
    </FormContext.Provider>
  );
}

export default UserProfileScreen;
