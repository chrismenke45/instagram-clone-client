import React from 'react';
import Banner from '../components/outer/Banner';
import Home from '../components/outer/Home';
import NavFooter from '../components/outer/NavFooter';

const HomePage: React.FC = () => {


    return (
        <div id="page">
            <Banner />
            <Home />
            <NavFooter />
        </div>
    );
}

export default HomePage;