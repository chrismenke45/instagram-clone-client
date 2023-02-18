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
import MessagesPage from './pages/MessagesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ErrorPage from './pages/ErrorPage'
import ConversationPage from './pages/ConversationPage';
import RequireAuth from './functions/user/RequireAuth'; //to redirect to login if not logged in



import {
  //BrowserRouter as Router,
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import ImageCropperContext, { initialImageCropperState } from './stateManagement/contexts/ImageCropperContext';
import imageCropperReducer from './stateManagement/reducers/imageCropperReducer';
import ReloadContext, { initialReloadState} from './stateManagement/contexts/ReloadContext';
import reloadReducer from './stateManagement/reducers/reloadReducer';
import PostsContext, { initialPostsState} from './stateManagement/contexts/PostsContext';
import postsReducer from './stateManagement/reducers/postsReducer';
import UsersInListContext, { initialUsersInListState } from './stateManagement/contexts/UsersInListContext';
import usersInListReducer from './stateManagement/reducers/usersInListReducer';




const App: React.FC = () => {

  const [imageCropperState, imageCropperDispatch] = useReducer(
    imageCropperReducer,
    initialImageCropperState
  )
  const [reloadState, reloadDispatch] = useReducer(
    reloadReducer,
    initialReloadState
  )

  const [postsState, postsDispatch] = useReducer(
    postsReducer,
    initialPostsState
  )

  const [usersInListState, usersInListDispatch] = useReducer(
    usersInListReducer,
    initialUsersInListState
  )

  return (
    <div id="app">
      <Router>
        <ReloadContext.Provider value={{ reloadState, reloadDispatch }}>
          <Routes>
            <Route
              path='/'
              element={
                <RequireAuth>
                  <PostsContext.Provider value={{ postsState, postsDispatch }}>
                    <HomePage />
                  </PostsContext.Provider>
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
                  <PostsContext.Provider value={{ postsState, postsDispatch }}>
                    <ProfilePage />
                  </PostsContext.Provider>
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
                  <UsersInListContext.Provider value={{ usersInListState, usersInListDispatch }}>
                    <FollowPage title="Following" />
                  </UsersInListContext.Provider>
                </RequireAuth>
              }>
            </Route>
            <Route
              path='/profile/:user_id/followers'
              element={
                <RequireAuth>
                  <UsersInListContext.Provider value={{ usersInListState, usersInListDispatch }}>
                    <FollowPage title="Followers" />
                  </UsersInListContext.Provider>
                </RequireAuth>
              }>
            </Route>
            <Route
              path='/posts/:post_id'
              element={
                <RequireAuth>
                  <UsersInListContext.Provider value={{ usersInListState, usersInListDispatch }}>
                    <IndividualPostPage />
                  </UsersInListContext.Provider>
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
                  <UsersInListContext.Provider value={{ usersInListState, usersInListDispatch }}>
                    <LikesPage />
                  </UsersInListContext.Provider>
                </RequireAuth>
              }>
            </Route>
            <Route
              path='/messages'
              element={
                <RequireAuth>
                  <MessagesPage />
                </RequireAuth>
              }>
            </Route>
            <Route
              path='/messages/:user_id'
              element={
                <RequireAuth>
                  <ConversationPage />
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
        </ReloadContext.Provider>
      </Router>
    </div>
  );
}

export default App;