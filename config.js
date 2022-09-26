import axios from "axios"

export const BASE_URL ='http://192.168.1.200:3000'

export const axiosPrivate= axios.create({
    baseURL:BASE_URL,
    headers:{'content-Type':'application/json'},
    
})