import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { getDate } from '../function/func'
import PurchTable from '../components/PurchTable'
import CartCard from '../components/CartCard'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Audio } from 'expo-av';
import useAuth from '../hooks/useAuth'
const PurchaseCard = ({ text,setMainScanerDisplay,mainScanerDisplay }) => {
  const { po, setPo,poInitial,setPoInitial } = useAuth()

 

  const [isLoading, setIsLoading] = useState(false)
  const [subScanerDisplay, setSubScanerDisplay] = useState(false);
  
  const [scanned, setScanned] = useState(false);
  const [textSub, setTextSub] = useState('');
 

  const [sound, setSound] = React.useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(require('../assets/beep.mp3'));
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
    

    const handleBarCodeScanned = ({ type, data }) => {
      playSound()
        console.log('ok');
      setScanned(true);
      setTextSub(data)
      
    };
  
 


 
  const getPurchaseOrders = async () => {
   
    setIsLoading(true)
    try {
      const res = await axios.get(`http://192.168.1.200:3000/purchaseorder/search/bycode/?orderid=${text}`, { headers: { 'content-Type': 'application/json' } },)

      setPo(res.data)
      setPoInitial(res.data)
      if (res.data.length>0) {
        setMainScanerDisplay(false)
        
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false)
  }


  useEffect(() => {
    console.log('use effect');
    if (text.length > 3) {
      getPurchaseOrders()
      console.log('use effect 2');
    }

  }, [text])
  
 

  if (isLoading) {
    return (<View style={{ margin: 20 }} >
      <ActivityIndicator size={'small'} />
    </View>)

  }

  return (<>{!mainScanerDisplay&&
  <View  style={{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems:'center',
        
        
      }} >
        <View style={style.barcodebox}> 
          <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{width:500,height:500}}
        /></View></View>
    }
    <View style={{ backgroundColor: 'green',margin:10,borderRadius:10 }}>
      {
        po.length > 0 && po.map(((item, i) => <CartCard key={i} item={item} setMainScanerDisplay={setMainScanerDisplay} textSub={textSub} setTextSub={setTextSub} scanned={scanned} setScanned={setScanned}/>))
      }
     
    </View>

    </>

  )
}

export default PurchaseCard



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

  }
})