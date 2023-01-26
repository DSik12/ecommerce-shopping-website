import React from "react";
import {useNavigateParams} from '../../../util/useNavigateParams';
const Searchbar = () => {
    const navigate = useNavigateParams();
  
    const handleSearchBar = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const searchUrl = "q=" + document.getElementById("searchBar").value;
        navigate("products",  searchUrl);
      }
    }
  
    const handleSearchIcon = (event) => {
      event.preventDefault();
      const searchUrl = "q=" + document.getElementById("searchBar").value;
      navigate("products",  searchUrl);
    }
  return (
    <form className="searchContainer" id="search">
      <input
        type="text"
        className="searchBar"
        id="searchBar"
        placeholder="search"
        onKeyDown={handleSearchBar}
      />
      <img
        className="searchIcon"
        src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
        alt="search-icon"
        onClick={handleSearchIcon}
      />
    </form>
  );
};

export default Searchbar;
