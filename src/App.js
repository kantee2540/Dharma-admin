import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { AuthContext, ProvideAuth } from './Auth/AuthContext'
import { checkUser } from './Network/AuthNetwork'
import './App.css';
import Sidebar from './Library/Sidebar'
import { ProvideAlert } from './Library/Alert'
import CookieConsent from './Library/CookieConsent'

import Home from './Home/Home'
import Login from './Auth/Login'
import Cover from './Cover/Cover'
import Sound from './Sound/Sound'
import SoundDetail from './Sound/SoundDetail'
import CreatePackage from './Sound/CreatePackage'
import About from './About/About'
import User from './User/User'
import UserForm from './User/UserForm'

import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin//buddhistEra'

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
  const [isCookieAccepted, setIsCookieAccepted] = useState(localStorage.getItem('cookie-accept') === 'true' ? true: false)

  useEffect(()=>{
    dayjs.locale("th")
    dayjs.extend(buddhistEra)
    let token = localStorage.getItem('token')
    if(token !== null){
      checkUserAuthen()
    }
  }, [])

  const onAcceptCookie = () => {
    localStorage.setItem('cookie-accept', 'true')
    setIsCookieAccepted(true)
  }

  return (
    <div>
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
      <CookieConsent 
      isAccepted={isCookieAccepted}
      onAccept={()=>onAcceptCookie()}/>
    </div>
  );
}

function AppStack({ children, isAuth, ...rest }){
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const authContext = useContext(AuthContext);

  return(
    <>
      { authContext.getToken() !== null ?
      <Route {...rest}>
        <ProvideAlert>
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
                <Route path="/sound" exact>
                  <Sound/>
                </Route>
                <Route path="/cover">
                  <Cover/>
                </Route>
                <Route path="/sound/create">
                  <CreatePackage/>
                </Route>
                <Route path="/sound/:soundId">
                  <SoundDetail/>
                </Route>
                <Route path="/about">
                  <About/>
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
        </ProvideAlert>
      </Route>
      :
      <Redirect to="/login"/>
      }
    </>
  )
}


export default App;
