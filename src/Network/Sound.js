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

export { listSound }