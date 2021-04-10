import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from './ImagePicker.js'
import config from '../config.js'
import GeneralButton from './GeneralButton.js'
// var dismissKeyboard = require('dismissKeyboard');


const axios = require('axios');
const api = config.api

function AddRecipeText(navigate, params){
  navigate('AddRecipeText', {params:params})
}

export default function AddMenuItem({ navigation: { navigate, goBack }, route }, props) {
  //check if we are editing rather than adding a new record
  var existingPhoto = false
  if (route.params) {
    if (route.params.photo) {
      existingPhoto = true
    }
  }
 
  const [name, nameOnChange] = React.useState('');
  const [description, descOnChange] = React.useState('')
  const [recipe, recipeOnChange] = React.useState('')
  const [id, setId] = React.useState('')
  const [photo, updatePhoto] = React.useState(existingPhoto ? route.params.photo : '')
  console.log(photo, 'photo?')

  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true;
      if (route.params) {
        if(route.params.id) setId(route.params.id)
        if(route.params.name) nameOnChange(route.params.name)
        if(route.params.description) descOnChange(route.params.description)
        if(route.params.recipe) recipeOnChange(route.params.recipe)
      }
      return () => {
        isMounted = false
      };
    }, [])
  );
  function AddPress() {
    console.log('photo', photo)
    axios.post(api + 'addrecipe', {
      name: name,
      description: description,
      photoLocation: photo.uri,
      photoData:photo.data,
      fileName: photo.fileName,
      recipe: recipe,
      id: id
    }).then(res => {
      descOnChange('')
      nameOnChange('')
      recipeOnChange('')
      updatePhoto('')
      if (route.params) { //coming from Add Entry page
        if (route.params.selectedItemSet) {
          route.params.selectedItemSet(res.data)
        }
      }
      goBack()

    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}
    >
      <View style={styles.container} >
      <View style={styles.inputView}>
        <View style={styles.inputTextView}>
          <Text style={styles.inputTitleText}>Name</Text>
        </View>
        <TextInput
          // multiline={false}
          style={styles.input}
          onChangeText={name => nameOnChange(name)}
          returnKeyType="done"
          value={name}>
        </TextInput>
      </View>
      <View style={styles.inputView}>
        <View style={styles.inputTextView}>
          <Text style={styles.inputTitleText}>Description</Text>
        </View>
        <TextInput
          // multiline={true}
          style={styles.input}
          returnKeyType="done"
          onChangeText={description => descOnChange(description)}
          value={description}>
        </TextInput>
      </View>
      <View>
        <ImagePicker
          photo={photo => updatePhoto(photo)}
          currentPhoto={photo}>
        </ImagePicker>
      </View>

      <View style={styles.recipeView}>
        <View style={styles.recipeTextView}>
          <Text style={styles.inputTitleText}>Recipe</Text>
        </View>
        <View style={styles.recipeInputView}>
          <TouchableOpacity
            style={styles.recipeInputText}
            onPress = {() => {AddRecipeText(navigate, route.params)}}
            value={recipe}>
              <Text>{recipe}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <GeneralButton 
          text = 'Add' 
          onPress={AddPress} 
          width = {200} 
          height = {40} 
          paddingTop = {10}
          buttonstyle = {styles.addButton}
          textstyle = {styles.buttonTextStyle}>
      </GeneralButton>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputView: {
    alignItems: 'stretch',
    flexDirection: 'row',
    height: 60,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 20,
    borderWidth: 0.5,
    fontSize: 20,
    borderRadius: 5,
  },
  inputTextView: {
    backgroundColor: '#293236',
    borderRadius: 5,
  },
  addButton: {
    marginTop: 40,
  },
  recipeTextView: {
    backgroundColor: '#293236',
    borderRadius: 5,
    height: 60
  },
  inputTitleText: {
    paddingLeft: 5,
    fontSize: 20,
    paddingTop: 20,
    width: 130,
    color: '#1e90ff',
    fontWeight: 'bold',
    paddingLeft: 10
  },
  input: {
    marginBottom: 10,
    paddingLeft: 10,
    width: 200,
    fontSize: 20,
    alignSelf: 'center'
  },
  buttonTextStyle: {
    fontSize: 20,
    fontWeight:"bold"
  },
  recipeView: {
    height: 300,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 20,
    borderWidth: 0.5,
    fontSize: 20,
    borderRadius: 5,
  },
  recipeInputView: {
    alignItems: 'stretch',
    flexDirection: 'column',
    flex: 1,
    height: 200,
  }
});
