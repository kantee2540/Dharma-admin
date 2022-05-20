import axios from "axios";
import { baseURL } from './Config'

function getAbout(){
    let url = baseURL + "/about/get"
    let token = "Bearer " + localStorage.getItem("token");

    return new Promise((resolve, reject) => {
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
            resolve(data)
        })
        .catch((error)=>{
            reject(error)
        })
    })

   
}

function editAbout(about){
    let url = baseURL + "/about/edit"
    let token = "Bearer " + localStorage.getItem("token");

    var formData = new FormData()
    formData.append("about", about)

    return new Promise((resolve, reject) => {
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
            let data = response.data;
            resolve(data)
        })
        .catch((error)=>{
            reject(error)
        })
    })
    
}

export { getAbout, editAbout }