import React, { useContext } from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../Auth/AuthContext'
import logo from '../assets/images/logo.png'

function getName(){
    let name = localStorage.getItem("name");
    return name
}

function Sidebar(props) {
    const authContext = useContext(AuthContext)
    const userName = getName()

    return (
        <>
        <div id="sidebar" className={props.className} style={props.style}>
            <div className="container-inner">
                <div>
                    <img src={logo} id="logo"/>
                    <div className="name-text">
                        <b>{userName}</b>
                    </div>
                </div>
                <div id="sidebar-item-container">
                    <hr/>
                    <SidebarItem title="หน้าแรก" to="/" onClick={()=>props.callback()} exact/>
                    <SidebarItem title="ปกหน้าหลัก" to="/cover" onClick={()=>props.callback()}/>
                    <SidebarItem title="เสียง" to="/sound" onClick={()=>props.callback()}/>
                    {/* <SidebarItem title="เกี่ยวกับ" to="/about" onClick={()=>props.callback()}/> */}
                    <SidebarItem title="จัดการบัญชีผู้ใช้" to="/user" onClick={()=>props.callback()}/>
                    <hr/>
                    <SidebarItem 
                    title="ออกจากระบบ" 
                    to="/login"
                    onClick={()=>{
                        if(window.confirm("ต้องการออกจากระบบหรือไม่?")){
                            authContext.signout()
                        }else{ }
                    }}/>
                </div>
            </div>
        </div>
        </>
    )
}

function SidebarItem(props){
    return(
        <NavLink
        activeClassName="active-sidebar"
        className="sidebar-item" 
        to={props.to} 
        exact={props.exact}
        onClick={props.onClick}>
            {props.title}
        </NavLink>
    )
}

export default Sidebar
