import { ImageBackground, ScrollView, Text, View } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ListItem from './ListItem'

export class HomeScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{flex:1,borderStartColor:'#fff'}}>
        <ScrollView className='p-5'>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:20}}>
                <Text> HELLO SANDUN</Text>
<ImageBackground source={require('../assets/favicon.png')} style={{width:35,height:35}} imageStyle={{borderRadius:25}}/>
            </View>
            <ListItem/>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default HomeScreen