import { StyleSheet, Text, View, Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationHelpersContext, useFocusEffect } from '@react-navigation/native';
import 'react-native-gesture-handler';


export default function Food(props) {
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');
   const [photo, setPhoto] = useState('');

   useFocusEffect(
    React.useCallback(() => {
        console.log(props.route.params.data.ph)
        setName(props.route.params.data.name)
        setDescription(props.route.params.data.description)
        setPhoto(props.route.params.data.photo)
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
        <Image
            source={{url: photo}}
            style={styles.imageStyle}
            />
        <Text>{description}</Text>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize:50,
    // alignSelf:'center',
    marginTop:10
  },
  container:{
    flex:1,
    backgroundColor:'white'
  },
  foodwrap:{
    //   borderWidth:0.5
    // backgroundColor:'#293236'
  },
  imageStyle:{
    marginTop:25,
    marginLeft:30,
    width: 300,
    height: 300,
  }
});