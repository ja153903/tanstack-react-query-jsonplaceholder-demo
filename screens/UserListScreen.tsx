import { useUsersQuery } from "../hooks/useUsersQuery";

// @ts-ignore
function UserListScreen({ handleClick }) {
  const { data: users, isLoading, isError } = useUsersQuery();

  if (isLoading) {
    return <div>Fake spinner go brrr</div>;
  }

  if (isError) {
    return <div>Something went wrong fetching the users</div>;
  }

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <button onClick={(e) => handleClick(e, user.id)}>
              {user.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserListScreen;
