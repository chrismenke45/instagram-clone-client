import React, { useReducer } from 'react';

import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage'
import PostPage from './pages/PostPage'
import MediaPage from './pages/MediaPage'
import ProfilePage from './pages/ProfilePage'
import EditProfilePage from './pages/EditProfilePage';
import FollowPage from './pages/FollowPage';
import IndividualPostPage from './pages/IndividualPostPage';
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
import ImageCropperContext from './stateManagement/contexts/ImageCropperContext';
import imageCropperReducer from './stateManagement/reducers/imageCropperReducer';



const App: React.FC = () => {

  const [imageCropperState, imageCropperDispatch] = useReducer(
    imageCropperReducer,
    {
      showImageSelect: false,
      photoUrl: "",
      oldPhotoUrl: ""
    }
  )

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
                <ImageCropperContext.Provider value={{ imageCropperState, imageCropperDispatch }}>
                  <PostPage />
                </ImageCropperContext.Provider>
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
            path='/profile/:user_id'
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }>
          </Route>
          <Route
            path='/profile/:user_id/edit'
            element={
              <RequireAuth>
                <ImageCropperContext.Provider value={{ imageCropperState, imageCropperDispatch }}>
                  <EditProfilePage />
                </ImageCropperContext.Provider>
              </RequireAuth>
            }>
          </Route>
          <Route
            path='/profile/:user_id/following'
            element={
              <RequireAuth>
                <FollowPage title="Following" />
              </RequireAuth>
            }>
          </Route>
          <Route
            path='/profile/:user_id/followers'
            element={
              <RequireAuth>
                <FollowPage title="Followers" />
              </RequireAuth>
            }>
          </Route>
          <Route
            path='/posts/:post_id'
            element={
              <RequireAuth>
                <IndividualPostPage />
              </RequireAuth>
            }>
          </Route>
          <Route
            path='/posts/:post_id/comments'
            element={
              <RequireAuth>
                <CommentsPage />
              </RequireAuth>
            }>
          </Route>
          <Route
            path='/posts/:post_id/likes'
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