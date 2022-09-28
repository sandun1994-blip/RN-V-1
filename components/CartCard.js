import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import PurchTable from './PurchTable'
import { getDate } from '../function/func'

const CartCard = ({item,setMainScanerDisplay}) => {
  return (
    <>
    <PurchTable setMainScanerDisplay={setMainScanerDisplay} id={item.seqNo}/>
    <View style={{ ...style.cartCard, backgroundColor: 'red' }}>

      <View >
        <Text style={{ fontSize: 20, color: 'white' }}>{item.seqNo}</Text>
        <Text style={{ fontSize: 15, color: 'white' }}>{item.seqNo}</Text>
        <Text style={{ fontSize: 10, color: 'white' }}>{item.seqNo}</Text>

      
      </View>
<View>
      <Text>Order Date : {getDate(item.orderDate)}</Text>
    { item.dueDate  && <Text>Due Date : {getDate(item.dueDate)}</Text>}</View>
    </View> 
    </>
  )
}

export default CartCard


const style = StyleSheet.create({
    header: {
      paddingVwertical: 0,
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 0
    },
    cartCard: {
     flex:1,
      elevation: 1,
      borderRadius: 10,
      backgroundColor: 'white',
      marginVertical: 10,
      marginHorizontal: 10,
      paddingHorizontal: 5,
      justifyContent: 'space-between',
      flexDirection:'row',
      padding:1
  
    }
  })