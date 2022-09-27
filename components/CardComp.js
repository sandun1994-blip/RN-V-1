import * as React from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';



const CardComp = ({ navigation }) => {

  const foods = [{ name: 'sandun' }, { name: 'sandun' }, { name: 'sandun' }, { name: 'sandun' }, { name: 'sandun' }]

  const items= [
    {
      color: '#D14CD1',
      title: 'Stock Scan',
      subtitle: '',
      action: 'Stock Scan',
      icon: 'mdi-barcode-scan',
      link: 'StockScan',
    },

    {
      color: '#F712AA',
      title: 'Bin Scan',
      subtitle: '',
      action: 'Bin Scan',
      icon: 'mdi-barcode-scan',
      link: 'BinScan',
    },
    {
      color: '#952175',
      title: 'Sales Scan',
      subtitle: '',
      action: 'Sales Scan',
      icon: 'mdi-barcode-scan',
      link: 'Sc',
    },
    {
      color: 'green',
      title: 'Purchase Scan',
      subtitle: '',
      action: 'Purchase Scan',
      icon: 'mdi-barcode-scan',
      link: 'PurchaseScan',
    }
  ]
  const handlePush =(item)=>{

    navigation.navigate(item.link)

  }

  const CartCard = ({ item }) => {
    return <View style={{...style.cartCard,backgroundColor:item.color}}>

      <View style={{ height: 140, marginLeft: 10, paddingVertical: 2, flex:1,justifyContent:'space-between'}}>
        <Text style={{  fontSize:25,color:'white' }}>{item.title}</Text>
        
        <TouchableOpacity  style={{ backgroundColor: '#AD40oAF',borderColor:'white',borderWidth:1, padding:1, borderRadius: 50,width:150,height:50,textAlign:'center',alignItems:'center',justifyContent:'center'}} onPress={()=>handlePush(item)}>
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16, textAlign: 'center' }}>
           {item.title}
          </Text>
        </TouchableOpacity>
      </View>


      <MaterialCommunityIcons name="barcode-scan" size={50} color="white" style={{marginRight:20,marginTop:40}}/>
    </View>
  }


  return (<View style={{ flex: 1, backgroundColor: 'white' }}>
   

    {/* <FlatList showsVerticalScrollIndicator={false}
  contentContainerStyle={{paddingBottom:80}}
  data={foods}
  renderItem={({item})=><CartCard item={item}/>}
  
  /> */}
    {items.map((item, i) => (<CartCard key={i} item={item} />))}

  </View>)
}






export default CardComp;

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