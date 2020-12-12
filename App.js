import FoodListStack from './components/FoodList.js';
import HomeStack from './components/Home.js'
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
          style:{
            backgroundColor:'#293236'
          },
          labelStyle: {
            fontSize: 25,
            paddingBottom:10
          },
        }}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name = "Food" component = {FoodListStack}/>
        <Tab.Screen name="Add" component={AddStack}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

