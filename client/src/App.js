import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MyPage from './pages/MyPage';
import postListPage from './pages/PostListPage';
import MapPage from './MapPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HeaderBlock from './pages/HomeFragements/HeaderBlock';

// const App = () => {
//   return(
//     <>
//       <HeaderBlock />
//       <Route component={ HomePage } path="/" />
//       <Route component={ postListPage } path="/post"/>
//       <Route component={ MapPage } path="/map" />
//       <Route component={ MyPage } path="/auth" />
//       <Route component={ LoginPage } path="/auth/login" />
//       <Route component={ RegisterPage } path="/auth/register" />
//     </>
//   )
// }

class App extends Component {
  render(){
    return (
      <div className= "gray-background">
        <img src={logo} lat="logo"/>
        <h2>jfsldfjl</h2>
      </div>
    );
  }
}

export default App;