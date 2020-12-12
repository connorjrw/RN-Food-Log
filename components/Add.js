import React, { useEffect } from 'react';
const axios = require('axios');
const api = "http://connor.local:3000/"
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import ImagePickerComponent from './ImagePickerComponent'

const Stack = createStackNavigator();
function Add({navigation:{navigate}}) {

  const [name, nameOnChange] = React.useState('');
  const [description, descOnChange] = React.useState('')
  const [photo, updatePhoto] = React.useState('Photo')
  
  function AddPress() {
    axios.post(api + 'addrecipe', {
      name: name,
      description: description,
      photoLocation:photo.uri,
      fileName:photo.fileName
    }).then(res => {
      descOnChange('')
      nameOnChange('')
      updatePhoto('')
      navigate('Home')
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <View style={styles.container}>
      <View style = {styles.inputcontainer}>
        <View style = {styles.textwrap}>
        <Text style = {styles.inputtitle}>Name</Text>
        </View>
        <TextInput
        multiline = {true}
        style={styles.input}
        onChangeText={name => nameOnChange(name)}
        value={name}>
        </TextInput>
      </View>
      <View style = {styles.inputcontainer}>
      <View style = {styles.textwrap}>
        <Text style = {styles.inputtitle}>Description</Text>
      </View>
      <TextInput
        multiline={true}
        numberOfLines={1}
        style={styles.input}
        onChangeText={description => descOnChange(description)}
        value={description}>
      </TextInput>
      </View>
      <ImagePickerComponent photo = {photo => updatePhoto(photo)}/>
      <TouchableOpacity
        style={styles.button}
        onPress={AddPress}
      >
        <Text style = {styles.buttontext}>Add</Text>
      </TouchableOpacity>
    </View>
  )
}
export default function AddStack({ navigation: { navigate } }){
  console.log('nav',navigate)
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Add"
        component={Add}
        options={ 
          {
            title: 'Add Food',
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
    </Stack.Navigator>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  button: {
    alignSelf: "center",
    alignItems:'center',
    marginTop: 40,
    marginLeft: 10,
    marginRight: 20,
    width:200,
    borderRadius:5,
    backgroundColor:'#293236',  
    paddingVertical: 10
  },

  inputcontainer:{
    alignItems:'stretch',
    flexDirection:'row',
    height: 60,
    marginLeft: 5,
    marginRight:5,
    marginTop: 20,
    borderWidth:0.5,
    fontSize:20,
    borderRadius:5,
  },
  textwrap:{
    backgroundColor:'#293236',
    borderRadius:5,
  },
  inputtitle:{
    paddingLeft:5,
    fontSize:20,
    paddingTop:20,
    width:130,
    color:'#1e90ff',
    fontWeight:'bold',
    paddingLeft:10
  },
  input: {
    marginBottom:10,
    paddingLeft:10,
    width:200,
    fontSize:20,
    alignSelf:'center'
  },
  buttontext:{
    fontSize:20,
    color:'#1e90ff',
  }
});
