import { useState } from "react";
import {
  getUser,
  getUserBasket,
  getUserPurchaseHistory,
} from "../utils/apiRequests";
import { UserContext } from "../contexts/UserLogin";
import { useContext, useEffect } from "react";
import { BasketContext } from "../contexts/Basket";
import { PurchaseHistoryContext } from "../contexts/PurchaseHistory";
import { Link } from "react-router-dom";

export function User() {
  const [usernameInput, setUsernameInput] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [basket, setBasket] = useState([]);
  const { userDetails, setUserDetails } = useContext(UserContext);
  const { basketDetails, setBasketDetails } = useContext(BasketContext);
  const { purchaseHistory, setPurchaseHistory } = useContext(
    PurchaseHistoryContext
  );

  useEffect(() => {
    if (!userDetails) return;
    getUserBasket(userDetails.username)
      .then(({ items }) => {
        setBasketDetails(items);
        setBasket(items);
      })
      .then(() => {
        getUserPurchaseHistory(userDetails.username).then(({ items }) => {
          setPurchaseHistory(items);
        });
      });
  }, [userDetails, setBasketDetails, setPurchaseHistory]);

  const onSubmit = (e) => {
    e.preventDefault();
    getUser(usernameInput)
      .then(({ user }) => setUserDetails(user))
      .catch((err) => {
        setLoginError("user does not exist");
      });
    setLoginError(null);
  };

  return userDetails ? (
    <>
      <h2>{userDetails.username}</h2>
      <img src={userDetails.avatar_url} alt={userDetails.username} />
      <div>kudos {userDetails.kudos}</div>
      <Link to="/user/basket">
        <div>Items in basket {basket.length}</div>
      </Link>
      <Link to="/user/purchaseHistory">
        <div>Purchase history {purchaseHistory.length}</div>
      </Link>
    </>
  ) : (
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
