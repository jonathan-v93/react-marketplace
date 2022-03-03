import { useState } from "react";
import { getUser } from "../utils/apiRequests";

export function Login({ setUsername }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [loginError, setLoginError] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    getUser(usernameInput)
      .then((user) => setUsername(user))
      .catch((err) => {
        setLoginError("user does not exist");
      });
    setLoginError(null);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input
          onChange={(e) => setUsernameInput(e.target.value)}
          id="username"
          value={usernameInput}
        ></input>
        <button>Login</button>
        <div>{loginError}</div>
      </form>
    </>
  );
}
