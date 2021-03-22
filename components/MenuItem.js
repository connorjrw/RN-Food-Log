import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';
import config from '../config.js'
import utils from '../utils.js'
import { useNavigation } from '@react-navigation/native';
import DeleteButton from './DeleteButton.js'
import LoadingWheel from './LoadingWheel.js';

const api = config.api
const axios = require('axios');


function removeFood(navigate, id) {
  navigate('Home')
  axios.post(api + 'removefood', {
    id: id,
  }).then(res => {
    navigate('Home')
  }).catch(err => {
    console.log(err)
  })
}

function editPress(navigate, name, description, photo, recipe, id) {
  navigate('Add', {
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
  const [loading, setLoading] = useState(false)
  const navigate = useNavigation().navigate;


  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      let isMounted = true;
      setId(props.route.params.data.id)
      axios.get(api + "getrecipe", {
        params: {
          id: props.route.params.data.id
        }
      }).then(result => {
      
      result = result.data[0]
      axios.get(utils.getUrl(result._id), {responseType:'blob'}).then(res => {
        let url = utils.getUrl(result._id).toString()
        setPhoto(url)
        setLoading(false)
      }).catch(err => {
        setPhoto(utils.getUrl('none')) //Show generic picture if cannot be found on file server
        setLoading(false)
      })
      setName(result.name)
      setDescription(result.dexscription)
      setRecipe(result.recipe)
      })

      return () => {
        setLoading(true)
        isMounted = false
        isActive = false
      };
    }, [])
  );
  if(!loading){
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
          onPress={() => { editPress(navigate, name, description, photo, recipe, id) }}
        >
          <Text style={styles.buttontext}>Edit</Text>
        </TouchableOpacity>
        <DeleteButton 
        onPress={() => { removeFood(navigate, id) }}
        >
        </DeleteButton>
      </View>
      </ScrollView>
    </View>
  );
  } else{
    return (
    <LoadingWheel/>
    )
  }
}

const styles = StyleSheet.create({
  recipe:{
    fontSize:20,
    marginTop:20, 
    marginLeft:20,
    marginBottom:5
  },
  recipename:{
    fontSize:20,
    backgroundColor:'#293236',
  },
  recipewrap:{
    backgroundColor:'white',
    marginTop:2,
    marginHorizontal:0.9,
    borderBottomRightRadius:3,
    borderBottomLeftRadius:3,
    marginBottom:1
  },
  name: {
    color:'#1e90ff',
    paddingLeft:10,
    paddingTop:5,
    paddingBottom:5,
    borderRadius:5,
    fontSize: 30,
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
  },
  imageStyle: {
    alignSelf: 'stretch',
    flex:1,
    marginLeft:0.8,
    width: '99.5%',
    height: 300,
  },
  imagewrap:{
    // flex:1,
    borderTopWidth:0.5
  },
  button: {
    width:170,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: '#293236',
    paddingVertical: 10
  },
  buttontext: {
    fontSize: 20,
    color: '#1e90ff',
  },
  buttonwrap: {
    marginHorizontal: 20,
    marginBottom:50,
    flexDirection: 'row',
  }
});