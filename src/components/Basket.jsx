import { BasketContext } from "../contexts/Basket";
import { useContext } from "react";
import { ItemTile } from "./ItemTile";
import { removeFromBasket, postToOrders } from "../utils/apiRequests";
import { UserContext } from "../contexts/UserLogin";

export function Basket() {
  const { basketDetails, setBasketDetails } = useContext(BasketContext);
  const { userDetails } = useContext(UserContext);

  const handleClick = (e) => {
    removeFromBasket(e.target.value, userDetails.username)
      .then(() => {
        const newBasketForDom = basketDetails.filter((item) => {
          return item.item_id !== Number(e.target.value);
        });
        setBasketDetails(newBasketForDom);
      })
      .catch((err) => console.log(err));
  };

  const handleBuyAllClick = () => {
    const orderPromises = basketDetails.map((item) => {
      return postToOrders(item.item_id, userDetails.username);
    });
    return Promise.all(orderPromises)
      .then(() => {
        const deletePromises = basketDetails.map((item) => {
          return removeFromBasket(item.item_id, userDetails.username);
        });
        return Promise.all(deletePromises);
      })
      .then(() => {
        setBasketDetails([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const buyAllButton = () => {
    if (basketDetails.length === 0) return null;
    return <button onClick={handleBuyAllClick}>Buy All</button>;
  };

  return (
    <>
      <h2>Basket</h2>
      {basketDetails.map((item) => {
        return (
          <>
            <ItemTile key={item.item_id} item={item} />
            <button
              value={item.item_id}
              onClick={handleClick}
              key={`{item.item_id}-button`}
            >
              Remove From Basket
            </button>
          </>
        );
      })}
      <div>{buyAllButton()}</div>
    </>
  );
}
