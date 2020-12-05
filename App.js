import Home from './components/Home.js';
import AddStack from './components/Add.js'
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();




export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          tabBarLabel: 'Home',
          title: 'hello',
          style:{
            backgroundColor:'#293236'
          },
          labelStyle: {
            fontSize: 25,
            paddingBottom:10
          },
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Add" component={AddStack} styles={styles} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
function navbar(){}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#add8e6',
    // alignItems: 'center',
  },
  header: {
    marginTop: 100,
    // fontSize: 50
  }
});