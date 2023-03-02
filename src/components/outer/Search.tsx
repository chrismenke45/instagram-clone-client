import React, { useContext, useState } from 'react';
import FetchAPI from '../../functions/fetch/FetchAPI';
import Grid from '../inner/Grid';
import SearchUsersList from '../inner/SearchUsersList';
import getUserObject from '../../functions/user/getUserObject';
import SearchForm from '../inner/SearchForm';
import LoadingIcon from '../inner/LoadingIcon';
import UsersInListContext from '../../stateManagement/contexts/UsersInListContext';
import usersInListActions from '../../stateManagement/actions/usersInListActions';

const Search: React.FC = () => {
    const fetcher = new FetchAPI()
    const [search, setSearch] = useState<string>("")
    const [searchType, setSearchType] = useState<string>("accounts")
    const [showSearchOptions, setShowSearchOptions] = useState<boolean>(false)
    const [activelySearching, setActivelySearching] = useState<boolean>(false)
    const { usersInListState, usersInListDispatch } = useContext(UsersInListContext)
    const user = getUserObject()

    const handleSearchTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchType(e.target.value)
        if (e.target.value !== "accounts") { usersInListDispatch(usersInListActions.SET_USERS([])) }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let url = `users?search=${search}`
        setActivelySearching(true)
        usersInListDispatch(usersInListActions.SET_USERS([]))
        if (searchType === "accounts") {
            fetcher.fetchData(url, "GET", user.jwt)
                .then(users => {
                    usersInListDispatch(usersInListActions.SET_USERS(users))
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
                usersInListState.users.length === 0 ?
                    activelySearching ?
                    <LoadingIcon />
                    :
                    <p id="noResults">No Results</p>
                    :
                    <SearchUsersList users={usersInListState.users} />
                :
                search && searchType === "posts" ?
                    <Grid gridPath={`posts?preview=true&search=${search}`} queryParams={{"preview": "true", "search": search}} />
                    :
                    <Grid gridPath={`posts?preview=true&discover=true`} queryParams={{"preview": "true", "discover": "true"}} />
            }

        </main>
    );
}

export default Search;