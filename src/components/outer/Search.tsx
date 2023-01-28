import React, { useState, useRef, useEffect } from 'react';
import FetchAPI from '../../functions/fetch/FetchAPI';
import { FiSearch } from 'react-icons/fi'
import Grid from '../inner/Grid';
import { UserInListProp } from '../../models/UserInListProp';
import SearchUsersList from '../inner/SearchUsersList';

const Home: React.FC = () => {
    const fetcher = new FetchAPI()
    const [search, setSearch] = useState<string>("")
    const submitRef = useRef<HTMLButtonElement>(null)
    const [userList, setUserList] = useState<UserInListProp[]>([])


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        if (submitRef?.current) {
            submitRef.current.click()
        }
    }, [search])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetcher.fetchData(`users?search=${search}`)
            .then(users => setUserList(users))
    }
    return (
        <main>
            <form id="searchForm" onSubmit={handleSubmit}>
                <FiSearch></FiSearch>
                <input
                    type="text"
                    maxLength={25}
                    placeholder="Search"
                    onChange={handleSearchChange}>
                </input>
                <button ref={submitRef} type='submit' hidden={true}></button>
            </form>
            {search ?
                userList.length === 0 ?
                    <p>No users found</p>
                    :
                    <SearchUsersList users={userList} />
                :
                <Grid gridPath={`posts?preview=true&discover=true`} />
            }

        </main>
    );
}

export default Home;