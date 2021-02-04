import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';
import config from '../config.js'
import utils from '../utils.js'

const api = config.api
const axios = require('axios');


function removeFood(navigation, id) {
  navigation.navigate('Home')
  axios.post(api + 'removefood', {
    id: id,
  }).then(res => {
    navigation.navigate('Home')
  }).catch(err => {
    console.log(err)
  })
}

function editPress(navigation, name, description, photo, recipe, id) {
  navigation.navigate('Add', {
    name: name,
    description: description,
    photo: photo,
    recipe: recipe,
    id: id
  })
}

export default function MenuItem(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [recipe, setRecipe] = useState('')
  const [id, setId] = useState('')

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      let isMounted = true;
      setId(props.route.params.data.id)
      setPhoto('')
      axios.get(api + "getrecipe", {
        params: {
          id: props.route.params.data.id
        }
      }).then(response => {
        let result = response.data[0]
        setName(result.name)
        setDescription(result.description)
        setPhoto(utils.getUrl(result._id))
        setRecipe(result.recipe)
      })
      return () => {
        isMounted = false
        isActive = false
      };
    }, [])
  );
  return (
    <View style={styles.container}>
      <ScrollView style = {styles.scrollwrap}>
      <View style={styles.foodwrap}>
        <Text style={styles.name}>{name}</Text>
        {/* <Text style={styles.description}>{description}</Text> */}
        <View style = {styles.imagewrap}>
        <Image
          source={{ url: photo }}
          style={styles.imageStyle}
        />
        </View>
        <View style = {styles.recipewrap}>
          <Text style={styles.recipe}>{recipe}</Text>
        </View>



      </View>
      <View style={styles.buttonwrap}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { editPress(props.navigation, name, description, photo, recipe, id) }}
        >
          <Text style={styles.buttontext}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttondelete}
          onPress={() => { removeFood(props.navigation, id) }}
        >
          <Text style={styles.buttontextdelete}>Delete</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  recipe:{
    fontSize:20,
    marginTop:20, 
    marginLeft:20
  },
  recipename:{
    fontSize:20,
    color:'#1e90ff',
    backgroundColor:'#293236',
  },
  recipewrap:{
    backgroundColor:'white',
    // marginHorizontal:20,
    marginTop:2,
    marginHorizontal:2,
    marginBottom:2
  },
  scrollwrap:{
    // flex:1, 
    // alignItems:'stretch'
    // height:500
    // justifyContent:'space-between'
  },
  name: {
    color:'#1e90ff',
    // backgroundColor:'#293236',
    paddingLeft:10,
    paddingTop:5,
    paddingBottom:5,
    borderRadius:5,
    // borderWidth:0.5,
    // borderRadius:5,
    // borderTopLeftRadius:5,
    // borderTopLeftRadius:5,
    // borderTopRightRadius:5,
    fontSize: 30,
    // marginLeft: 10,
    // marginRight:10,
    // marginTop: 10
  },
  description: {
    fontSize: 20,
    marginLeft: 10
  },
  container: {
    flex: 1,
    alignItems:'stretch',
    backgroundColor: 'white'
  },
  foodwrap: {
    marginTop:20,
    marginHorizontal:18,
    backgroundColor:'#293236',
    borderWidth:0.5,
    borderRadius:5
    // borderRadius: 5,
    // marginLeft: 5,
    // marginRight: 5,
    // marginTop: 10,
    // borderWidth: 0.5,
    // paddingLeft: 10
  },
  imageStyle: {
    // marginBottom: 25,
    borderWidth:0.5,
    alignSelf: 'center',
    width: 350,
    height: 300,
  },
  imagewrap:{
    borderTopWidth:0.5
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    alignSelf: 'stretch',
    borderRadius: 5,
    backgroundColor: '#293236',
    paddingVertical: 10
  },
  buttontext: {
    fontSize: 20,
    color: '#1e90ff',
  },
  buttontextdelete: {
    color: 'black',
    fontSize: 20,
  },
  buttondelete: {
    alignSelf: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: 5,
    borderRadius: 5,
    paddingVertical: 10,
    backgroundColor: '#ff1e20'
  },
  buttonwrap: {
    marginHorizontal: 20,
    marginBottom:50,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flex: 1
  }
});