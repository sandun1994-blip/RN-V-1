import { View, Text, ActivityIndicator } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './mer/LoginScreen';
import Users from './mer/Users';
import HomeScreen from './mer/HomeScreen';
import useAuth from './hooks/useAuth';
import BinScan from './pages/BinScan';
import PurchaseScan from './pages/PurchaseScan';
import SalesScan from './pages/SalesScan';
import StockScan from './pages/StockScan';
import Scanner from './components/Scanner';


const Stack = createNativeStackNavigator()

const StackNavigator = () => {

  const { auth,isLoading,userToken } = useAuth()



  if (isLoading) {
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={'large'} />
    </View>)

  }
console.log(auth.accessToken);

  return (
    <Stack.Navigator >
      <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }} />
      {/* {auth.accessToken? <Stack.Group>
         <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }} />
         <Stack.Screen name='Users' component={Users} options={{ headerShown: false }} />
         </Stack.Group>:
         <>
         <Stack.Screen name='Login' component={LoginScreen} /></>
        
       } */}
        
        <Stack.Screen name='Users' component={Users}   />
        <Stack.Screen name='Sc' component={Scanner}   />
        <Stack.Screen name='BinScan' component={BinScan}   />
        <Stack.Screen name='PurchaseScan' component={PurchaseScan}   />
        <Stack.Screen name='SalesScan' component={SalesScan}   />
        <Stack.Screen name='StockScan' component={StockScan}   />
        

    </Stack.Navigator>
  )
}

export default StackNavigator