import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Header, ScrollView, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationHelpersContext, useFocusEffect } from '@react-navigation/native';
import Food from './FoodItem.js'
import { TouchableOpacity } from 'react-native-gesture-handler';
import ustyles from '../std-styles.js'

const axios = require('axios');
const api = "http://connor.local:3000/"
var fileUrl = require('file-url');  
process.cwd = function () {
  return '/';
}
const Stack = createStackNavigator();

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

function FoodList({ navigation: { navigate } }) {
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
        // Do something when the screen is unfocused
        // Useful for cleanup functions
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

export default function FoodListStack() {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={FoodList}
        options={
          {
            title: 'Food',
            headerStyle: {
              borderWidth:0.5,
              backgroundColor: 'white',
              height: 100
            },
            headerTitleStyle: {
              fontSize: 23,
              textAlign: 'left'
            }
          }
        }

      />
      <Stack.Screen 
        name = "Food"
        component = {Food}>

        </Stack.Screen>
    </Stack.Navigator>
  );
}




