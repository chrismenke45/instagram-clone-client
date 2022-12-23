import React from 'react';
import Banner from './components/Banner';
import Home from './components/Home';
import Search from './components/Search'
import Post from './components/Post'
import Likes from './components/Likes'
import Profile from './components/Profile'
import NavFooter from './components/NavFooter';

const App: React.FC = () => {

  return (
    <div id="app">
      <Banner />
      <Home />
      <NavFooter />
    </div>
  );
}

export default App;