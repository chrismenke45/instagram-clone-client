import React from 'react';
import Banner from '../components/outer/Banner';
import NavFooter from '../components/outer/NavFooter';

const ErrorPage: React.FC = () => {


    return (
        <div id="page">
            <Banner />
            <main>
                <h2>We couldn't find what you were looking for </h2>
            </main>
            <NavFooter />
        </div>
    );
}

export default ErrorPage;