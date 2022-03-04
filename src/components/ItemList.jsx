import { useState, useEffect, useContext } from "react";
import { getItemsForSale } from "../utils/apiRequests";
import { ItemTile } from './ItemTile'
import { ArrangementButton } from './ArrangementButton';
import { AddToBasket } from '../utils/apiRequests';
import { UserContext } from '../contexts/UserLogin';


export function ItemList() {
    const [itemsForSale, setItemsForSale] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { userDetails } = useContext(UserContext);

  useEffect(() => {
      getItemsForSale().then(({items}) => {
          setItemsForSale(items)
          setIsLoading(false)
      });
  }, []);
    
    const hanldeClick = (e) => {
        AddToBasket(e.target.value, userDetails.username)
    }
    
    return isLoading ? <h2>Loading ...</h2> : (
        <ul>
            <ArrangementButton setItemsForSale={setItemsForSale} />
            {itemsForSale.map(item => {
                return (
                    <li key={item.item_id}>
                        <ItemTile item={item} />
                        <button value={item.item_id} onClick={hanldeClick}>Add to basket</button>
                </li>
            )
        })}
    </ul>
    )
}
