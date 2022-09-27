import { View, Text, SafeAreaView, Button, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { AntDesign } from '@expo/vector-icons';

import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';





export default function Users({ navigation }) {
  const { auth } = useAuth()
const axiosPrivate =useAxiosPrivate()
  const [users, setUsers] = useState()
  useEffect(() => {

    let isMounted  = true
    const controller = new AbortController()

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get('/authentication/profile', {
          signal: controller.signal
        },)

        isMounted && setUsers(response.data)
      } catch (error) {
        // navigate('/login',{state:{from:location},replace:true})

        console.log(error, '.j');

      }
    }


    getUsers()

    return () => {
      isMounted = false
      controller.abort()
    }

  }, [])


  const handlePress = () => {
    navigation.navigate('HomeScreen')
  }

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white"   >
     <Text>yoyo</Text>

    </SafeAreaView>
  )
}