import React, { useState } from 'react';
import { NavigationHelpersContext, useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MenuItemButton from './MenuItemButton.js'
import GeneralButton from './GeneralButton.js'

const axios = require('axios');
const api = "http://connor.local:3000/"

function select(dataitem, data){
  console.log(dataitem)
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

function addEntry(selectedItem, selectedType, selectedDate, navigate){
  axios.post(api + 'addfood', {
    date: selectedDate, 
    food_id:selectedItem._id,
    type:selectedType
  }).then(resp => {
    navigate('Home')
  })
}
function addNew(navigate, selectedItemSet, dataSet, data){
  // console.log('selected', select)
  // const updatedData = JSON.parse(JSON.stringify(select(dataitem, data)));
  //         setData(updatedData)
  //         setSelectedItem(dataitem)  
  navigate('Add New', {
    selectedItemSet:selectedItemSet, 
    dataSet:dataSet,
    data:data
  })
}

export default function AddEntry(props) {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedType, setSelectedType] = useState('Breakfast')
  const selectedDate = props.route.params.date
  const navigate = props.route.params.navigate
  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true; 
      axios.get(api + "recipes").then(response => {
        console.log('selected item', selectedItem)
        for(var item in response.data){
          console.log(selectedItem, response.data[item]['_id'], 'ser')
          if(selectedItem['_id'] == response.data[item]['_id'] ){
            response.data[item]['selected'] = 'True'
          }else{
            response.data[item]['selected'] = 'False'
          }
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
    }, [selectedItem])
  );
  return (
    <View style = {styles.container}>
        <View style = {styles.buttonwrap}>
          <Text style = {styles.date}>{selectedDate}</Text>
          <View style = {styles.button2}>
          <GeneralButton text = 'Breakfast' 
              onPress = { () => { setSelectedType('Breakfast')}}
              buttonstyle={[styles.menuitem, selectedType == 'Breakfast' ? styles.menuitemselected : styles.menuitem]}
              textstyle = {styles.menuitemtext}>
          </GeneralButton>
          <GeneralButton text = 'Lunch' 
              onPress = { () => { setSelectedType('Lunch')}}
              buttonstyle={[styles.menuitem, selectedType == 'Lunch' ? styles.menuitemselected : styles.menuitem]}
              textstyle = {styles.menuitemtext}>
          </GeneralButton>
          <GeneralButton text = 'Dinner' 
              onPress = { () => { setSelectedType('Dinner')}}
              buttonstyle={[styles.menuitem, selectedType == 'Dinner' ? styles.menuitemselected : styles.menuitem]}
              textstyle = {styles.menuitemtext}>
          </GeneralButton>
      </View>
    </View>
    <View style = {styles.foodoption}>
      <ScrollView>
        {data.map(dataitem => 
        <View key = {dataitem._id}>
        <MenuItemButton fooddata = {dataitem} onPress = { () => {
          const updatedData = JSON.parse(JSON.stringify(select(dataitem, data)));
          setData(updatedData)
          setSelectedItem(dataitem)
          }}>
        </MenuItemButton>
        </View>)}
      </ScrollView>
    </View>
    <View style = {styles.addwrap}>
    <View style = {styles.submit}>
      <GeneralButton text = 'Add' 
      onPress = {() => {addEntry(selectedItem, selectedType, selectedDate, navigate)}}
      buttonstyle = {styles.addbutton}></GeneralButton>
    </View>
    <View style = {styles.submit}>
      <GeneralButton text = 'New'
      onPress = {() => {addNew(
        navigate, 
        selectedItemSet => setSelectedItem(selectedItemSet), 
        dataSet => setData(dataSet),
        data)}
      }
      buttonstyle = {styles.addbutton}></GeneralButton>
    </View>
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
  date:{
    alignSelf:'center',
    marginTop:15,
    fontSize:27
  },
  menuitem: {
    alignItems:'center',
    marginTop: 50,
    height:40,
    width:105,
    backgroundColor:'white', 
    borderWidth:0.5
  },
  menuitemselected:{
    backgroundColor:'#293236'
  },
  foodoption:{
    height:500,
    marginTop:40,
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
    // marginTop:20,
    height:80,
  }, 
  addwrap:{
    flex:1,
    flexDirection:'row',
    alignSelf:'center'
  },
  button2:{
    flex:1,
    flexDirection:'row',
    marginHorizontal:20,
    justifyContent:'space-between',
  },
  submit:{
    alignItems:'center',
    marginHorizontal:10,
    // alignSelf:'center'
  }, 
  addbutton:{
    // marginTop:10,
    alignSelf:'auto',
    paddingTop:8,
    
    height:40
  }
})

