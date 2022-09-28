import { View, Text, Linking, Button, StyleSheet, Image, Pressable, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Audio } from 'expo-av';
import PurchaseCard from '../page-sub-components/PurchaseCard';

const Scanner = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('');
    const [mainScanerDisplay, setMainScanerDisplay] = useState(true);

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
    

    const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        console.log(status);
        setHasPermission(status === 'granted');
      };
    useEffect(() => {
      
  
      getBarCodeScannerPermissions();
    }, []);
  
    const handleBarCodeScanned = ({ type, data }) => {
      playSound()
        console.log('ok');
      setScanned(true);
      setText(data)
      
      
    };
  
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
          
  console.log(scanned);
    return (<>
      { mainScanerDisplay &&<View  style={{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems:'center',
        
        
      }} >
        <View style={styles.barcodebox}> 
          <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{width:500,height:500}}
        /></View></View>}
       <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:5}}>
       <TextInput placeholder='Order Id' style={{ 
    	height: 40, 
      width:180,
    	borderColor: 'gray', 
    	borderWidth: 1,
      padding: 10,
     textAlign:'auto',
      marginTop:10,
      borderRadius:5,
      marginLeft:10
    }} onChangeText={(e) => setText(e)} value={text}  /> 
<TouchableOpacity style={styles.button} onPress={() => {setScanned(false), setText(''),setMainScanerDisplay(true)}}>
      <Text style={styles.text}>Scan</Text>
    </TouchableOpacity>
    
       </View>
      
      
      <View style={styles.container}>
        <ScrollView>
        <PurchaseCard text={text} setMainScanerDisplay={setMainScanerDisplay} mainScanerDisplay={mainScanerDisplay}/>
        </ScrollView>
    
    </View ></>
    );
}

export default Scanner

const styles = StyleSheet.create({
    button: {
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
  });