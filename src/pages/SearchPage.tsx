import React from 'react';
import Banner from '../components/outer/Banner';
import Search from '../components/outer/Search';
import NavFooter from '../components/outer/NavFooter';

const SearchPage: React.FC = () => {


    return (
        <div id="page">
            <Banner />
            <Search />
            <NavFooter />
        </div>
    );
}

export default SearchPage;