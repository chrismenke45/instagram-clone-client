import React, { useState, useRef, useEffect } from 'react';
import FetchAPI from '../../functions/fetch/FetchAPI';
import { FiSearch } from 'react-icons/fi'
import Grid from '../inner/Grid';
import { UserInListProp } from '../../models/UserInListProp';
import SearchUsersList from '../inner/SearchUsersList';
import getUserObject from '../../functions/user/getUserObject';

const Home: React.FC = () => {
    const fetcher = new FetchAPI()
    const [search, setSearch] = useState<string>("")
    const submitRef = useRef<HTMLButtonElement>(null)
    const [userList, setUserList] = useState<UserInListProp[]>([])
    const [searchType, setSearchType] = useState<string>("accounts")
    const [showSearchOptions, setShowSearchOptions] = useState<boolean>(false)
    const user = getUserObject()


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        setShowSearchOptions(true)
    }

    const handleSearchTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchType(e.target.value)
        if (e.target.value !== "accounts") { setUserList([]) }
    }

    useEffect(() => {
        if (search && submitRef?.current) {
            submitRef.current.click()
        } else {
            setShowSearchOptions(false)
        }
    }, [search])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let url = `users?search=${search}`
        console.log(search, searchType)
        /// `posts?preview=true&search=${search}`
        if (searchType === "accounts") {
            fetcher.fetchData(url, "GET", user.jwt)
                .then(users => setUserList(users))
        }
    }
    return (
        <main>
            <form id="searchForm" onSubmit={handleSubmit}>
                <div id="searchBar">
                    <FiSearch></FiSearch>
                    <input
                        type="text"
                        maxLength={25}
                        placeholder="Search"
                        onChange={handleSearchChange}>
                    </input>
                </div>
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
            {search && searchType === "accounts" ?
                userList.length === 0 ?
                    <p id="noResults">No Results</p>
                    :
                    <SearchUsersList users={userList} />
                :
                search && searchType === "posts" ?
                    <Grid gridPath={`posts?preview=true&search=${search}`} />
                    :
                    <Grid gridPath={`posts?preview=true&discover=true`} />
            }

        </main>
    );
}

export default Home;