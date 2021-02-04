import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import ImagePicker from './ImagePicker.js'
import config from '../config.js'

const axios = require('axios');
const api = config.api

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


  useFocusEffect(
    React.useCallback(() => {
      console.log('hello')
      let isMounted = true;
      if (route.params) {
        setId(route.params.id)
        nameOnChange(route.params.name)
        descOnChange(route.params.description)
        recipeOnChange(route.params.recipe)
      }
      return () => {
        isMounted = false
      };
    }, [])
  );
  function AddPress() {
    console.log('the', photo.uri)
    axios.post(api + 'addrecipe', {
      name: name,
      description: description,
      photoLocation: photo.uri,
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
    <View style={styles.container}>
      <View style={styles.inputcontainer}>
        <View style={styles.textwrap}>
          <Text style={styles.inputtitle}>Name</Text>
        </View>
        <TextInput
          multiline={true}
          style={styles.input}
          onChangeText={name => nameOnChange(name)}
          value={name}>
        </TextInput>
      </View>
      <View style={styles.inputcontainer}>
        <View style={styles.textwrap}>
          <Text style={styles.inputtitle}>Description</Text>
        </View>
        <TextInput
          multiline={true}
          numberOfLines={1}
          style={styles.input}
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

      <View style={styles.recipecontainer}>
        <View style={styles.recipetextwrap}>
          <Text style={styles.inputtitle}>Recipe</Text>
        </View>
        <View style={styles.recipeinputwrap}>

          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.recipeinput}
            onChangeText={recipe => recipeOnChange(recipe)}
            value={recipe}
          >
          </TextInput>
        </View>

      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={AddPress}
      >
        <Text style={styles.buttontext}>Add</Text>
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
    alignItems: 'center',
    marginTop: 40,
    marginLeft: 10,
    marginRight: 20,
    width: 200,
    borderRadius: 5,
    backgroundColor: '#293236',
    paddingVertical: 10
  },

  inputcontainer: {
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
  textwrap: {
    backgroundColor: '#293236',
    borderRadius: 5,
  },
  recipetextwrap: {
    backgroundColor: '#293236',
    borderRadius: 5,
    height: 60
  },
  inputtitle: {
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
  buttontext: {
    fontSize: 20,
    color: '#1e90ff',
  },
  recipecontainer: {
    // alignItems:'stretch',
    // flexDirection:'row',
    height: 300,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 20,
    borderWidth: 0.5,
    fontSize: 20,
    borderRadius: 5,
  },
  recipeinputwrap: {
    alignItems: 'stretch',
    flexDirection: 'column',
    flex: 1,
    height: 200,
  },
  recipeinput: {
    height: 200,
    fontSize: 20
  }
});
