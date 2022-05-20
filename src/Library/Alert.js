import { faCheckCircle, faI, faInfoCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { createContext, useState, useEffect } from 'react'
import "./Alert.css"

const AlertContext = createContext();

function useProvideAlert(){
    var timeout
    const [message, setMessage] = useState('');
    const [isShow, setShow] = useState(false)
    const [type, setType] = useState('INFO')

    useEffect(()=>{
        return ()=>{
            console.log("CLEAR")
        }
    },[])

    const setMessages = (text, type) => {
        setShow(true);
        setMessage(text)
        setType(type)
        timeout = setTimeout(()=>{
            setShow(false);
            clearTimeout(timeout)
        }, 2300)
    }

    return { message, isShow, setMessages, type }
}

function AlertModal(props){
    var icon = { icon: faInfoCircle, color: 'gray' }
    const width = 350

    switch(props.type){
        case("SUCCESS"):
            icon = { icon: faCheckCircle, color: 'green' }
            break
        case("ERROR"):
            icon = { icon: faTimesCircle, color: 'red' }
            break
    }

    return(
        <div id="alert" style={{width: props.isShow ? width : 0}}>
            <div className="alert-content" style={{width: width}}>
                <div className='icon'>
                    <FontAwesomeIcon icon={icon.icon} color={icon.color}/>
                </div>
                <div className='title'>{props.title}</div>
            </div>
            
        </div>
    )
}

function ProvideAlert({ children }){
    const alert = useProvideAlert()

    return(
        <AlertContext.Provider value={alert}>
            <AlertModal title={alert.message} isShow={alert.isShow} type={alert.type}/>
            {children}
        </AlertContext.Provider>
    )
}


export { ProvideAlert, AlertContext }