import { StatusBar } from 'expo-status-bar';
import React from 'react';
const axios = require('axios');
const api = "http://connor.local:3000/"
import { StyleSheet, Text, View, Form, Label, TextInput, TouchableOpacity } from 'react-native';

import { useForm } from "react-hook-form";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// const Tab = createBottomTabNavigator();


export default function Add() { 
    // const { register, handleSubmit } = useForm();
    // const onSubmit = (data) => alert(JSON.stringify(data));
    const [name, nameOnChange] = React.useState('Name');
    const [desciption, descOnChange] = React.useState('Description')

    function AddPress (){
      console.log(name, desciption)
      axios.post(api + 'addrecipe', {
        name:name,
        desciption:desciption
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }


    return (
        <View style = {styles.container}>
          <Text style = {styles.header}>Add Recipe</Text>
            <TextInput
            style={styles.input}
            onChangeText={name => nameOnChange(name)}
            value={name}>
            </TextInput>
            <TextInput
            style={styles.input}
            onChangeText={desciption => descOnChange(desciption)}
            value={desciption}>
            </TextInput>

          <TouchableOpacity
              style={styles.button}
              onPress={AddPress}
            >
        <Text>Add</Text>
      </TouchableOpacity>
        </View>
      )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#add8e6',
      // alignItems: 'center',
    },
    header:{
        alignSelf:'center',
        marginTop:100,
        fontSize:50
    },
    button: {
      alignItems: "center",
      backgroundColor: "white",
      marginTop: 20,
      marginLeft:10,
      marginRight:20,
      // paddingRight: 20,
      // paddingLeft: 20,
      paddingVertical:10
    },
    label: {
      // textAlign:'right'
    },
    inputco:{
      flex: 1, 
      flexDirection: 'column',
      // alignItems:'stretch'
    },  
    input:{
      height: 40, 
      // width:20,
      marginLeft:10,
      marginTop:20,
      marginEnd: 20,
      paddingHorizontal:20,
      // textAlign:'right',
      borderColor: 'gray', 
      borderWidth: 1
    }
  });
