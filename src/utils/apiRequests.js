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
