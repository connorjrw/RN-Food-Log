import React, { useEffect } from 'react';
const axios = require('axios');
const api = "http://connor.local:3000/"
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import ImagePickerComponent from './ImagePickerComponent'

function select(dataitem, data){
  console.log(dataitem)
  for(var item in data){
    if(data[item]._id == dataitem._id){
      console.log('setting to true')
      data[item]['selected'] = 'True'
    }else{
      console.log('setting to false..')
      data[item]['selected'] = 'False'
    }
  }
  return data
}

const Stack = createStackNavigator();
export default function AddMenuItem({navigation:{navigate, goBack}, route}, props) {
  // const select = route.params.select
  const [name, nameOnChange] = React.useState('');
  const [description, descOnChange] = React.useState('')
  const [photo, updatePhoto] = React.useState('Photo')
  
  function AddPress() {
    console.log('adding!!!')
    axios.post(api + 'addrecipe', {
      name: name,
      description: description,
      photoLocation:photo.uri,
      fileName:photo.fileName
    }).then(res => {
      console.log('done???')
      descOnChange('')
      nameOnChange('')
      updatePhoto('')
      
      console.log('selected', route.params)
      // let test = route.params.select = 'rest'
      // console.log('test', test)
      // res.data['selected'] = 'True' 
      // let updatedData = JSON.parse(JSON.stringify(select(res.data, route.params.data)));
      // route.params.dataSet(updatedData)
      route.params.selectedItemSet(res.data)  
      goBack() //Shouldn't work but it does?
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
