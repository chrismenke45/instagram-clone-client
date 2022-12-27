import React from 'react';

import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage'
import PostPage from './pages/PostPage'
import LikesPage from './pages/LikesPage'
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
import ImageCropper from './components/inner/ImageCropper';

const App: React.FC = () => {
  return (
    <div id="app">
      {/*<Router>
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
            path='/likes'
            element={
              <LikesPage />
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
          </Router>*/}
          <ImageCropper />
    </div>
  );
}

export default App;