import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserLogin";
import { useContext } from "react";

export function NavBar() {
  const { userDetails } = useContext(UserContext);

  const displayMsg = () => {
    if (userDetails) {
      return `logged in as ${userDetails.username}`;
    }
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/sell">Sell</Link>
      <Link to="/user">User</Link>
      <span>{displayMsg()}</span>
    </nav>
  );
}
