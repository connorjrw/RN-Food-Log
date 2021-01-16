import FoodListStack from './components/FoodList.js';
import HomeStack from './components/Home.js'
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';



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
            // size:30,
            // he
            backgroundColor:'#293236'
          },
          labelStyle: {
            fontSize: 25,
            // marginTop:10
            // padding
            // paddingBottom:10
          },
        }}
        // screenOptions={({ route }) => ({
        //   tabBarIcon: ({ color, size }) => {
        //     const icons = {
        //       Home: 'home',
        //       Profile: 'account',
        //     };
      
        //     return (
        //       <Icon
        //         name={icons[route.name]}
        //         color={color}
        //         size={40}
        //         // height={50}
        //         marginBottom={10}
        //       />
        //     );
        //   },
        // })}
      >
        <Tab.Screen name="Home"
        options={{ title: 'Home', style : {
          color:'red'
        }}}

        component={HomeStack} 
        
        />
        <Tab.Screen name = "Food" component = {FoodListStack}/>
        {/* <Tab.Screen name="Add" component={AddStack}/> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

