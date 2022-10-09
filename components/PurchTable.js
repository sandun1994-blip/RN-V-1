import { View, Text, Button, StyleSheet, Image, Pressable, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import Constants from 'expo-constants';
import Checkbox from 'expo-checkbox';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import SelectList from 'react-native-dropdown-select-list'
import { getBincode, getBincodeWithQty, getSupplyQty } from '../function/func';
import ModalPoup from './ModalPoup';
import { AntDesign } from '@expo/vector-icons';
const PurchTable = ({ setMainScanerDisplay, id, textSub, setTextSub, scanned, setScanned }) => {

  const { po, setPo, poInitial, setPoInitial, setPoLine, poLine } = useAuth()
  const [isChecked, setChecked] = useState(false);
  const [isMultipeChecked, setMultipeChecked] = useState(false);
  const [subPoLine, setSubPoLines] = useState([]);
  const [selected, setSelected] = useState("");
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleWarning, setVisibleWarning] = useState(false);
  
  const [editedItem, setEditedItem] = useState([]);

  
  
  const [dialogBincode, setDialogBincode] = useState(false);
  const [dialogMgError, setDialogMgError] = useState('');


  
 

  const data = [{ key: '1', value: 'Jammu ' }, { key: '2', value: 'san ' }, { key: '3', value: 'Jammlllllllljjjjjjjjjjjjjkku ' }];

  const [gender, setGender] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Prefer Not to Say", value: "neutral" },
  ]);


  const handleFilter = () => {
    setPo(po => po.filter(item => item.seqNo === id))
  }
  const handleRemove = () => {
    setPo(() => poInitial)
  }




  const getPurchaseOrdersLine = async () => {
    ;

    try {
      const res = await axios.get(`http://192.168.1.200:3000/purchaseorderline/purchaseorder/${id}`, { headers: { 'content-Type': 'application/json' } })
      const data = res.data.map((element) => {
        return {
          binCodeArrayWithQty: getBincodeWithQty(element),
          supplyQty: getSupplyQty({ ...element, binCodeArrayWithQty: getBincodeWithQty(element) }),
          ...element,
        }
      })
      setPoLine(data)
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
      const a = poLine.find(item => item.stockCode === textSub)
      console.log(a);
      if (a && !subPoLine.find(({ stockCode }) => stockCode === a?.stockCode)) {
        setSubPoLines(pre => [...pre, { ...a, binCodeArray: getBincode(a), }])
      }

    }


  }, [textSub])


const handleConfirm = ()=> {
  let binInfo
  let condition

  const dataArray = subPoLine.filter((e) => e.selected)
  const multiSelectArray = []
  const postArray = []

  dataArray.forEach((item, index) => {
    if (item.multipleSelect) {
      item.binCodeArrayWithQty.forEach((element) => {
        if (Number(element.qty) > 0) {
          multiSelectArray.push({
            ...item,
            binCode: element.binCode,
            supplyQty: Number(element.qty),
          })
        }
      })
    } else {
      multiSelectArray.push(item)
    }
  })

  multiSelectArray.forEach((item, index) => {
    binInfo =
      item?.stockLocationBinInfo?.length > 0 &&
      item?.stockLocationBinInfo.find(
        (element) =>
          element.binCode === item.binCode &&
          element.stockCode === item.stockCode &&
          element.location === item.location
      )

    if (!(item.binCode && binInfo)) {
      condition = true
    } else {
      postArray.push(item)
    }
  })
  console.log(multiSelectArray);

  if (multiSelectArray.length > 0) {
    if (!condition) {
     setVisible(true)
      setEditedItem(postArray)
      // this.dialogCode = item.stockItem.stockCode
    } else {
      setVisibleWarning(true)
      setDialogMgError('Select Valid Bincode')
     
    }
  } else {

    setVisibleWarning(true)
    setDialogMgError('Pick a Value')
   
  }
  console.log( postArray)
}



  const onChangeValue = (item, index) => {
    const newData = subPoLine.map(newItem => {
      if (newItem.stockCode == item.stockCode) {
        return {
          ...newItem, selected: !item.selected
        }
      }
      return {
        ...newItem
      }
    })
    setSubPoLines(newData)
  }


  const onChangeValue2 = (item, index) => {
    const newData = subPoLine.map(newItem => {
      if (newItem.stockCode == item.stockCode) {
        return {
          ...newItem, multipleSelect: !item.multipleSelect
        }
      }
      return {
        ...newItem
      }
    })
    setSubPoLines(newData)
  }

  const onChangeValue3 = (item, index) => {
    console.log(selected);
    const newData = subPoLine.map(newItem => {
      if (newItem.stockCode == item.stockCode) {
        console.log(newItem.binCodeArray);
        return {
          ...newItem, binCode: selected
        }
      }
      return {
        ...newItem
      }
    })
    setSubPoLines(newData)
  }

  const onChangeValue4 = (item, e) => {

    const newData = subPoLine.map(newItem => {
      if (newItem.stockCode == item.stockCode) {

        return {
          ...newItem, supplyQty: e
        }
      }
      return {
        ...newItem
      }
    })
    setSubPoLines(newData)
  }


  const onChangeValue5 = (item, d, e) => {

    const newData = subPoLine.map(newItem => {
      if (newItem.stockCode == item.stockCode) {
        const newBinArray = newItem.binCodeArrayWithQty.map(ele => {
          if (ele.binCode == d.binCode) {
            return { ...ele, qty: e }
          }
          return ele
        })


        return {
          ...newItem, binCodeArrayWithQty: newBinArray, supplyQty: getSupplyQty({ ...newItem, binCodeArrayWithQty: newBinArray })
        }
      }
      return {
        ...newItem
      }
    })
    setSubPoLines(newData)
  }


  const upPickQty =async ()=> {
    setVisible(false) 
    const url = 'http://192.168.1.200:3000/salesandpurch'
    const config = {
      method: 'post',
      url,
      headers: {
        'Content-Type': 'application/json',
       
      },
      data: {
        data: editedItem,
        headers: {
          'Content-Type': 'application/json',
         
        },
        user: 'loggedInUser',
      },
    }

    await axios(config)
      .then((res) => {
        console.log(res)
        // //   await this.upBinQty(this.editedItem)
        // if (res?.data) {
        //   this.dialogUpdateMessage = res.data.message
        //   this.messageUpdateColor = 'error'
        // } else {
        //   this.dialogUpdateMessage = ' Update Successfully'
        //   this.messageUpdateColor = 'success'
        // }
      })
      .catch((err) => {
        // this.dialogUpdateMessage = err.response.data.message
        // this.messageUpdateColor = 'error'

        console.log(err);
      })
  }


  const upPickQtyWithTrans =async () =>{
    
    const url = process.env.BASE_URL + 'salesandpurch/trans'
    const config = {
      method: 'post',
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.$auth.strategy.token.get(),
      },
      data: {
        data: this.editedItem,
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.$auth.strategy.token.get(),
        },
        user: this.loggedInUser.username,
      },
    }

    await axios(config)
      .then((res) => {
        console.log(res)
        //   await this.upBinQty(this.editedItem)
        if (res?.data) {
          this.dialogUpdateMessage = res.data.message
          this.messageUpdateColor = 'error'
        } else {
          this.dialogUpdateMessage = ' Update Successfully'
          this.messageUpdateColor = 'success'
        }
      })
      .catch((err) => {
        this.dialogUpdateMessage = err.response.data.message
        this.messageUpdateColor = 'error'
      })
  }



  return (
    <View>
      <View style={{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',


      }} >
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
        {po?.length === 1 && <TextInput placeholder='Stockcode' style={{
          height: 40,
          width: 120,
          borderColor: 'gray',
          borderWidth: 1,
          padding: 10,
          textAlign: 'auto',
          marginTop: 10,
          borderRadius: 5,
          marginLeft: 10
        }} onChangeText={(e) => setTextSub(e)} value={textSub} />}
        {po?.length === 1 && <TouchableOpacity style={styles.buttonTwo} onPress={() => { setScanned(false), setTextSub('') }}>
          <Text style={styles.text}>Scan sub</Text>
        </TouchableOpacity>}



        <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
<ModalPoup visible={visibleWarning}><View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>

<TouchableOpacity onPress={()=>setVisibleWarning(false)} style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
  <Text style={{marginRight:10}}>Close</Text>
  <Text style={{marginRight:10}}>{dialogMgError}</Text>
</TouchableOpacity>
</View>
</ModalPoup>
  



</View>

<View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
<ModalPoup visible={visible}><View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
<TouchableOpacity onPress={()=>setVisible(false)} style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
  <Text style={{marginRight:10}}>Close</Text>
<AntDesign name="closecircle" size={24} color="black"  />
</TouchableOpacity>
<TouchableOpacity onPress={upPickQty} style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
  <Text style={{marginRight:10}}>upPickQty</Text>
<AntDesign name="closecircle" size={24} color="black"  />
</TouchableOpacity>
<TouchableOpacity onPress={upPickQtyWithTrans} style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
  <Text style={{marginRight:10}}>upPickQtyWithTrans</Text>
<AntDesign name="closecircle" size={24} color="black"  />
</TouchableOpacity>
</View>
</ModalPoup>
  <Button title='CONFIRM' onPress={handleConfirm}/>



</View>











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
        {subPoLine.length > 0 && <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 14, backgroundColor: 'blue', margin: 5 }}>
          <Text style={styles.textg}>STOCKCODE</Text>
          <Text style={styles.textg}>ORDER QTY</Text>
          <Text style={styles.textg}>BINCODE</Text>
          <Text style={styles.textg}>M-SELECT</Text>
          <Text style={styles.textg}>PICKNOW</Text>
          <Text style={styles.textg}>SELECT</Text>

        </View>}
        {subPoLine.length > 0 && subPoLine.map((item, i) => <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'blue', margin: 5, padding: 20, borderRadius: 10, direction: 'row', alignItems: 'center' }} key={i}>
          <Text style={styles.textg}>{item.stockCode}</Text>
          <Text style={styles.textg}>{item.orderQty
          }</Text>


          {item?.multipleSelect ? <View>{item.binCodeArrayWithQty.map((d, i) => <View key={i} style={{flexDirection: 'row', justifyContent: 'space-around', padding: 14}}>
            <Text>{d.binCode}</Text>

            <TextInput style={{
              height: 30,
              width: 60,
              borderColor: 'gray',
              borderWidth: 1,
              padding: 1,
              textAlign: 'center',
              marginTop: 1,
              borderRadius: 5,
              marginLeft: 1
            }} onChangeText={(e) => onChangeValue5(item, d, e)} value={`${d.qty}`} keyboardType='numeric' />

          </View>)}
          </View> : <SelectList onSelect={() => onChangeValue3(item, i)}
            setSelected={setSelected}
            data={item?.binCodeArray} search={false}
            boxStyles={{ height: 50, borderRadius: 10, width: 100, backgroundColor: 'blue', padding: 0 }} //override default styles
            defaultOption={ {key:item?.binCodeArray[0], value:item?.binCodeArray[0]} }
          />}

          <Checkbox
            style={styles.checkbox}
            value={item?.multipleSelect}
            onValueChange={() => onChangeValue2(item, i)}
            color={item.multipleSelect ? '#4630EB' : undefined}
          />
          <TextInput style={{
            height: 30,
            width: 60,
            borderColor: 'gray',
            borderWidth: 1,
            padding: 1,
            textAlign: 'center',
            marginTop: 1,
            borderRadius: 5,
            marginLeft: 1
          }} onChangeText={(e) => onChangeValue4(item, e)} value={`${item.supplyQty}`} keyboardType='numeric' />
          <Checkbox
            style={styles.checkbox}
            value={item?.selected}
            onValueChange={() => onChangeValue(item, i)}
            color={item.selected ? '#4630EB' : undefined}
          />

        </View>)}
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
    width: 100,
    marginTop: 10,
    marginRight: 10

  },
  textg: {
    fontSize: 10,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    width: 370,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'red',
    marginTop: 5
  },
  container: {
    paddingTop: 4,
    backgroundColor: '#ddd',

  }, button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: 'blue',
    width: 180,
    marginTop: 10,
    marginRight: 10
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    width: 370,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'black',
    marginTop: 5
  },
  container: {
    paddingTop: 4,
    backgroundColor: '#ddd',

  },

  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15
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