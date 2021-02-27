import React, { useContext } from 'react'
import { AuthContext } from '../Auth/AuthContext'
import './Home.css'

function Home() {
    const authContext = useContext(AuthContext)
    return (
        <div>
            HOME
            <a href="#" onClick={()=>authContext.signout()}>SIGN OUT</a>
        </div>
    )
}

export default Home
