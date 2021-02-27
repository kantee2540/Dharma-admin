import axios from 'axios'
import { baseURL, clientId, clientSecret } from './Config'

function handlerError(errorCode){
    switch(errorCode){
        case(400):
            return("บัญชีผู้ใช้หรือรหัสผ่านไม่ถูกต้อง")
        case(404):
            return("ไม่พบเซิฟเวอร์")
        case(500):
            return("เกิดข้อผิดพลาดที่เซิฟเวอร์ให้บริการ")
        default:
            return("ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้")
    }
}

function login(username, password, callback, errorCallback){
    let url = baseURL + "/token"

    let formData = new FormData()
    formData.append("username", username)
    formData.append("password", password)
    formData.append("client_id", clientId)
    formData.append("client_secret", clientSecret)
    
    axios({
        url: url,
        method: 'POST',
        data: formData
    })
    .then((response)=>{
        let token = response.data.token
        console.log("token ", token)
        localStorage.setItem("token", token)
        callback(response.data)
    })
    .catch((error)=>{
        errorCallback(error)
    })
}

function checkUser(callback, errorCallback){
    let url = baseURL + "/check_user"
    let token = "Bearer " + localStorage.getItem("token");

    axios({
        url: url,
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
            'Authorization': token
        }
    })
    .then((response)=>{
        callback();
    })
    .catch((error)=>{
        errorCallback(error);
    })
}

export { login, handlerError, checkUser }