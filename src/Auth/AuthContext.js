import React, { useState, createContext } from 'react'
import { login, handlerError } from '../Network/AuthNetwork'

const AuthContext = createContext();


function useProvideAuth(){
    const [user, setUser] = useState(null);

    const signin = (username, password, callback, errorCallback) =>{
        login(username, password,
            (data)=>{
                let name = data.name;
                setUser(name);
                localStorage.setItem("name", name);
                callback();
            },
            (error)=>{
                if(error.response){
                    let code = error.response.status;
                    let errorMessage = handlerError(code);
                    errorCallback(errorMessage);
                }else{
                    errorCallback(error.message);
                }
            })
    }
    const signout = () =>{
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("name");
    }

    const setName = (name) =>{
        setName(name)
    }

    const getToken = () =>{
        let token = localStorage.getItem('token')
        return token
    }

    return {signin, signout, setName, getToken};
}

function ProvideAuth({ children }){
    const auth = useProvideAuth();
    return(
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

export { ProvideAuth, AuthContext }