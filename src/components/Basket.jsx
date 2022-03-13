import { BasketContext } from "../contexts/Basket";
import { useContext, useEffect, useState } from "react";
import { ItemTile } from "./ItemTile";
import { removeFromBasket, postToOrders } from "../utils/apiRequests";
import { UserContext } from "../contexts/UserLogin";

export function Basket() {
  const { basketDetails, setBasketDetails } = useContext(BasketContext);
    const { userDetails } = useContext(UserContext);
    const [successMsg, setSuccessMsg] = useState(null)

  useEffect(() => {}, [basketDetails]);

  const removeFromBasketClick = (e) => {
    removeFromBasket(e.target.value, userDetails.username)
      .then(() => {
        setBasketDetails((currentBasket) => {
          return currentBasket.filter(
            (item) => item.item_id !== Number(e.target.value)
          );
        });
      })
      .catch((err) => console.log(err));
  };
    
  const handleBuyAllClick = () => {
    const orderPromises = basketDetails.map((item) => {
      return postToOrders(item.item_id, userDetails.username);
    });
    const deletePromises = basketDetails.map((item) => {
        return removeFromBasket(item.item_id, userDetails.username);
      });
    return Promise.all([...orderPromises, ...deletePromises])
      .then(() => {
          setBasketDetails([]);
          setSuccessMsg('Items have been successfully bought!')
      })
        .catch((err) => {
          setSuccessMsg('there has been an error, try again!')
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
          <div>{successMsg}</div>
      {basketDetails.map((item) => {
        return (
          <>
            <ItemTile key={item.item_id} item={item} />
            <button
              value={item.item_id}
              onClick={removeFromBasketClick}
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
