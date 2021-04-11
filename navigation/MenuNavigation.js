import React from 'react';
import Menu from '../components/Menu.js'
import MenuItem from '../components/MenuItem.js'
import AddMenuItem from '../components/AddMenuItem.js'
import RecipeText from '../components/RecipeText.js'
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
                        title: 'Menu',
                        headerStyle: {
                            backgroundColor: 'white',
                            borderBottomWidth:.5,
                            borderBottomColor:'grey',
                            height: 85
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
                component={MenuItem}
                options={
                    {
                    headerStyle : {
                        backgroundColor: 'white',
                            borderBottomWidth:1,
                            height: 85
                    }
                }
            }
                >
            </Stack.Screen>
            <Stack.Screen
                name="Add"
                component={AddMenuItem}>
            </Stack.Screen>
            <Stack.Screen
                name = "AddRecipeText"
                component={RecipeText}>
            </Stack.Screen>
        </Stack.Navigator>
    );
}