import React from 'react'
import { IoSearchOutline } from "react-icons/io5";

const Search = () => {
    return (
        <div className="search">
            <label htmlFor="searchInput"><IoSearchOutline /></label>
            <input type="text" placeholder='Search' id='searchInput' />
        </div>
    )
}

export default Search
