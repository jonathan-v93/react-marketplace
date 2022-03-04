export function UserTile({ user }) {
  return (
    <li>
      <h2>{user.username}</h2>
      <img src={user.avatar_url}></img>
      <p>kudos: {user.kudos}</p>
    </li>
  );
}
