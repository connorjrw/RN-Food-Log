//displays a menu item with name description photo, to select when adding an entry

import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
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
        <Image
          source={{ url: getUrl(props.fooddata._id) }}
          style={styles.imageStyle}
        />
      </View>
    </TouchableOpacity>
  )
}
function getUrl(url) {
  if (url) {
    return fileUrl('/Users/con/Desktop/React/FoodBus/Images/' + url.toString() + '.png')
  } else {
    return ''
  }
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
  imageStyle: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingRight: 2,
    width: 99,
    height: 99,
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