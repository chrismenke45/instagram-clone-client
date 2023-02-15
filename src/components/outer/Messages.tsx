import React, { useState, useRef, useEffect } from 'react';
import FetchAPI from '../../functions/fetch/FetchAPI';
import getUserObject from '../../functions/user/getUserObject';
import SearchForm from '../inner/SearchForm';
import { UserInListProp } from '../../models/UserInListProp';
import { MessageProp } from '../../models/MessageProp';
import MessageInList from '../inner/MessageInList';

interface Props {
    messages: MessageProp[];
}
const Messages: React.FC<Props> = (props) => {
    const { messages } = props
    const fetcher = new FetchAPI()
    const user = getUserObject()
    const [search, setSearch] = useState<string>("")
    const searchType = "accounts"
    const [showSearchOptions, setShowSearchOptions] = useState<boolean>(false)
    const [activelySearching, setActivelySearching] = useState<boolean>(false)
    const [userList, setUserList] = useState<UserInListProp[]>([])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let url = `users?search=${search}`
        setActivelySearching(true)
        setUserList([])
        fetcher.fetchData(url, "GET", user.jwt)
            .then(users => {
                console.log(users)
                setUserList(users)
                setActivelySearching(false)
            })
            .catch(err => {
                setActivelySearching(false)
            })

    }
    const handleSearchTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
    }

    return (
        <main id="messages">
            <SearchForm
                search={search}
                setSearch={setSearch}
                searchType={searchType}
                handleSubmit={handleSubmit}
                handleSearchTypeChange={handleSearchTypeChange}
                showSearchOptions={showSearchOptions}
                setShowSearchOptions={setShowSearchOptions}
                areSearchOptionsAvailable={false}
                setActivelySearching={setActivelySearching}
            />
            <ol>
                {messages.map(message => {
                    return <MessageInList key={message.id} message={message} />
                })}
            </ol>
        </main>
    );
}

export default Messages;