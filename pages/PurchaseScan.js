import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Scanner from '../components/Scanner'

const PurchaseScan = () => {

  const [te,setTe] =useState([1,2,3])
const [we,setWe] =useState([5,6,7,8])
const handleFilter =()=>{
setPo(po=>po.filter(item => item.seqNo ===id))
}
const handleRemove =()=>{
  setTe((p)=>we)
  
  }
  console.log(te);
  return (
    <View>
      <TouchableOpacity onPress={handleRemove}><Text>PurchaseScan</Text></TouchableOpacity>
      <Scanner/>
    </View>
  )
}

export default PurchaseScan