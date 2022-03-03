import { useState } from "react";
import { getItemsForSale } from "../utils/apiRequests";

export function ArrangementButton({setItemsForSale}) {
  const [category, setCategory] = useState([
    "Electronics",
    "Relics",
    "Household",
  ]);
    const onClick = (e) => {
        getItemsForSale().then(({ items }) => {
            const filteredItems = items.filter(item => item.category_name === e.target.value);
            console.log(e.target.value);
            setItemsForSale(filteredItems)
            
        })
    }

  return (
    <><h5>Filter by</h5>
      {category.map((cat) => {
        return <button value={cat} onClick={onClick} key={cat}>{cat}</button>;
      })}
    </>
  );
}
