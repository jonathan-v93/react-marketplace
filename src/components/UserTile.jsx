export function UserTile({ user }) {
  return (
    <li>
      <h2>{user.username}</h2>
      <img src={user.avatar_url} alt={user.username}></img>
      <p>kudos: {user.kudos}</p>
    </li>
  );
}
