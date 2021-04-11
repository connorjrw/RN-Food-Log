import React, { useState } from 'react';
import { StyleSheet, Text, View, Header, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import ustyles from '../std-styles.js'
import GeneralButton from './GeneralButton.js'
import config from '../config.js'
import utils from '../utils.js'
import FoodImage from './FoodImage.js';
import LoadingWheel from './LoadingWheel.js'

const axios = require('axios');
const api = config.api


function changepage(navigate, data) {
  navigate('Food', {
    data: {
      name: data.name,
      description: data.description,
      id: data._id,
      navigate: navigate,
      recipe: data.recipe,
      photo: utils.getUrl(data._id)
    }
  })
}

export default function Menu() {
  const [data, setData] = useState([]);
  const [photo, setPhoto] = useState('')
  const [loaded, setLoaded] = useState(false)
  const navigate = useNavigation().navigate;
  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true;
      setData([])
      axios.get(api + "recipes").then(response => {
        setData(response.data)
        setLoaded(true)

      })
      return () => {
        isMounted = false
        setLoaded(false)
      };
    }, [])
  );
  if (loaded) {
    return (
      <View style = {ustyles.container}>
      <ScrollView contentContainerStyle={ustyles.scrollcontainer} style={ustyles.container}>
        {data.map(data =>
          <View key={data._id}>
            <TouchableOpacity onPress={() => { changepage(navigate, data) }}>
              <View style={FLStyles.itemcontainer}>
                <View style={FLStyles.name}>
                  <Text style={FLStyles.item}>{data.name}</Text>
                  <Text style={FLStyles.description}>{data.description}</Text>
                </View>
                <View style={FLStyles.photo}>
                  <FoodImage
                    source={{ url: utils.getUrl(data._id)}}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>)}
      </ScrollView>
        <View style = {FLStyles.buttonView}>
          <GeneralButton text="Add"
            onPress={() => {
              console.log('adding,', setData)
              navigate('Add', { update: setData })
            }}
            height={35}
            width={150}
            paddingTop={5}>
          </GeneralButton>
        </View>
      </View>
      )
  } else {
    return (
      <LoadingWheel/>
    )
  }
}


const FLStyles = StyleSheet.create({
  item: {
    marginLeft: 20,
    marginTop: 20,
    fontSize: 30,
  },
  description: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: 10
  },
  itemcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 10,
    height: 100,
    alignItems: 'stretch',
    backgroundColor: 'white',
    borderColor: 'grey',
    borderRadius: 10,
    borderWidth: 1
  },
  name: {
    // paddingRight:5,
    flex: 1
  },
  photo: {
    // flex:1
  },
  spinnercontainer: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
    padding: 8,
    backgroundColor: 'white'
  }, 
  buttonView:{
    marginTop:10,
    marginBottom:10
  }
})






