import { useContext } from "react"
import axios from "../api/axios"
import { AuthContext } from "../context/AuthProvider"
import useAuth from "./useAuth"



const useRefreshToken = () => {
    const {auth,setAuth} =useAuth()

    const refresh =async ()=>{
        const response =await axios.get('/authentication/refresh',{headers:{
          'Authorization': `Bearer ${auth.refreshToken}`
        }})

        setAuth(prev=>{
            return {...prev,accessToken:response.data.accessToken,refreshToken:response.data.refreshToken}
        })
        return response.data.accessToken
    }
  return refresh
}

export default useRefreshToken