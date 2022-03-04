import { useState } from "react";
import { getItemsForSale } from "../utils/apiRequests";

export function ArrangementButton({setItemsForSale, setLimit}) {
  const [category, setCategory] = useState([
    "Electronics",
    "Relics",
    "Household",
  ]);
    const onClick = (e) => {
        getItemsForSale().then(({ items }) => {
            const filteredItems = items.filter(item => item.category_name === e.target.value);
            setItemsForSale(filteredItems)
            
        })
    }
    
    const changePageLimit = (e) => {
      e.preventDefault()
      setLimit(e.target.value)
    }

  return (
    <><h5>Filter by</h5>
      {category.map((cat) => {
        return <button value={cat} onClick={onClick} key={cat}>{cat}</button>;
      })}
      <span>Items per page:</span>
      <form onChange={changePageLimit}>
      <select>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select></form>
    </>
  );
}
