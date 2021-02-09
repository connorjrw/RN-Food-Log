import React,  { useState } from 'react';
import { StyleSheet, Text, View, Header, ScrollView, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ustyles from '../std-styles.js'
import GeneralButton from './GeneralButton.js'
import config from '../config.js'
import { useIsFocused } from '@react-navigation/native';
import utils from '../utils.js'
var RNFS = require('react-native-fs');


const axios = require('axios');
const api = config.api

//Keeping this here for now
// process.cwd = function () {
//   return '/';
// }

async function getPhoto(id){
  return utils.getUrl(id)
}

function changepage(navigate, data){
  navigate('Food', {data:{
    name:data.name,
    description:data.description,
    id:data._id,
    navigate:navigate,  
    recipe:data.recipe,
    photo:utils.getUrl(data._id)
  }})
}

export default function Menu({ navigation: { navigate } }) {
  const [data, setData] = useState([]);
  const [photo, setPhoto] = useState('')
  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true; 
      setData([])
      async function getData(){
        let response =  await axios.get(api + "recipes")
        setData(response.data)
      }
      getData()
      return () => {
        isMounted = false
      };
    }, [])
  );
  return (
    <ScrollView contentContainerStyle={ustyles.scrollcontainer} style = {ustyles.container}>
      {data.map(data => 
        <View key = {data._id}>
        <TouchableOpacity onPress = { () => {changepage(navigate, data)}} style = {FLStyles.itemcontainer}>
          <View>
            <Text style={FLStyles.item}>{data.name}</Text>
            <Text style={FLStyles.description}>{data.description}</Text>
          </View>
          <View style = {FLStyles.photo}>
          <Image
            source={{url: utils.getUrl(data._id)}}
            style={FLStyles.imageStyle}
          />
          </View>
          </TouchableOpacity>
        </View>)}
        <GeneralButton text = "Add" 
          onPress = {() => {
            console.log('adding,', setData)
            navigate('Add', { update: setData})
          }}
          height = {35} 
          width = {150} 
          paddingTop= {5}>
        </GeneralButton>
       
    </ScrollView>)
}


const FLStyles = StyleSheet.create({
    item: {
      marginLeft:20,
      marginTop:20,
      fontSize: 30,
    },
    description: {
      marginLeft:20,
      marginTop:10,
      fontSize: 10
    },
    imageStyle: {
      alignSelf:'flex-start',
      borderRadius:10,
      paddingRight:2,
      width: 99,
      height: 99,
    },
    itemcontainer:{
      flexDirection: 'row',
      justifyContent:'space-between',
      marginHorizontal:10,
      marginVertical:10,
      height:100,
      alignItems:'stretch',
      backgroundColor:'white',
      borderColor:'grey',     
      borderRadius:10,
      borderWidth:0.5
    },
})






