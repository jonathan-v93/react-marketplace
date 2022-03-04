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
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    

  useEffect(() => {
      getItemsForSale(limit).then(({items, total_items}) => {
          setItemsForSale(items)
          setTotalItems(total_items)
          setIsLoading(false)
      });
  }, [limit]);
    
    const hanldeClick = (e) => {
        AddToBasket(e.target.value, userDetails.username)
    }
    
    const numOfPages = () => {
        let pages = Math.floor(limit/totalItems)
                const array = [...Array(pages+1).keys()]
                array.shift()
    }

    return isLoading ? <h2>Loading ...</h2> : (
        <ul>
            <ArrangementButton setItemsForSale={setItemsForSale} setLimit={setLimit}/>
            {itemsForSale.map(item => {
                return (
                    <li key={item.item_id}>
                        <ItemTile item={item} />
                        <button value={item.item_id} onClick={hanldeClick}>Add to basket</button>
                </li>
            )
        })}
    </ul>
    // <ul>

    // </ul>
    )
}
