import React, { createContext, useState, useEffect } from 'react'
import "./Alert.css"

const AlertContext = createContext();

function useProvideAlert(){
    const [message, setMessage] = useState('');
    const [isShow, setShow] = useState(false)

    const setMessages = (text) => {
        setShow(true);
        setMessage(text)
        setTimeout(()=>{
            setShow(false);
        }, 2000)
    }

    return { message, isShow, setMessages }
}

function AlertModal(props){
    const width = 300
    return(
        <div id="alert" style={{width: props.isShow ? width : 0}}>
            <div className="alert-content" style={{width: width}}>
                <i className="fas fa-info-circle alert-icon"></i>
                {props.title}
            </div>
            
        </div>
    )
}

function ProvideAlert({ children }){
    const alert = useProvideAlert()

    return(
        <AlertContext.Provider value={alert}>
            <AlertModal title={alert.message} isShow={alert.isShow}/>
            {children}
        </AlertContext.Provider>
    )
}


export { ProvideAlert, AlertContext }