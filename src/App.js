import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { AuthContext, ProvideAuth } from './Auth/AuthContext'
import { checkUser } from './Network/AuthNetwork'
import './App.css';
import Sidebar from './Library/Sidebar'

import Home from './Home/Home'
import Login from './Auth/Login'
import Sound from './Sound/Sound'
import User from './User/User'
import UserForm from './User/UserForm'

function checkUserAuthen(){
  checkUser(
    ()=>{
      console.log("Token is OK")
    },
    ()=>{
      localStorage.removeItem('token')
      localStorage.removeItem('name')
    }
  )
}

function App() {
  useEffect(()=>{
    let token = localStorage.getItem('token')
    if(token !== null){
      checkUserAuthen()
    }
  }, [])

  return (
    <ProvideAuth>
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <AppStack path="/"/>
        </Switch>
      </BrowserRouter>
    </ProvideAuth>
  );
}

function AppStack({ children, isAuth, ...rest }){
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const authContext = useContext(AuthContext);

  return(
    <>
      { authContext.getToken() !== null ?
      <Route {...rest}>
        <div 
        style={{display: 'flex'}}>
          <div className="d-flex d-md-none">
            <div id="sidebar-button" onClick={()=>setSidebarOpen(!isSidebarOpen ? true : false)}>
              <i className="fas fa-bars"></i>
            </div>
          </div>
          <Sidebar 
          className="d-none d-md-flex"
          callback={()=>{}}/>
          <div className="d-flex d-md-none">
            <Sidebar 
            style={{width: isSidebarOpen ? 270:0}}
            callback={()=>setSidebarOpen(false)}/>
          </div>
          <div className="app-container">
            <Switch>
              <Route path="/" exact>
                <Home/>
              </Route>
              <Route path="/sound">
                <Sound/>
              </Route>
              <Route path="/user" exact>
                <User/>
              </Route>
              <Route path="/user/create">
                <UserForm/>
              </Route>
            </Switch>
          </div>
        </div>
      </Route>
      :
      <Redirect to="/login"/>
      }
    </>
  )
}


export default App;
