import { Link, Routes, Route } from "react-router-dom";
import { Login } from "./Login";

export function User({ username }) {
  if (!username) {
    return (
      <>
        <Link to="/user/login">Login</Link>
      </>
    );
  }
  return (
    <>
      <p>logged in!</p>
    </>
  );
}
