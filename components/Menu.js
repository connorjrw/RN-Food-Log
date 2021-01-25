import React,  { useState } from 'react';
import { StyleSheet, Text, View, Header, ScrollView, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import ustyles from '../std-styles.js'
import GeneralButton from './GeneralButton.js'

const axios = require('axios');
const api = "http://connor.local:3000/"

var fileUrl = require('file-url');  
process.cwd = function () {
  return '/';
}

function getUrl(url){
  return fileUrl('/Users/con/Desktop/React/FoodBus/Images/' + url.toString() + '.png')
}
function changepage(navigate, data){
  navigate('Food', {data:{
    name:data.name,
    description:data.description,
    id:data._id,
    navigate:navigate,
    photo:getUrl(data._id)
  }})
}

export default function Menu({ navigation: { navigate } }) {
  const [data, setData] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true; 
      axios.get(api + "recipes").then(response => {
        console.log('res', response.data)
        setData(response.data)
      }).catch(err => {
        console.log(err)
      })
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
            source={{url: getUrl(data._id)}}
            style={FLStyles.imageStyle}
          />
          </View>
          </TouchableOpacity>
        </View>)}
        <GeneralButton text = "Add" 
          onPress = {() => {
            navigate('Add')
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






