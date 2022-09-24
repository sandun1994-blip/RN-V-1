import { View, Text, ImageBackground, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { NativeWindStyleSheet } from "nativewind";
import { SafeAreaView } from 'react-native-safe-area-context';
import {FontAwesome, FontAwesome5 } from '@expo/vector-icons';


NativeWindStyleSheet.setOutput({
  default: "native",
});

const LoginScreen = () => {
  return (
    <SafeAreaView className="flex-1  justify-center   bg-white">
      <View style={{paddingHorizontal:25}}>
      <View style={{alignItems:'center',marginBottom:60}}>
        <ImageBackground source={require('../assets/logo.jpg')} style={{width:180,height:100}} />
        </View>
      
      <View style={{flexDirection:'row',borderBottomColor:'#ccc',borderBottomWidth:1,paddingBottom:8,marginBottom:25}}>
     
      <FontAwesome5 name="user-alt" size={20} color="black"   style={{marginRight:10}} />
      <TextInput placeholder='User Name' style={{flex:1,paddingVertical:0}}/>
      </View>
      <View style={{flexDirection:'row',borderBottomColor:'#ccc',borderBottomWidth:1,paddingBottom:8,marginBottom:25}}>
      <FontAwesome name="lock" size={20} color="black" style={{marginRight:10}} />
      <TextInput placeholder='Password' style={{flex:1,paddingVertical:0}}/>
      </View>

      <TouchableOpacity onPress={()=>{}} style={{backgroundColor:'#AD40AF',padding:20,borderRadius:10,marginBottom:30}}>
        <Text style={{color:'#fff',fontWeight:'700',fontSize:16,textAlign:'center'}}>
LOGIN
        </Text>
      </TouchableOpacity>
      
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen