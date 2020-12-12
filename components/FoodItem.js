import { StyleSheet, Text, View, Image} from 'react-native';
import React, { useEffect, useState } from 'react';

import { NavigationHelpersContext, useFocusEffect } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
const api = "http://connor.local:3000/"
const axios = require('axios');

function removeFood(navigation, id){
    navigation.navigate('Home')

 axios.post(api + 'removefood', {
     id:id,
   }).then(res => {
        navigation.navigate('Home')
   }).catch(err => {
        console.log(err)
   })
 }

export default function Food(props) {
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');
   const [photo, setPhoto] = useState('');
   const [id, setId] = useState('')

   

   useFocusEffect(
    React.useCallback(() => {
        console.log(props.navigation)
        setName(props.route.params.data.name)
        setDescription(props.route.params.data.description)
        setPhoto(props.route.params.data.photo)
        setId(props.route.params.data.id)
      let isMounted = true; 
      return () => {
        isMounted = false
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
  return (
    <View style = {styles.container}>
        <View style = {styles.foodwrap}>
        <Text style = {styles.name}>{name}</Text>
        <Text style = {styles.description}>{description}</Text>
        <Image
            source={{url: photo}}
            style={styles.imageStyle}
            />
        </View>
        <View style = {styles.buttonwrap}>
        <TouchableOpacity
        style={styles.button}
        // onPress={AddPress}
        >
        <Text style = {styles.buttontext}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttondelete}
        onPress = { () =>  {removeFood(props.navigation, id)}}
      >
        <Text style = {styles.buttontextdelete}>Delete</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize:40,
    marginLeft:10,
    // alignSelf:'center',
    marginTop:10
  },
  description:{
    fontSize:20,
    marginLeft:10
  },
  container:{
    flex:1,
    backgroundColor:'white'
  },
  foodwrap:{
      borderRadius:5,
      marginLeft:5, 
      marginRight:5,
      marginTop:20,
      borderWidth:0.5,
      paddingLeft:10
    // backgroundColor:'#293236'
  },
  imageStyle:{
    marginTop:25,
    marginBottom:25,
    alignSelf:'center',
    // borderWidth:0.5,
    // marginLeft:30,
    width: 300,
    height: 300,
  },
  button: {
    alignItems:'center',
    alignSelf:'center',
    marginTop: 20,
    alignSelf:'stretch',
    borderRadius:5,
    backgroundColor:'#293236',  
    paddingVertical: 10
  },
  buttontext:{
    fontSize:20,
    color:'#1e90ff',
  },
  buttontextdelete:{
    color:'black',
    fontSize:20,
  },
  buttondelete:{
    alignSelf:'center',
    alignItems:'center',
    alignSelf:'stretch',
    marginTop: 5,
    // width:350,
    borderRadius:5,
    paddingVertical: 10,
    backgroundColor:'#ff1e20'
  },
  buttonwrap:{
      marginHorizontal:10,
      alignItems:'stretch',
      justifyContent:'flex-start',
      flexDirection:'column',
      flex:1
  }
});