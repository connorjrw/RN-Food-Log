import React from 'react';
import AddEntry from '../components/AddEntry.js'
import Home from '../components/Home.js'
import { createStackNavigator } from '@react-navigation/stack';
import AddMenuItem from '../components/AddMenuItem.js';
import EntryItem from '../components/EntryItem.js';

const Stack = createStackNavigator();
const defaultOptions = {               
    headerStyle: {
        borderBottomWidth: .5,
            height: 85
    },
    headerTitleStyle: {
        fontSize: 20,
    }
}
                

export default function HomeNavigation({ navigation: { navigate } }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={
                    {
                        title: 'Home',
                        headerStyle: {
                            borderBottomWidth: 1,
                            height: 85
                        },
                        headerTitleStyle: {
                            fontSize: 23,
                        }
                    }
                }
            />
            <Stack.Screen
                name="Add Entry"
                component={AddEntry}
                options = {defaultOptions}
            >
            </Stack.Screen>
            <Stack.Screen
                name="Add New"
                component={AddMenuItem}
                options = {defaultOptions}
            >
            </Stack.Screen>
            <Stack.Screen
                name="View Entry"
                component={EntryItem}
                options = {defaultOptions}

            >
            </Stack.Screen>

        </Stack.Navigator>
    );
}