import React from 'react';
import AddEntry from '../components/AddEntry.js'
import Home from '../components/Home.js'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function HomeNavigation({ navigation: { navigate } }){
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={ 
            {
              title: 'Home',
              headerStyle: {
                backgroundColor: 'white',
                height:100
              },
              headerTitleStyle: {
                alignSelf:'flex-start',
                fontSize: 23,
                textAlign: 'left'
              }
            }
          }
        />
        <Stack.Screen 
          name = "Add Entry"
          component = {AddEntry}
          >
        </Stack.Screen>
        
      </Stack.Navigator>
    );
  }