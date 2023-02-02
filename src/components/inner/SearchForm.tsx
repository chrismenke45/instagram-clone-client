import React, { useState, useRef, useEffect } from 'react';
import SearchBar from '../inner/SearchBar';

interface Props {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    searchType: string;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleSearchTypeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showSearchOptions: boolean;
    setShowSearchOptions: (value: React.SetStateAction<boolean>) => void;
}

const SearchForm: React.FC<Props> = (props) => {
    const {
        search,
        setSearch,
        searchType,
        handleSubmit,
        handleSearchTypeChange,
        showSearchOptions,
        setShowSearchOptions,
    } = props
    const submitRef = useRef<HTMLButtonElement>(null)



    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        setShowSearchOptions(true)
    }

    useEffect(() => {
        if (search && submitRef?.current) {
            submitRef.current.click()
        } else {
            setShowSearchOptions(false)
        }
    }, [search])

    return (
        <form id="searchForm" onSubmit={handleSubmit}>
            <SearchBar handleSearchChange={handleSearchChange} />
            {showSearchOptions ?
                <div id="searchOptions">
                    <input
                        type="radio"
                        name="searchType"
                        id="accountsRadioOption"
                        value="accounts"
                        onChange={handleSearchTypeChange}
                        checked={searchType === "accounts"}
                        hidden={true}
                    >
                    </input>
                    <label htmlFor='accountsRadioOption'>Accounts</label>
                    <input
                        type="radio"
                        name="searchType"
                        id="postsRadioOption"
                        value="posts"
                        onChange={handleSearchTypeChange}
                        checked={searchType === "posts"}
                        hidden={true}
                    >
                    </input>
                    <label htmlFor='postsRadioOption'>Posts</label>
                </div>
                :
                null
            }
            <button ref={submitRef} type='submit' hidden={true}></button>
        </form>
    );
}

export default SearchForm;