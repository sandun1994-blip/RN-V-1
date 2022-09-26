import { Alert, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { Component, useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { axiosPrivate } from '../config'
import { AntDesign } from '@expo/vector-icons'
import useRefreshToken from '../hooks/useRefreshToken'
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

const HomeScreen = ({navigation}) => {

  const { auth,logout } = useAuth()

const [count,setCount] =useState()

// const refresh =useRefreshToken()
const axiosPrivate =useAxiosPrivate()

const getUsersOne = async () => {
  let isMounted = true
  const controller = new AbortController()
  try {
    const response = await axiosPrivate.get('/authentication/profile', {
      signal: controller.signal, headers: {
        'Authorization': `Bearer ${auth.accessToken}`
      }
    },)

  

    isMounted && setUserInfo(response.data)
  } catch (error) {

    console.log(error, '.j');

  }}




  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
console.log('effect');
const getUsers = async () => {
  try {
    const response = await axiosPrivate.get('/authentication/profile', {
      signal: controller.signal
    },)
  
  } catch (error) {

    console.log(error, '.j');

  }
}

    getUsers()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])
  const handlePress =()=>{
    navigation.navigate('Users')
        }
  
  return (
    <SafeAreaView style={{ flex: 1, borderStartColor: '#fff' }}>
      <ScrollView className='p-5'>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
          <Text> HELLO :{auth?.username}</Text>
          <TouchableOpacity onPress={logout} >
            <ImageBackground source={require('../assets/favicon.png')} style={{ width: 35, height: 35 }} imageStyle={{ borderRadius: 25 }} /></TouchableOpacity>
        </View>
        <TouchableOpacity className='bg-pink-400 p-6 w-80 rounded flex-row justify-between'onPress={handlePress}>
        <Text style={{fontWeight:'bold',fontSize:18,color:'#fff'}}>Let's Begin</Text>
        <AntDesign name="caretright" size={22} color="white" />
      </TouchableOpacity>

      <TouchableOpacity className='bg-pink-400 p-6 w-80 rounded flex-row justify-between' >
        <Text style={{fontWeight:'bold',fontSize:18,color:'#fff'}}>USERS</Text>
       
      </TouchableOpacity>
      <TouchableOpacity className='bg-pink-400 p-6 w-80 rounded flex-row justify-between m-5' >
        <Text style={{fontWeight:'bold',fontSize:18,color:'#fff'}}>refresh</Text>
       
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )

}

export default HomeScreen