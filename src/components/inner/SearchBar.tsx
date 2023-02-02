import React from 'react';
import { FiSearch } from 'react-icons/fi'

interface Props {
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const SearchBar: React.FC<Props> = (props) => {
const { handleSearchChange } = props 

    return (
                <div id="searchBar">
                    <FiSearch></FiSearch>
                    <input
                        type="text"
                        maxLength={25}
                        placeholder="Search"
                        onChange={handleSearchChange}>
                    </input>
                </div>
       
    );
}

export default SearchBar;