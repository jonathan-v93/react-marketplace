import axios from "axios";

const url = axios.create({
  baseURL: "https://nc-marketplace.herokuapp.com/api",
});

export function getItemsForSale(limit = 5, p = 1, sortBy, search, category) {
  let pathStr = `/items?limit=${limit}&p=${p}`;
  if (sortBy) pathStr += `&sort_by=${sortBy}`;
  if (category) pathStr += `&category_name=${category}`;
  if (search) pathStr += `&search=${search}`;

  return url
    .get(pathStr)
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
  return url.get(`/users/${username}`).then(({ data }) => {
    return data;
  });
}

export function getUserBasket(username) {
  return url
    .get(`/users/${username}/basket`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log(err));
}

export function getUserPurchaseHistory(username) {
  return url
    .get(`/users/${username}/orders`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log(err));
}

export function removeFromBasket(itemId, username) {
  return url.delete(`/users/${username}/basket/${itemId}`);
}

export function AddToBasket(item_id, username) {
  const body = { item_id };
  return url
    .post(`/users/${username}/basket`, body)
    .catch((err) => console.log(err));
}

export function postToOrders(item_id, username) {
  const body = { item_id };
  return url
    .post(`/users/${username}/orders`, body)
    .catch((err) => console.log(err));
}

export function getUsers() {
  return url
    .get(`/users`)
    .then(({ data: { users } }) => {
      return users;
    })
    .catch((err) => console.log(err));
}

export function patchUser(kudos_inc, username, avatar_url) {
  const body = { kudos_inc, avatar_url };
  return url
    .patch(`/users/${username}`, body)
    .catch((err) => {
      console.log(err);
    });
}

export function getCategories() {
  return url.get('/categories').then(({ data: { categories } }) => {
    return categories
  }).catch(err => console.log(err));
}