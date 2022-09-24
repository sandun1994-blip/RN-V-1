import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import useAuth from './hooks/AuthProvider';
import LoginScreen from './mer/LoginScreen';
import Home from './mer/Home';
import HomeScreen from './mer/HomeScreen';


const Stack = createNativeStackNavigator()

const StackNavigator = () => {

  const {user} =useAuth()
  



  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='Login' component={LoginScreen}/>
      <Stack.Screen name='HomeScreen' component={HomeScreen}  options={{headerShown:false}} />
     <Stack.Screen name='Home' component={Home}  options={{headerShown:false}} />
     
      
    </Stack.Navigator>
  )
}

export default StackNavigator