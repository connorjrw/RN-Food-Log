import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// const Tab = createBottomTabNavigator();


export default function Add() {
    return (
        <View style = {styles.container}>
          <Text style = {styles.header}>Add Recipe</Text>
        </View>
      )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#add8e6',
      alignItems: 'center',
    },
    header:{
        marginTop:100,
        fontSize:50
    }
  });
