import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MyPage from './pages/MyPage';
import postListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';
import MapPage from './MapPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HeaderBlock from './pages/HomeFragements/HeaderBlock';

const App = () => {
  return(
    <>
      <HeaderBlock />
      <Route component={ HomePage } path="/" exact />
      <Route component={ postListPage } path="/post" exact />
      <Route component={ PostPage } path="/post/postDetail" exact />
      <Route component={ MapPage } path="/map" exact />
      <Route component={ MyPage } path="/auth" exact />
      <Route component={ LoginPage } path="/auth/login" exact />
      <Route component={ RegisterPage } path="/auth/register" exact />
    </>
  )
}

export default App;