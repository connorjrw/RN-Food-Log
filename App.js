import MenuNavigation from './navigation/MenuNavigation.js';
import HomeNavigation from './navigation/HomeNavigation.js'

// import AddStack from './components/Add.js'
// import { StyleSheet, Text, View } from 'react-native';
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
          },
        }}

      >
        <Tab.Screen name="Home"
        options={{ title: 'Home', style : {
          color:'red'
        }}}

        component={HomeNavigation} 
        
        />
        <Tab.Screen name = "Menu" component = {MenuNavigation}/>
        {/* <Tab.Screen name="Add" component={AddStack}/> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

