import { View, Text, SafeAreaView, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/AuthProvider'
import { AntDesign } from '@expo/vector-icons';




export default function Home() {
 
    const navigation =useNavigation()
    
    const {user} =useAuth()

    const handlePress =()=>{
navigation.navigate('Login')
    }

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white"   >
      <View >
      <Text className='text-black-600  font-bold ' style={{fontSize:30}} >CHEM PACK</Text>
      </View>
      
      <TouchableOpacity className='bg-pink-400 p-6 w-80 rounded flex-row justify-between'>
        <Text style={{fontWeight:'bold',fontSize:18,color:'#fff'}}>Let's Begin</Text>
        <AntDesign name="caretright" size={22} color="white" />
      </TouchableOpacity>
       
    </SafeAreaView>
  )
}