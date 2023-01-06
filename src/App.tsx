import React, { useEffect } from 'react';

import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage'
import PostPage from './pages/PostPage'
import MediaPage from './pages/MediaPage'
import ProfilePage from './pages/ProfilePage'
import CommentsPage from './pages/CommentsPage'
import ErrorPage from './pages/ErrorPage'


import {
  //BrowserRouter as Router,
  HashRouter as Router,
  Routes,
  Route,
  //Navigate
} from "react-router-dom";



  const App: React.FC = () => {

    // useEffect(() => {
    //   let url: string = "http://localhost:5000/posts"
    //   const options: RequestInit = {
    //     method: 'GET',
    //     mode: 'cors',
    //     headers: {
    //       'Accept': 'application/json',
    //     }
    //   };
    //   fetch(url, options)
    //     .then(response => response.json())
    //     .then(shifts => {
    //       console.log(shifts)
    //       console.log(typeof shifts[0].created_at)
    //     })
    //     .catch(error => {
    //       console.error('Error:', error)
    //     })
    // })

    return (
      <div id="app">
        <Router>
          <Routes>
            <Route
              path='/'
              element={
                <HomePage />
              }>
            </Route>
            <Route
              path='/search'
              element={
                <SearchPage />
              }>
            </Route>
            <Route
              path='/post'
              element={
                <PostPage />
              }>
            </Route>
            <Route
              path='/media'
              element={
                <MediaPage />
              }>
            </Route>
            <Route
              path='/profile'
              element={
                <ProfilePage />
              }>
            </Route>
            <Route
              path='/posts/:id/comments'
              element={
                <CommentsPage />
              }>
            </Route>
            <Route
              path='/*'
              element={
                <ErrorPage />
              }>
            </Route>

          </Routes>
        </Router>
      </div>
    );
  }

  export default App;