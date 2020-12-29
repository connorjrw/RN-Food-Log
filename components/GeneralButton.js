import { StyleSheet, Text, TouchableOpacity  } from 'react-native';
import React from 'react'

export default function GeneralButton(props){
    return(
    <TouchableOpacity style = {[styles.GeneralButton, props.buttonstyle]} onPress = {props.onPress}>
        <Text style = {
            [styles.GeneralButtonText, props.textstyle, {height:props.height}]
            }>{props.text}</Text>
    </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    GeneralButton:{
        alignItems:'center',
        marginTop: 40,
        width:150,
        // height:30,
        borderRadius:5,
        backgroundColor:'#293236',
    }, 
    GeneralButtonText:{
        fontSize:20,
        color:'#1e90ff',
    },
})