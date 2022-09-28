import { View, Text, Button, StyleSheet, Image, Pressable, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
;

import Checkbox from 'expo-checkbox';
import useAuth from '../hooks/useAuth';
const PurchTable = ({textSub,setTextSub,setMainScanerDisplay,id}) => {

    const { po, setPo } = useAuth()

    const [isSelected, setSelection] = useState(false); 


const handleFilter =()=>{
setPo(po.filter(item => item.seqNo ===id))
}


  return (
    <View>
         <View  style={{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems:'center',
        
        
      }} >
        </View>
       <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:5}}>
       <TextInput placeholder='Stockcode' style={{ 
    	height: 40, 
      width:120,
    	borderColor: 'gray', 
    	borderWidth: 1,
      padding: 10,
     textAlign:'auto',
      marginTop:10,
      borderRadius:5,
      marginLeft:10
    }} onChangeText={(e) => setTextSub(e)} value={textSub}  /> 
<TouchableOpacity style={styles.buttonTwo} onPress={() => {setScanned(false), setTextSub('')}}>
      <Text style={styles.text}>Scan</Text>
    </TouchableOpacity>

   

      
      <TouchableOpacity style={{backgroundColor:'orange',width:70,padding:10,borderRadius:5,
      marginTop:10,justifyContent:'center',alignItems:'center',marginRight:5}} onPress={handleFilter}>
      <Text style={styles.text}>Pick</Text>
    </TouchableOpacity>
        
     
    
       </View>
    </View>
  )
}

export default PurchTable



const styles = StyleSheet.create({
    buttonTwo: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 2,
      borderRadius: 5,
      elevation: 3,
      backgroundColor: 'blue',
      width:100,
      marginTop:10,
      
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    barcodebox:{
        alignItems: 'center',
        justifyContent: 'center',
        height:150,
        width:370,
        overflow:'hidden',
        borderRadius:30,
        backgroundColor:'red',
        marginTop:5
    },
    container:{
      paddingTop:4,
      backgroundColor:'#ddd', 

    },button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 5,
      elevation: 3,
      backgroundColor: 'blue',
      width:180,
      marginTop:10,
      marginRight:10
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    barcodebox:{
        alignItems: 'center',
        justifyContent: 'center',
        height:150,
        width:370,
        overflow:'hidden',
        borderRadius:30,
        backgroundColor:'black',
        marginTop:5
    },
    container:{
      paddingTop:4,
      backgroundColor:'#ddd', 

    },
    
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight:15
    },
    paragraph: {
      fontSize: 15,
    },
    checkbox: {
      margin: 8,
    },
  });