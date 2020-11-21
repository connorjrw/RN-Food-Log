import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
const axios = require('axios');
const api = "http://connor.local:3000/"


export default function Home() {
  const [data, setData] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      // alert('Screen was focused');
      axios.get(api + "recipes").then(response => {
        console.log(response.data)
        setData(response.data)
      }).catch(err => {
        console.log(err)
      })
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
    
 
  return (
      <View style = {styles.container}>
          <Text style = {styles.header}>My Recipes</Text>
          <Text style = {styles.header}></Text> 
          {data.map(data => <Text key = {data._id} style = {styles.item}>{data.name}</Text>)}
      </View>
    
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#add8e6',
      alignItems: 'center',
    },
    header:{
          marginTop:100,
          fontSize:50
    },
    item: {
      fontSize:30
    }
  });


