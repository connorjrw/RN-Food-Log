import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
const axios = require('axios');
const api = "http://connor.local:3000/"
import { createStackNavigator } from '@react-navigation/stack';

import { StyleSheet, Text, View, Form, Label, TextInput, TouchableOpacity } from 'react-native';
import ImagePickerComponent from './ImagePickerComponent'

import { useForm } from "react-hook-form";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createStackNavigator();

// const Tab = createBottomTabNavigator();

function Add() {
  // const { register, handleSubmit } = useForm();
  // const onSubmit = (data) => alert(JSON.stringify(data));

  const [name, nameOnChange] = React.useState('Name');
  const [description, descOnChange] = React.useState('Desc')
  const [photo, updatePhoto] = React.useState('Photo')

  
  

  function AddPress() {
    console.log(name, description, photo)
    axios.post(api + 'addrecipe', {
      name: name,
      description: description,
      photoLocation:photo.uri,
      fileName:photo.fileName
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <View style={styles.container}>
      {/* <Text>Name</Text> */}
      <TextInput
        multiline = {true}
        style={styles.input}
        onChangeText={name => nameOnChange(name)}
        value={name}>
      </TextInput>
      <TextInput
        multiline={true}
        numberOfLines={1}
        style={styles.input}
        onChangeText={description => descOnChange(description)}
        value={description}>
      </TextInput>

      <ImagePickerComponent photo = {photo => updatePhoto(photo)}/>
      <TouchableOpacity
        style={styles.button}
        onPress={AddPress}
      >
        <Text>Add</Text>
      </TouchableOpacity>
    </View>
  )
}
export default function AddStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Add Recipe"
        component={Add}
        options={ 
          {
            title: 'Add Food',
            headerStyle: {
              backgroundColor: '#add8e6',
              height:88
            },
            headerTitleStyle: {
              alignSelf:'flex-start',
              fontSize: 23,
              textAlign: 'left'
            }
          }
        }

      />
    </Stack.Navigator>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#add8e6',
    // alignItems: 'center',
  },
  header: {
    alignSelf: 'center',
    marginTop: 100,
    fontSize: 50
  },
  button: {
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 20,
    width:100,
    backgroundColor:'#add8e6',  
    // paddingRight: 20,
    // paddingLeft: 20,
    paddingVertical: 10
  },
  label: {
    // textAlign:'right'
  },
  inputco: {
    flex: 1,
    flexDirection: 'column',
    // alignItems:'stretch'
  },
  inputdescription: {
    height: 160,
    // width:20,
    marginLeft: 10,
    marginRight:10,
    marginTop: 20,
    // marginEnd: 20,
    paddingHorizontal: 20,
    borderBottomWidth:0.5,

    // textAlign:'right',
    // borderColor: 'gray',
    // borderWidth: 1
  },
  input: {
    height: 20,
    marginLeft: 5,
    marginRight:5,
    marginTop: 40,
    paddingBottom:10,
    borderBottomWidth:0.5
  }
});
