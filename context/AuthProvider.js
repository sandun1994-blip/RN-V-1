import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { BASE_URL } from '../config'


export const AuthContext =createContext()

const AuthProvider = ({children}) => {

  const [auth, setAuth] = useState({});
const [isLoading,setIsLoading] = useState(true)
const [userToken,setUserToken] =useState(null)
const [userRefreshToken,setUserRefreshToken] =useState(null)
const [userInfo,setUserInfo] =useState(null)




const login =async(username,password)=>{
  
  setIsLoading(true)
  console.log('oo');
try {
  const res = await axios.post(`${BASE_URL}/authentication/loginapp`,{
    username,password
  })
  setUserToken(res.data.token.accessToken)
  setUserRefreshToken(res.data.token.refreshToken)
  setAuth({ userInfo, pwd,userToken,userRefreshToken });
  
} catch (error) {
  console.log(error);
}

 
  if (userToken) {
    AsyncStorage.setItem('userToken',userToken)
  }
  
  setIsLoading(false)
}

const logout =()=>{

  setIsLoading(true)
  AsyncStorage.removeItem('userToken')
  setUserToken(null)
  setAuth({...auth,accessToken:null})
  setIsLoading(false)
  
}

const isLoggedIn =async()=>{
  setIsLoading(true)
  try {
    let userToken= await AsyncStorage.getItem('userToken')
    setUserToken(userToken)
    setIsLoading(false)
  } catch (error) {
    console.log(error);
  }

 
  
}

useEffect(()=>{
  isLoggedIn()

},[])





    
  return (
    <AuthContext.Provider value={{auth, setAuth,isLoading,setIsLoading,logout,userToken,setUserToken}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

