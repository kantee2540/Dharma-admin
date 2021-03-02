import axios from 'axios'
import { baseURL } from './Config'

function listCover(callback, errorCallback){
    let url = baseURL + "/cover"
    let token = "Bearer " + localStorage.getItem("token");

    axios({
        url: url,
        method: 'GET',
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


function uploadCover(file, callback, errorCallback){
    let url = baseURL + "/upload_cover"
    let token = "Bearer " + localStorage.getItem("token");

    var bodyForm = new FormData()
    bodyForm.append("file", file)

    axios({
        url: url,
        method: 'POST',
        data: bodyForm,
        headers:{
            "Content-Type": "multipart/form-data",
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

function updateDefaultCover(coverId, callback, errorCallback){
    let url = baseURL + "/select_image"
    let token = "Bearer " + localStorage.getItem("token");

    var bodyForm = new FormData()
    bodyForm.append("cover_id", coverId)

    axios({
        url: url,
        method: 'POST',
        data: bodyForm,
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

function deleteImageCover(coverId, callback, errorCallback){
    let url = baseURL + "/delete_image_cover"
    let token = "Bearer " + localStorage.getItem("token");

    var bodyForm = new FormData()
    bodyForm.append("cover_id", coverId)

    axios({
        url: url,
        method: 'POST',
        data: bodyForm,
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


export { listCover, uploadCover, updateDefaultCover, deleteImageCover }