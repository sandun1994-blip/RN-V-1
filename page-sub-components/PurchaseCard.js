import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const PurchaseCard = ({text}) => {


const [po,setPo] =useState([])

const [isLoading,setIsLoading] =useState(false)

console.log(text);
const getPurchaseOrders =async()=>{
console.log(text);
    setIsLoading(true)
try {
    const res = await axios.get(`http://192.168.1.200:3000/purchaseorder/search/bycode/?orderid=${text}`, {headers:{'content-Type':'application/json'}},)
    
    setPo(res.data)
} catch (error) {
    console.log(error);
}
setIsLoading(false)
}


useEffect(()=>{
    console.log('use effect');
    if (text.length>3) {
        getPurchaseOrders()
        console.log('use effect 2');
    }

},[text])
console.log(po);
const CartCard = ({ item }) => {
    return <View style={{...style.cartCard,backgroundColor:'red'}}>

      <View style={{ height: 140, marginLeft: 10, paddingVertical: 2, flex:1,justifyContent:'space-between'}}>
        <Text style={{  fontSize:25,color:'white' }}>{item.seqNo}</Text>
        
        <TouchableOpacity  style={{ backgroundColor: '#AD40oAF',borderColor:'white',borderWidth:1, padding:1, borderRadius: 50,width:150,height:50,textAlign:'center',alignItems:'center',justifyContent:'center'}} onPress={()=>handlePush(item)}>
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16, textAlign: 'center' }}>
           {item.seqNo}
          </Text>
        </TouchableOpacity>
      </View>


      <MaterialCommunityIcons name="barcode-scan" size={50} color="white" style={{marginRight:20,marginTop:40}}/>
    </View>
  }

if (isLoading) {
    return (<View style={{marginTop:20}} >
      <ActivityIndicator size={'small'} />
    </View>)

  }

  return (
    <View style={{ flex: 1 }}>
{
    po.length>0 && po.map(((item,i) =><CartCard key={i} item={item}/>))
}
     
      </View>


     
  )
}

export default PurchaseCard



const style = StyleSheet.create({
    header: {
      paddingVwertical: 20,
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20
    },
    cartCard: {
      height: 150,
      elevation: 1,
      borderRadius: 10,
      backgroundColor: 'white',
      marginVertical: 10,
      marginHorizontal: 20,
      paddingHorizontal: 5,
      flexDirection: 'row',
      flex:1,
     
      justifyContent: 'space-around',
      
    }
  })