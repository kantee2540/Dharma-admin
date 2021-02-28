import axios from 'axios'
import { baseURL } from './Config'

function listSound(callback, errorCallback){
    let url = baseURL + "/sound"
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

function createSound(name, callback, errorCallback) {
    let url = baseURL + "/sound/create"
    let token = "Bearer " + localStorage.getItem("token");

    var bodyForm = new FormData()
    bodyForm.append("name", name)

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
        let data = response.data;
        callback(data);
    })
    .catch((error)=>{
        errorCallback(error);
    })
}

function soundDetail(packageId, callback, errorCallback){
    let url = baseURL + "/sound/" + packageId
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

function uploadFileCover(packageId, file, callback, errorCallback){
    let url = baseURL + "/sound/"+ packageId + "/upload_cover"
    let token = "Bearer " + localStorage.getItem("token");

    var formData = new FormData();
    formData.append("image_file", file);

    axios({
        url: url,
        method: 'POST',
        data: formData,
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

function updateName(packageId, name, callback, errorCallback){
    let url = baseURL + "/sound/"+ packageId + "/edit_name"
    let token = "Bearer " + localStorage.getItem("token");

    var formData = new FormData();
    formData.append("name", name);

    axios({
        url: url,
        method: 'POST',
        data: formData,
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

function uploadSound(packageId, soundfiles, callback, errorCallback){
    let url = baseURL + "/sound/"+ packageId + "/upload_sound"
    let token = "Bearer " + localStorage.getItem("token");

    var formData = new FormData();
    for(let i = 0; i < soundfiles.length; i++){
        formData.append("files", soundfiles[i])
    }

    axios({
        url: url,
        method: 'POST',
        data: formData,
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

function deleteSoundFile(packageId, soundId, callback, errorCallback){
    let url = baseURL + "/sound/"+ packageId + "/delete"
    let token = "Bearer " + localStorage.getItem("token");

    var formData = new FormData();
    formData.append("sound_id", soundId)

    axios({
        url: url,
        method: 'POST',
        data: formData,
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

function deletePackage(packageId, callback, errorCallback){
    let url = baseURL + "/sound/delete"
    let token = "Bearer " + localStorage.getItem("token");

    var formData = new FormData();
    formData.append("sound_id", packageId)

    axios({
        url: url,
        method: 'POST',
        data: formData,
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

export { listSound, 
    createSound, 
    soundDetail, 
    uploadFileCover, 
    updateName, 
    uploadSound,
    deleteSoundFile,
    deletePackage
}