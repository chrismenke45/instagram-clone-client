import React, { useState } from 'react';
import FetchAPI from '../../functions/fetch/FetchAPI';
import Grid from '../inner/Grid';
import { UserInListProp } from '../../models/UserInListProp';
import SearchUsersList from '../inner/SearchUsersList';
import getUserObject from '../../functions/user/getUserObject';
import SearchForm from '../inner/SearchForm';
import LoadingIcon from '../inner/LoadingIcon';

const Search: React.FC = () => {
    const fetcher = new FetchAPI()
    const [search, setSearch] = useState<string>("")
    const [userList, setUserList] = useState<UserInListProp[]>([])
    const [searchType, setSearchType] = useState<string>("accounts")
    const [showSearchOptions, setShowSearchOptions] = useState<boolean>(false)
    const [activelySearching, setActivelySearching] = useState<boolean>(false)
    const user = getUserObject()

    const handleSearchTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchType(e.target.value)
        if (e.target.value !== "accounts") { setUserList([]) }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let url = `users?search=${search}`
        setActivelySearching(true)
        setUserList([])
        if (searchType === "accounts") {
            fetcher.fetchData(url, "GET", user.jwt)
                .then(users => {
                    setUserList(users)
                    setActivelySearching(false)
                })
                .catch(err => {
                    setActivelySearching(false)
                })
        }
    }
    return (
        <main>
            <SearchForm
                search={search}
                setSearch={setSearch}
                searchType={searchType}
                handleSubmit={handleSubmit}
                handleSearchTypeChange={handleSearchTypeChange}
                showSearchOptions={showSearchOptions}
                setShowSearchOptions={setShowSearchOptions}
                areSearchOptionsAvailable={true}
                setActivelySearching={setActivelySearching}
            />
            {search && searchType === "accounts" ?
                userList.length === 0 ?
                    activelySearching ?
                    <LoadingIcon />
                    :
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

export default Search;