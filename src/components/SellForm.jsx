import { useState } from "react";
import { postItem } from 'react';

export function SellForm() {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setitemDescription] = useState("");
  const [itemImgUrl, setitemImgUrl] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemCategory, setItemCategory] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        postItem(info);
     };
    

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        <li>
          <label for="name">What are you wanting to sell?</label>
          <input
            onChange={(e) => setItemName(e.target.value)}
            placeHolder="item name"
            id="name"
            value={itemName}
          ></input>
        </li>
        <li>
          <label for="deascription">Tell us more about it</label>
          <input
            onChange={(e) => setitemDescription(e.target.value)}
            placeholder="Item description"
            id="description"
            value={itemDescription}
          ></input>
        </li>
        <li>
          <label for="url">Pass us a picture!</label>
          <input
            onChange={(e) => setitemImgUrl(e.target.value)}
            placeholder="picture url"
            id="url"
            value={itemImgUrl}
          ></input>
        </li>
        <li>
          <label for="price">How much?</label>
          <input
            onChange={(e) => setItemPrice(e.target.value)}
            placeholder="price in pounds"
            id="price"
            value={itemPrice}
          ></input>
        </li>
        <li>
          <label for="category">What category does it fall under?</label>
          <input
            onChange={(e) => setItemCategory(e.target.value)}
            placeholder="e.g. Electronics?"
            id="category"
            value={itemCategory}
          ></input>
              </li>
              <button>Submit</button>
      </ul>
    </form>
  );
}
