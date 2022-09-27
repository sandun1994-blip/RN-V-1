import { View, Text, ImageBackground, TextInput, TouchableOpacity, Alert, Button } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthProvider';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LOGIN_URL = '/authentication/loginapp';

const LoginScreen = ({ navigation }) => {
 
  const [username, setUserName] = useState(null)
  const [password, setPassword] = useState(null)


  const { auth, setAuth, setIsLoading,setUserToken } = useAuth()

  const handlePress = () => {
    navigation.navigate('Login')
  }


  

  const handleSubmit = async () => {

    setIsLoading(true)
    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: {
            'Content-Type': 'application/json',

          },

        }
      );

      //console.log(JSON.stringify(response));
      const accessToken = response?.data.token.accessToken;
      const refreshToken = response?.data.token.refreshToken;

      setAuth({ username, password, accessToken, refreshToken });

      if (accessToken) {
        console.log(accessToken);
        await AsyncStorage.setItem('userToken', accessToken)
        
      }





    } catch (err) {

      console.log(err);
Alert.alert('Invalid User','Username or password is incorrect',[{text:'Okay'}])




    }
    setIsLoading(false)
  }
  return (
    <SafeAreaView className="flex-1  justify-center   bg-white">
       
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center', marginBottom: 60 }}>
          <ImageBackground source={require('../assets/logo.jpg')} style={{ width: 180, height: 100 }} />
        </View>

        <View style={{ flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 8, marginBottom: 25 }}>

          <FontAwesome5 name="user-alt" size={20} color="black" style={{ marginRight: 10 }} />
          <TextInput placeholder='User Name' style={{ flex: 1, paddingVertical: 0 }} onChangeText={(e) => setUserName(e)} />
        </View>
        <View style={{ flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 8, marginBottom: 25 }}>
          <FontAwesome name="lock" size={20} color="black" style={{ marginRight: 10 }} />
          <TextInput placeholder='Password' style={{ flex: 1, paddingVertical: 0 }} onChangeText={(e) => setPassword(e)} secureTextEntry={true} />
        </View>

        <TouchableOpacity onPress={() => handleSubmit(username, password)} style={{ backgroundColor: '#AD40AF', padding: 20, borderRadius: 10, marginBottom: 30 }}>
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16, textAlign: 'center' }}>
            LOGIN
          </Text>
        </TouchableOpacity>



      
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen