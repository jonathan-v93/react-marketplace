import { useState } from "react";
import { postItem } from "../utils/apiRequests";
import { poundsToPence } from "../utils/apiRequests";

export function SellForm() {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setitemDescription] = useState("");
  const [itemImgUrl, setitemImgUrl] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [uploadSuccessfull, setUploadSuccessfull] = useState(false);
  //error states:
  const [nameError, setNameError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [urlError, setUrlError] = useState(null);
  const [priceError, setPriceError] = useState(null);
  const [categoryError, setCategoryError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const info = {
      item_name: itemName,
      description: itemDescription,
      img_url: itemImgUrl,
      price: poundsToPence(itemPrice),
      category_name: itemCategory,
    };
    postItem(info);
    setUploadSuccessfull(true)
  };

  const urlValidation = (e) => {
    const urlRegex =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    return urlRegex.test(e.target.value);
  };

  const priceValidation = (e) => {
    return isNaN(e.target.value);
  };

  const formValidation = (e) => {
    if (e.target.id === "price" && priceValidation(e)) {
      setPriceError("Invalid price");
    } else if (e.target.id === "url" && !urlValidation(e)) {
      setUrlError("Invalid URL");
    } else if (e.target.value.length === 0) {
      const errorMsg = "Required field";
      switch (e.target.id) {
        case "name":
          setNameError(errorMsg);
          break;
        case "description":
          setDescriptionError(errorMsg);
          break;
        case "url":
          setUrlError(errorMsg);
          break;
        case "price":
          setPriceError(errorMsg);
          break;
        case "category":
          setCategoryError(errorMsg);
          break;
        default:
          return
      }
    } else {
      const errorMsg = "";
      switch (e.target.id) {
        case "name":
          setNameError(errorMsg);
          break;
        case "description":
          setDescriptionError(errorMsg);
          break;
        case "url":
          setUrlError(errorMsg);
          break;
        case "price":
          setPriceError(errorMsg);
          break;
        case "category":
          setCategoryError(errorMsg);
          break;
        default:
          return;
      }
    }
  };

  return uploadSuccessfull ? <h2>Post succesfully submitted!</h2> : (
    <form onSubmit={handleSubmit}>
      <ul>
        <li>
          <label htmlFor="name">What are you wanting to sell?</label>
          <input
            onChange={(e) => setItemName(e.target.value)}
            onBlur={formValidation}
            placeholder="item name"
            id="name"
            value={itemName}
          ></input>
          <div>{nameError}</div>
        </li>
        <li>
          <label htmlFor="deascription">Tell us more about it</label>
          <input
            onChange={(e) => setitemDescription(e.target.value)}
            onBlur={formValidation}
            placeholder="item description"
            id="description"
            value={itemDescription}
          ></input>
          <div>{descriptionError}</div>
        </li>
        <li>
          <label htmlFor="url">Pass us a picture!</label>
          <input
            onChange={(e) => setitemImgUrl(e.target.value)}
            onBlur={formValidation}
            placeholder="picture url"
            id="url"
            value={itemImgUrl}
          ></input>
          <div>{urlError}</div>
        </li>
        <li>
          <label htmlFor="price">How much?</label>
          <input
            onChange={(e) => setItemPrice(e.target.value)}
            onBlur={formValidation}
            placeholder="price in pounds"
            id="price"
            value={itemPrice}
          ></input>
          <div>{priceError}</div>
        </li>
        <li>
          <label htmlFor="category">What category does it fall under?</label>
          <input
            onChange={(e) => setItemCategory(e.target.value)}
            onBlur={formValidation}
            placeholder="e.g. Electronics?"
            id="category"
            value={itemCategory}
          ></input>
          <div>{categoryError}</div>
        </li>
        <button>Submit</button>
      </ul>
    </form>
  );
}
