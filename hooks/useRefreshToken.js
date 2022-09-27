import AsyncStorage from "@react-native-async-storage/async-storage"
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

        
  if (response.data.accessToken) {
   await AsyncStorage.setItem('userToken',response.data.accessToken)
  }
  
        return response.data.accessToken
    }
  return refresh
}

export default useRefreshToken