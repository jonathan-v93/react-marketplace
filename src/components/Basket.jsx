import { BasketContext } from "../contexts/Basket";
import { useContext } from "react";
import { ItemTile } from "./ItemTile";
import { removeFromBasket } from '../utils/apiRequests';
import { UserContext } from '../contexts/UserLogin'

export function Basket() {
    const { basketDetails, setBasketDetails } = useContext(BasketContext);
    const { userDetails } = useContext(UserContext);

    const handleClick = (e) => {
        removeFromBasket(e.target.value, userDetails.username).then(() => {
            const newBasketForDom = basketDetails.filter(item => item.item_id !== e.target.value)
            setBasketDetails(newBasketForDom);
        }).catch(err => console.log(err))
    }

  return (
    <>
      <h2>Basket</h2>
      {basketDetails.map((item) => {
        return (
          <>
            <ItemTile key={item.item_id} item={item} />
            <button value={item.item_id} onClick={handleClick}>Remove From Basket</button>
          </>
        );
      })}
      <button></button>
    </>
  );
}
