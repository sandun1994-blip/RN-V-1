import axios from 'axios'

const BASE_URL ='http://192.168.1.200:3000'

export default axios.create({
    baseURL:BASE_URL
})

export const axiosPrivate= axios.create({
    baseURL:BASE_URL,
    headers:{'content-Type':'application/json'},
    
})