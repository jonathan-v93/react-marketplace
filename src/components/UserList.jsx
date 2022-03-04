import { useEffect, useState } from "react";
import { getUsers, patchUser } from "../utils/apiRequests";
import { UserTile } from "./UserTile";

export function UserList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
      setIsLoading(false);
    });
  }, []);

  const handleClick = (e) => {
    const avatar_url = e.target.attributes[1].value;
    const username = e.target.attributes[0].value;
    const kudos_inc = e.target.value;

    patchUser(kudos_inc, username, avatar_url).then(() => {
      setUsers((currentUsers) => {
        const newUsers = currentUsers.map((user) => {
          const currentUser = { ...user };

          if (username === currentUser.username) {
            let currentKudos = Number(currentUser.kudos);
            currentKudos += Number(kudos_inc);
            currentUser.kudos = currentKudos;
            return currentUser;
          }
          return currentUser;
        });
        return newUsers;
      });
    });
  };

  return isLoading ? (
    <h2>Loading ...</h2>
  ) : (
    <>
      {users.map((user) => {
        return (
          <>
            <UserTile user={user} />
            <button
              username={user.username}
              avatar_url={user.avatar_url}
              value={-1}
              onClick={handleClick}
            >
              -
            </button>
            <button
              username={user.username}
              avatar_url={user.avatar_url}
              value={1}
              onClick={handleClick}
            >
              +
            </button>
          </>
        );
      })}
    </>
  );
}
