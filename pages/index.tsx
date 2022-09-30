import { useRouter } from "next/router";
import type { NextPage } from "next";
import UserListScreen from "../screens/UserListScreen";

const Home: NextPage = () => {
  const router = useRouter();
  // these event handlers have to be passed down into the screen
  // if they require Next.js specific functions
  const handleUserClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    uid: number
  ) => {
    e.preventDefault();
    router.push(`/user/${uid}`);
  };

  return <UserListScreen handleClick={handleUserClick} />;
};

export default Home;
