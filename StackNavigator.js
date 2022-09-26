import { View, Text, ActivityIndicator } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './mer/LoginScreen';
import Users from './mer/Users';
import HomeScreen from './mer/HomeScreen';
import useAuth from './hooks/useAuth';


const Stack = createNativeStackNavigator()

const StackNavigator = () => {

  const { auth,isLoading,userToken } = useAuth()



  if (isLoading) {
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={'large'} />
    </View>)

  }


  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {auth.accessToken? <Stack.Group>
         <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }} />
         <Stack.Screen name='Users' component={Users} options={{ headerShown: false }} />
         </Stack.Group>:
         <>
         <Stack.Screen name='Login' component={LoginScreen} /></>
        
       }
        

        

    </Stack.Navigator>
  )
}

export default StackNavigator