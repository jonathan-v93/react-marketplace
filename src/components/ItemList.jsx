import { useState, useEffect, useContext } from "react";
import { getItemsForSale } from "../utils/apiRequests";
import { ItemTile } from "./ItemTile";
import { ArrangementButton } from "./ArrangementButton";
import { AddToBasket } from "../utils/apiRequests";
import { UserContext } from "../contexts/UserLogin";
import { PageButtons } from "./PageButton";

export function ItemList() {
  const { userDetails } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [itemsForSale, setItemsForSale] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(undefined);
  const [category, setCategory] = useState(undefined);
  const [search, setSearch] = useState(undefined);

  useEffect(() => {
    getItemsForSale(limit, page, sortBy, search, category).then(
      ({ items, total_items }) => {
        setItemsForSale(items);
        setTotalItems(total_items);
        setIsLoading(false);
      }
    );
  }, [limit, page, sortBy, category, isLoading, search]);

  const addToBasket = (e) => {
    if (userDetails) {
      AddToBasket(e.target.value, userDetails.username);
      alert("Added to basket!");
    } else {
      alert("Please log in to add items to your basket!");
    }
  };

  const numOfPages = () => {
    return Math.floor(+totalItems / +limit);
  };

  const changePage = (e) => {
    setPage(e.target.value);
    setIsLoading(true);
  };

  return isLoading ? (
    <h2>Loading ...</h2>
  ) : (
    <ul>
      <ArrangementButton
        setSortBy={setSortBy}
        setCategory={setCategory}
        limit={limit}
        page={page}
        setIsLoading={setIsLoading}
        setItemsForSale={setItemsForSale}
        setLimit={setLimit}
        setSearch={setSearch}
      />
      {itemsForSale.map((item) => {
        return (
          <li key={item.item_id}>
            <ItemTile item={item} />
            <button value={item.item_id} onClick={addToBasket}>
              Add to basket
            </button>
          </li>
        );
      })}
      <PageButtons
        numOfPages={numOfPages}
        changePage={changePage}
        setPage={setPage}
      />
    </ul>
  );
}
