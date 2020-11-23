import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Header } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.header}></Text>
      {data.map(data => <Text key={data._id} style={styles.item}>{data.name}</Text>)}
    </View>)
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
    alignItems: 'center',
  },
  header: {
    marginTop: 100,
    fontSize: 50
  },
  item: {
    fontSize: 30
  }
});


