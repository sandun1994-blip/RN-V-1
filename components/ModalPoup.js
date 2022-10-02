import { View, Text, Modal } from 'react-native'
import React, { useState } from 'react'


const ModalPoup = ({visible,children}) => {
    const [showModal,setShowModal] = useState(visible)
  return (
    <Modal transparent visible={visible}>
      <View style={{flex:1,backgroundColor:'grey',justifyContent:'center',alignItems:'center'}}>
<View style={{width:'80%',backgroundColor:'white',paddingHorizontal:20,paddingVertical:20,borderRadius:20,elevation:20}}>
    {children}
</View>
      </View>
    </Modal>
  )
}

export default ModalPoup