import React from 'react';
import Banner from './components/Banner';
import Home from './components/Home';
import Search from './components/Search'
import Post from './components/Post'
import Likes from './components/Likes'
import Profile from './components/Profile'
import NavFooter from './components/NavFooter';

import {
  //BrowserRouter as Router,
  HashRouter as Router,
  Routes,
  Route,
  //Navigate
} from "react-router-dom";

const App: React.FC = () => {

  return (
    <div id="app">
      <Router>
        <Banner />

        <Routes>
          <Route
            path='/'
            element={
              <Home />
            }>
          </Route>
          <Route
            path='/search'
            element={
              <Search />
            }>
          </Route>
          <Route
            path='/post'
            element={
              <Post />
            }>
          </Route>
          <Route
            path='/likes'
            element={
              <Likes />
            }>
          </Route>
          <Route
            path='/profile'
            element={
              <Profile />
            }>
          </Route>

        </Routes>

        <NavFooter />
      </Router>
    </div>
  );
}

export default App;