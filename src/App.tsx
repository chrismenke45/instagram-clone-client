import React from 'react';

import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage'
import PostPage from './pages/PostPage'
import MediaPage from './pages/MediaPage'
import ProfilePage from './pages/ProfilePage'
import CommentsPage from './pages/CommentsPage'
import LikesPage from './pages/LikesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ErrorPage from './pages/ErrorPage'



import {
  //BrowserRouter as Router,
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import RequireAuth from './functions/user/RequireAuth'; //to redirect to login if not logged in



const App: React.FC = () => {

  return (
    <div id="app">
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }>
          </Route>
          <Route
            path='/search'
            element={
              <RequireAuth>
                <SearchPage />
              </RequireAuth>

            }>
          </Route>
          <Route
            path='/post'
            element={
              <RequireAuth>
                <PostPage />
              </RequireAuth>
            }>
          </Route>
          <Route
            path='/media'
            element={
              <RequireAuth>
                <MediaPage />
              </RequireAuth>
            }>
          </Route>
          <Route
            path='/profile'
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }>
          </Route>
          <Route
            path='/posts/:id/comments'
            element={
              <RequireAuth>
                <CommentsPage />
              </RequireAuth>
            }>
          </Route>
          <Route
            path='/posts/:id/likes'
            element={
              <RequireAuth>
                <LikesPage />
              </RequireAuth>
            }>
          </Route>
          <Route
            path='/login'
            element={
              <LoginPage />
            }>
          </Route>
          <Route
            path='/register'
            element={
              <RegisterPage />
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