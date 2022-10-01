import { View, Text, Button, StyleSheet, Image, Pressable, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import Constants from 'expo-constants';
import Checkbox from 'expo-checkbox';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
const PurchTable = ({setMainScanerDisplay,id,textSub,setTextSub,scanned,setScanned}) => {

    const { po, setPo,poInitial,setPoInitial,setPoLine,poLine } = useAuth()
    const [isChecked, setChecked] = useState(false);
    const [isMultipeChecked, setMultipeChecked] = useState(false);
    const [subPoLine, setSubPoLines] = useState([]);
    
    
      const [gender, setGender] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Prefer Not to Say", value: "neutral" },
  ]);
    
               
const handleFilter =()=>{
setPo(po=>po.filter(item => item.seqNo ===id))
}
const handleRemove =()=>{
  setPo(()=>poInitial)
  }




  const getPurchaseOrdersLine = async () => {
;
   
    try {
      const res = await axios.get(`http://192.168.1.200:3000/purchaseorderline/purchaseorder/${id}`, { headers: { 'content-Type': 'application/json' } })

      setPoLine(res.data)
      console.log(res.data);
     
    } catch (error) {
      console.log(error);
    }
    
  }



  useEffect(() => {
   
    
      getPurchaseOrdersLine()
      console.log('use effect 3');
    

  }, [])

  useEffect(() => {
   
    if (textSub.length > 3) {
      const a= poLine.find(item => item.stockCode ===textSub )
      console.log(a);
      if (a && !subPoLine.find( ({ stockCode }) => stockCode === a?.stockCode )) {
        setSubPoLines(pre=>[...pre,a])
      }
      
    }
  

}, [textSub])


console.log(poLine);





const onChangeValue =(item,index)=>{
  const newData =subPoLine.map(newItem=>{
    if(newItem.stockCode ==item.stockCode){
      return {
        ...newItem,selected:!item.selected
      }
    }
    return{
      ...newItem
    }
  })
  setSubPoLines(newData)
}


const onChangeValue2 =(item,index)=>{
  const newData =subPoLine.map(newItem=>{
    if(newItem.stockCode ==item.stockCode){
      return {
        ...newItem,mselected:!item.mselected
      }
    }
    return{
      ...newItem
    }
  })
  setSubPoLines(newData)
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
      { po?.length === 1 &&<TextInput placeholder='Stockcode' style={{ 
    	height: 40, 
      width:120,
    	borderColor: 'gray', 
    	borderWidth: 1,
      padding: 10,
     textAlign:'auto',
      marginTop:10,
      borderRadius:5,
      marginLeft:10
    }} onChangeText={(e) => setTextSub(e)} value={textSub}  /> }
{po?.length === 1 &&<TouchableOpacity style={styles.buttonTwo} onPress={() => {setScanned(false), setTextSub('')}}>
      <Text style={styles.text}>Scan sub</Text>
    </TouchableOpacity>}

   

{/*       
     { po?.length > 1 && <TouchableOpacity style={{backgroundColor:'orange',width:70,padding:10,borderRadius:5,
      marginTop:10,justifyContent:'center',alignItems:'center',marginRight:5}} onPress={handleFilter}>
      <Text style={styles.text}>Pick</Text>
    </TouchableOpacity>}

    { po?.length === 1 && <TouchableOpacity style={{backgroundColor:'orange',width:70,padding:10,borderRadius:5,
      marginTop:10,justifyContent:'center',alignItems:'center',marginRight:5}} onPress={handleRemove}>
      <Text style={styles.text}>UnPick</Text>
    </TouchableOpacity>} */}
        
     
    
       </View>
       <View >
       {subPoLine.length>0 && <View style={{flexDirection:'row',justifyContent:'space-around',padding:14,backgroundColor:'blue',margin:5}}>
        <Text style={styles.textg}>STOCKCODE</Text>
      <Text style={styles.textg}>ORDER QTY</Text>
      <Text style={styles.textg}>BINCODE</Text>
      <Text style={styles.textg}>M-SELECT</Text>
      <Text style={styles.textg}>PICKNOW</Text>
      <Text style={styles.textg}>SELECT</Text>
     
        </View>}
      { subPoLine.length>0 && subPoLine.map((item,i)=><View style={{flexDirection:'row',justifyContent:'space-around',backgroundColor:'blue',margin:5,padding:14,borderRadius:10,direction:'row',alignItems:'center'}} key={i}> 
      <Text style={styles.textg}>{item.stockCode}</Text>
      <Text style={styles.textg}>{item.orderQty
      }</Text>
        <View style={styles.drop}>
      
      <DropDownPicker
          items={[
              {label: 'English', value: 'en'},
              {label: 'Deutsch', value: 'de'},
              {label: 'French', value: 'fr'},
          ]}
          defaultIndex={0}
          containerStyle={{height: 40}}
          onChangeItem={item => console.log(item.label, item.value)}
      />
    </View>
      <Checkbox
          style={styles.checkbox}
          value={item?.mselected}
          onValueChange={()=>onChangeValue2(item,i)}
          color={item.mselected ? '#4630EB' : undefined}
        />
      <Text style={styles.textg}>{item.supplyQty}</Text>
      <Checkbox
          style={styles.checkbox}
          value={item?.selected}
          onValueChange={()=>onChangeValue(item,i)}
          color={item.selected ? '#4630EB' : undefined}
        />
     
      </View>)               }
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
      marginRight:10
      
    },
    textg: {
      fontSize: 10,
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
    drop: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
   
  });