import { useState, useEffect } from "react";
import { getCategories, getItemsForSale } from "../utils/apiRequests";

export function ArrangementButton({ setLimit, setCategory, setSortBy, setSearch }) {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [sortByOptions, setSortByOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState(undefined);


  useEffect(() => {
    Promise.all([getCategories(), getItemsForSale()])
      .then(([categoryData, {items}]) => {
        const categoryArr = categoryData.map((item) => {
          return item.category_name;
        });
     
        const sortByArr = Object.keys(items[0]);
        console.log(sortByArr);
        setSortByOptions(sortByArr);
        setCategoryOptions(categoryArr);
      })
      .catch((err) => console.log);
  }, []);


  const selectCategory = (e) => {
    e.preventDefault()
    setCategory(e.target.value);
  };

  const changePageLimit = (e) => {
    e.preventDefault();
    setLimit(e.target.value);
  };

  const sortItems = (e) => {
    e.preventDefault();
    setSortBy(e.target.value);
  };

  const searchBarSubmit = (e) => {
    e.preventDefault();
    setSearch(searchQuery);
  }

  const handleSearchInput = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  }

  return (
    <>
      <form onSubmit={searchBarSubmit}>
        <input onChange={handleSearchInput} placeholder="Search Items" value={searchQuery}></input>
        <button>Search</button>
      </form>
      <label htmlFor="categoryDropdown">Filter By category</label>
      <form id="categoryDropdown" onChange={selectCategory}>
        <select>
          {categoryOptions.map((category) => {
            return (
              <option value={category} key={category}>
                {category}
              </option>
            );
          })}
        </select>
      </form>

      <label htmlFor="sortByDropdown">Sort By</label>
      <form id="sortByDropdown" onChange={sortItems}>
        <select>
          {sortByOptions.map((key) => {
            return (
              <option value={key} key={key}>
                {key}
              </option>
            );
          })}
        </select>
      </form>

      <label htmlFor="pageDropdown">Items per page:</label>
      <form id="pageDropdown" onChange={changePageLimit}>
        <select>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </form>
    </>
  );
}
