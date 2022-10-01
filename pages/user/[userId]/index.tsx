import { useRouter } from "next/router";
import UserProfileScreen from "../../../screens/UserProfileScreen";

function UserPage() {
  // the router here is working as the context, but is this appropriate?
  // should we have some sort of provider
  // where we keep track of the current user?
  const router = useRouter();
  const { userId } = router.query;

  const handleBackToUsersClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <UserProfileScreen
      userId={userId as string}
      onBackToUsersClick={handleBackToUsersClick}
    />
  );
}

export default UserPage;
