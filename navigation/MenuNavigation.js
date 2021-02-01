import React from 'react';
import Menu from '../components/Menu.js'
import MenuItem from '../components/MenuItem.js'
import AddMenuItem from '../components/AddMenuItem.js'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function MenuNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Menu}
                options={
                    {
                        title: 'Food',
                        headerStyle: {
                            borderWidth: 0.5,
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
            <Stack.Screen
                name="Food"
                component={MenuItem}>
            </Stack.Screen>
            <Stack.Screen
                name="Add"
                component={AddMenuItem}>
            </Stack.Screen>
        </Stack.Navigator>
    );
}