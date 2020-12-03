import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Header, ScrollView, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
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
function HomeScreen() {
  const [data, setData] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true; 
      axios.get(api + "recipes").then(response => {
        console.log(response.data)
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
    <ScrollView contentContainerStyle={styles.scrollcontainer} style = {styles.container}>
      {data.map(data => 
        <View key = {data._id} style = {styles.itemcontainer}>
          <View>
            <Text style={styles.item}>{data.name}</Text>
            <Text style={styles.description}>{data.description}</Text>
          </View>
          <View style = {styles.photo}>
          <Image
            source={{url: getUrl(data._id)}}
            style={styles.imageStyle}
          />
          </View>
        </View>)}
       
    </ScrollView>)
}

export default function Home() {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
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
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // borderWidth:0.5,
    // marginBottom:1,
    backgroundColor: 'white',
  },
  scrollcontainer:{
    alignItems: 'stretch'
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
  header: {
    marginTop: 100,
    fontSize: 50
  },
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
  }
});


