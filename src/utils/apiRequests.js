import axios from "axios";

const url = axios.create({
  baseURL: "https://nc-marketplace.herokuapp.com/api",
});

export function getItemsForSale() {
  return url
    .get("/items")
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log(err));
}

export function penceToPounds(priceInPence) {
  const pounds = priceInPence / 100;
  return `£${pounds}`;
}

export function poundsToPence(priceInPounds) {
  return priceInPounds * 100;
}

export function postItem(item) {
  return url
    .get("/categories")
    .then(({ data }) => {
      const categoryArray = data.categories;
      console.log(categoryArray);
      const exists = categoryArray.some(
        (cat) => cat.category_name === item.category_name
      );
      console.log(exists);
      console.log(item.category_name);
      if (!exists)
        return url.post("/categories", { category_name: item.category_name });
    })
    .then(() => {
      return url.post("/items", item);
    })
    .then(() => {
      console.log("item created!");
    })
    .catch((err) => console.log(err));
}

export function getUser(username) {
  return url
    .get(`/users/${username}`)
    .then(({ data }) => {
      return data;
    })
}

export function getUserBasket(username) {
  return url.get(`/users/${username}/basket`).then(({data}) => {
    return data
  }).catch(err => console.log(err))
}

export function getUserPurchaseHistory(username) {
  return url.get(`/users/${username}/orders`).then(({data}) => {
    return data
  }).catch(err => console.log(err))
}


export function removeFromBasket(itemId, username) {
  return url.delete(`/users/${username}/basket/${itemId}`)
}

export function AddToBasket(item_id, username) {
  const body = {item_id}
  return url.post(`/users/${username}/basket`, body).catch(err => console.log(err))
}