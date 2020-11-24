import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Header, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
const axios = require('axios');
const api = "http://localhost:3000/"

const Stack = createStackNavigator();

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
          {/* <View style={{height: 50, backgroundColor: 'skyblue'}} /> */}
          <Text style={styles.item}>{data.name}</Text>
          <Text style={styles.description}>{data.description} asd</Text>
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
              backgroundColor: '#add8e6',
              height: 88
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
    flex: 1,
    backgroundColor: 'white',
  },
  scrollcontainer:{
    alignItems: 'flex-start'
  },
  itemcontainer:{
    alignSelf:'stretch',
    marginVertical:10,
    marginHorizontal:10,
    height:100,
    // padding:10,
    backgroundColor:'#add8e6',
    borderWidth:2
  },
  header: {
    marginTop: 100,
    fontSize: 50
  },
  item: {
    marginLeft:20,
    marginTop:20,
    fontSize: 30
  },
  description: {
    marginLeft:20,
    marginTop:10,
    fontSize: 10
  }
});


