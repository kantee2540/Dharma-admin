import React, { useContext } from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../Auth/AuthContext'
import logo from '../assets/images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompactDisc, faHome, faImages, faInfoCircle, faSignOut, faUser, faVolumeHigh } from '@fortawesome/free-solid-svg-icons'

function getName(){
    let name = localStorage.getItem("name");
    return name
}

function getEmail(){
    let email = localStorage.getItem("email");
    return email
}

function Sidebar(props) {
    const authContext = useContext(AuthContext)
    const userName = getName()
    const email = getEmail()

    return (
        <>
        <div id="sidebar" className={props.className} style={props.style}>
            <div className="container-inner">
                <div className='sidebar-head'>
                    <img src={logo} id="logo"/>
                    <div className="name-text">
                        <b>{userName}</b>
                    </div>
                    <div>{email}</div>
                </div>
                <div id="sidebar-item-container">
                    <hr/>
                    <SidebarItem icon={faHome} title="หน้าแรก" to="/" onClick={()=>props.callback()} exact/>
                    <SidebarItem icon={faImages} title="ปกหน้าหลัก" to="/cover" onClick={()=>props.callback()}/>
                    <SidebarItem icon={faCompactDisc} title="เสียง" to="/sound" onClick={()=>props.callback()}/>
                    <SidebarItem icon={faInfoCircle} title="เกี่ยวกับ" to="/about" onClick={()=>props.callback()}/>
                    <SidebarItem icon={faUser} title="จัดการบัญชีผู้ใช้" to="/user" onClick={()=>props.callback()}/>
                    <hr/>
                    <SidebarItem 
                    icon={faSignOut}
                    title="ออกจากระบบ" 
                    to="/login"
                    onClick={(e)=>{
                        e.preventDefault()
                        if(window.confirm("ต้องการออกจากระบบหรือไม่?")){
                            authContext.signout()
                            .then(()=>{
                                window.location.href = `/login`
                            })
                        }else{ }
                    }}/>
                    <hr/>
                    <div className="bottom-view">
                        <a href="http://xn--12ca1b1ad6at4bbyx3hva0b9qja8g.com/" target="_blank">พระไตรปิฎกใกล้ตัว.com</a><br/>
                        สงวนลิขสิทธิ์ 2565
                    </div>
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
            <FontAwesomeIcon color='gray' icon={props.icon} style={{ width: 23, marginRight: 13 }}/><span>{props.title}</span>
        </NavLink>
    )
}

export default Sidebar
