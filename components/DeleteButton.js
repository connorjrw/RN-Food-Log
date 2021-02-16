import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react'
import GeneralButton from './GeneralButton'

export default function DeleteButton(props) {
    return (
        <GeneralButton 
            buttonstyle = {styles.ButtonStyle} 
            text = 'Delete'
            textstyle = {styles.TextStyle}
            onPress = {props.onPress}>
        </GeneralButton>
    )
}
const styles = StyleSheet.create({
    ButtonStyle: {
        width:170,
        alignSelf: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        marginTop: 20,
        marginLeft:8,
        borderRadius: 5,
        paddingVertical: 10,
        backgroundColor: '#ff1e20'
    },
    TextStyle:{
        alignItems: 'center',
        color: 'black',
        fontSize: 20,
    }
})