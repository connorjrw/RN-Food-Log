//displays a menu item with name description photo, to select when adding an entry

import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import utils from '../utils.js'
import FoodImage from './FoodImage.js';
var fileUrl = require('file-url');


export default function MenuItemButton(props) {
  const [refresh, setRefresh] = useState('')
  return (
    <TouchableOpacity
      style={[styles.itemcontainer, props.fooddata.selected == 'True' ? styles.itemselected : styles.itemcontainer]}
      onPress={() => {
        props.onPress()
        setRefresh(refresh)
      }}
    >
      <View>
        <Text style={[styles.item, props.fooddata.selected == 'True' ? styles.textitemselected : styles.name]}>
          {props.fooddata.name}
        </Text>
        <Text style={[styles.description, props.fooddata.selected == 'True' ? styles.textitemselected : styles.name]}>

          {props.fooddata.description}
        </Text>
      </View>
      <View style={styles.photo}>
        <FoodImage
          source={{ url: utils.getUrl(props.fooddata._id) }}
        />
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 10,
    height: 100,
    alignItems: 'stretch',
    backgroundColor: 'white',
    borderColor: 'grey',
    borderRadius: 10,
    borderWidth: 0.5
  },
  itemselected: {
    backgroundColor: '#293236'
  },
  textitemselected: {
    color: '#1e90ff',
  }
})