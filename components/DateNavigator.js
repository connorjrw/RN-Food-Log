import { StyleSheet, Text, View, ScrollView, Image  } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Triangle = (props) => {
    return <TouchableOpacity style={[styles.triangle, props.style]} onPress = {props.onPress}/>;
  };


export default function DateNavigator (props) {
    
    if(props.direction == 'left'){
        return <Triangle style = {styles.triangleLeft} onPress = {props.onPress}></Triangle>
    }
    else {
        return <Triangle style = {styles.triangleRight} onPress = {props.onPress}></Triangle>
    }
};


const styles = StyleSheet.create({

triangle: {
    marginHorizontal:20,
    marginTop:15,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 24,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#293236",
  },
  triangleRight:{
    transform: [{ rotate: "90deg" }],
  },
  triangleLeft:{
    transform: [{ rotate: "-90deg" }],
  },
})
