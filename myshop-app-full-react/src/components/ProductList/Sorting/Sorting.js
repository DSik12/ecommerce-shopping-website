import React from 'react';
import data from '../productListConfig/productList.json';
import { lowToHigh, highToLow, bestSeller, featured } from '../productListConfig/productListStatic';

const Sorting = (props) => {

  let productApi = "";

  const checkExistingQuery = (query) => {
    const search = window.location.search;
    if (search) {
      const existingQuery = search.substring(1, search.length);
      if (existingQuery.includes(data.featured)) {
        query = existingQuery.replace(data.featured, query);
        return query;
      }
      else if (existingQuery.includes(data.sortAsc)) {
        query = existingQuery.replace(data.sortAsc, query);
        return query;
      }
      else if (existingQuery.includes(data.sortDesc)) {
        query = existingQuery.replace(data.sortDesc, query);
        return query;
      }
      else if (existingQuery.includes(data.bestSeller)) {
        query = existingQuery.replace(data.bestSeller, query);
        return query;
      }
      else {
        query = `${existingQuery}&${query}`;
        return query;
      }
    }
    else {
      return query;
    }
  };

  const SortingDropDown = (event) => {
    event.preventDefault();
    const selectedDiscount = event;
    selectedDiscount.checked = false;
    const selectedOption = document.getElementById("selectTag");
    switch (selectedOption.value) {
      case lowToHigh:
        productApi = checkExistingQuery(data.sortAsc);
        props.navigate(data.products, productApi);
        break;
      case highToLow:
        productApi = checkExistingQuery(data.sortDesc);
        props.navigate(data.products, productApi);
        break;
      case featured:
        productApi = checkExistingQuery(data.featured);
        props.navigate(data.products, productApi);
        break;
      case bestSeller:
        productApi = checkExistingQuery(data.bestSeller);
        props.navigate(data.products, productApi);
        break;
      default:

        break;
    }
  };


  return (
    <>
        <h3 className="products-heading">Products</h3>
        <div className="products140">
          <p className="products-heading-140" id="productsCount"> </p>
          <p className="filterText">Filter</p>
          <div className="forForm">

            <div className="sort">
              <span>
                <label htmlFor="filter" className="sortLabel">
                  <b>Sort &nbsp;&nbsp;</b>
                </label>
              </span>
              <span>
                <select name="filter" className="filtered" id="selectTag" onChange={SortingDropDown} data-testid="sortingTypes">
                  <option value="none" >Latest</option>
                  <option value="bestSeller">Best Sellers</option>
                  <option value="featured"> Featured Products</option>
                  <option value="lowToHigh">Price - Low to High</option>
                  <option value="highToLow">Price - High to Low</option>
                </select>
              </span>
            </div>

          </div>
        </div>
        

    </>
  )
}

export default Sorting;
