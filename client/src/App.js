import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MyPage from './pages/MyPage';
import postListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';
import MapPage from './pages/MapPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HeaderBlock from './components/common/HeaderBlock';
import ClassDetail from './pages/ClassDetail';
import PaymentPage from './pages/PaymentPage';
import MyClassPage from './pages/MyClassPage';

import MyPaymentPage from './pages/MyPaymentPage';

import InfiniteScroll from "./InfiniteScroll";


const App = () => {
  return(
    <>
      <HeaderBlock />
      <InfiniteScroll height={700}>
      <Route component={ HomePage } path="/" exact />
      <Route component={ postListPage } path="/OpenClass" exact/>
      <Route component={ PostPage } path="/post/postDetail" exact />
      <Route component={ MapPage } path="/map" exact />
      <Route component={ MyPage } path="/auth" exact />
      <Route component={ LoginPage } path="/auth/login" exact />
      <Route component={ RegisterPage } path="/auth/register" exact />
      <Route component={ PaymentPage } path="/payment" exact />
      <Route component={ MyClassPage } path="/myclass" exact />

      <Route component={ MyPaymentPage } path="/auth/myPayment" exact />

      <Route component={ ClassDetail } path="/postView" exact />
      </InfiniteScroll>

    </>
  )
}

export default App;