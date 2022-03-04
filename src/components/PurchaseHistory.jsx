import { useContext } from "react";
import { PurchaseHistoryContext } from "../contexts/PurchaseHistory";
import { ItemTile } from "./ItemTile";

export function PurchaseHistory() {
  const { purchaseHistory } = useContext(PurchaseHistoryContext);

  return (
    <>
      {purchaseHistory.map((item) => {
        return (
          <>
            <ItemTile key={item.item_id} item={item} />
          </>
        );
      })}
    </>
  );
}
