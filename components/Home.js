import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
const axios = require('axios');
const api = "http://connor.local:3000/"


export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(api + "recipes")
      .then(response => {
        setData(response.data)
      })
  }, []);
 
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


