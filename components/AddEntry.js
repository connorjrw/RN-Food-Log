import React, { useState } from 'react';
import { NavigationHelpersContext, useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FoodItemButton from './FoodItemButton.js'
import GeneralButton from './GeneralButton.js'

const axios = require('axios');
const api = "http://connor.local:3000/"

function select(dataitem, data){
  for(var item in data){
    if(data[item]._id == dataitem._id){
      console.log('setting to true')
      data[item]['selected'] = 'True'
    }else{
      console.log('setting to false..')
      data[item]['selected'] = 'False'
    }
  }
  return data
}

function selectMenu(){

}

export default function AddEntry() {
  const [data, setData] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true; 
      axios.get(api + "recipes").then(response => {
        // final = {}
        for(var item in response.data){
          response.data[item]['selected'] = 'False'
        }
        setData(response.data)
      }).catch(err => {
        console.log(err)
      })
      return () => {
        isMounted = false
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
  return (
    <View style = {styles.container}>
        <View style = {styles.buttonwrap}>
          <View style = {styles.button2}>
          <GeneralButton text = 'Breakfast' 
              onPress = { () => { selectMenu('Breakfast')}}
              buttonstyle = {styles.menuitem}
              textstyle = {styles.menuitemtext}>
          </GeneralButton>
          <GeneralButton text = 'Lunch' 
              buttonstyle = {styles.menuitem}
              textstyle = {styles.menuitemtext}>
          </GeneralButton>
          <GeneralButton text = 'Dinner' 
              buttonstyle = {styles.menuitem}
              textstyle = {styles.menuitemtext}>
          </GeneralButton>
      </View>
    </View>
    <View style = {styles.foodoption}>
      <ScrollView>
        {data.map(dataitem => 
        <View key = {dataitem._id}>
        <FoodItemButton fooddata = {dataitem} onPress = { () => {
          const updatedData = JSON.parse(JSON.stringify(select(dataitem, data)));
          setData(updatedData)
          console.log(data, 'is')
          }}>
        </FoodItemButton>
        </View>)}
      </ScrollView>
    </View>
    <View style = {styles.submit}>
      <GeneralButton text = 'Add' buttonstyle = {styles.addbutton}></GeneralButton>
    </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'white'
  },
  menuitem: {
    alignItems:'center',
    marginTop: 20,
    height:40,
    width:105,
    backgroundColor:'white', 
    borderWidth:0.5
  },
  foodoption:{
    height:400,
    marginVertical:5,
    marginHorizontal:5,
    // borderWidth:0.5,
    // borderBottomWidth:0.5,
    // borderTopWidth:0.5,
    borderRadius:10
  },  
  menuitemtext:{
    marginTop:10,
    fontSize:15,
  },  
  buttonwrap:{
    height:80,
  }, 
  button2:{
    flex:1,
    flexDirection:'row',
    marginHorizontal:20,
    justifyContent:'space-between',
  },
  submit:{
    alignSelf:'center'
  }, 
  addbutton:{
    paddingTop:8,
    height:40
  }
})

