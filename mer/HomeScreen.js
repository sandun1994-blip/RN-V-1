import { Alert, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { Component, useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { axiosPrivate } from '../config'
import { MaterialCommunityIcons,FontAwesome5  } from '@expo/vector-icons';
import useRefreshToken from '../hooks/useRefreshToken'
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

import CardComp from '../components/CardComp'

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

<View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'center', marginTop: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'center', margin: 10 }}><FontAwesome5 name="user-circle" size={30} color="black" /><Text> HELL{auth?.username}</Text></View>  
        <View> 
          <TouchableOpacity onPress={logout} style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'center', margin: 10  }} >
          <MaterialCommunityIcons name="logout-variant" size={30} color="black" />
            </TouchableOpacity></View>
         
        </View>
       
      <ScrollView className='p-5'>
        <View>
      <CardComp navigation={navigation}/></View>
      </ScrollView>
    </SafeAreaView>
  )

}

export default HomeScreen