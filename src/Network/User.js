import axios from 'axios'
import { baseURL } from './Config'

function listUser(callback, errorCallback){
    let url = baseURL + "/user"
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
        let data = response.data;
        callback(data);
    })
    .catch((error)=>{
        errorCallback(error);
    })
}

function editUser(email, name, user_id, callback, errorCallback){
    let url = baseURL + "/user/edit"
    let token = "Bearer " + localStorage.getItem("token");

    var formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("user_id", user_id)

    axios({
        url: url,
        method: 'POST',
        data: formData,
        headers:{
            'Content-Type': 'multipart/form-data',
            'Authorization': token
        }
    })
    .then((response)=>{
        let data = response.data;
        console.log(data)
        callback(data);
    })
    .catch((error)=>{
        errorCallback(error);
    })
}

function createUser(email, name, password, callback, errorCallback){
    let url = baseURL + "/user/create"
    let token = "Bearer " + localStorage.getItem("token");

    var formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("password", password)

    axios({
        url: url,
        method: 'POST',
        data: formData,
        headers:{
            'Content-Type': 'multipart/form-data',
            'Authorization': token
        }
    })
    .then((response)=>{
        let data = response.data;
        console.log(data)
        callback(data);
    })
    .catch((error)=>{
        errorCallback(error);
    })
}

export { listUser, editUser, createUser }