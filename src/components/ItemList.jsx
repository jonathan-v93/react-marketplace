import { useState, useEffect } from "react";
import { getItemsForSale } from "../utils/apiRequests";
import { ItemTile } from './ItemTile'
import {ArrangementButton} from './ArrangementButton';

export function ItemList() {
    const [itemsForSale, setItemsForSale] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      getItemsForSale().then(({items}) => {
          setItemsForSale(items)
          setIsLoading(false)
      });
  }, []);
    
    return isLoading ? <h2>Loading ...</h2> : (
        <ul>
            <ArrangementButton setItemsForSale={setItemsForSale} />
            {itemsForSale.map(item => {
                return (
                    <li key={item.item_id}>
                        <ItemTile item={item} />
                </li>
            )
        })}
    </ul>
    )
}
