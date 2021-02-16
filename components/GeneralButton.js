import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react'

export default function GeneralButton(props) {
    return (
        <TouchableOpacity style={[{ height: props.height, width: props.width, paddingTop: props.paddingTop}, styles.GeneralButton, props.buttonstyle]} onPress={props.onPress}>
            <Text style={
                [styles.GeneralButtonText, props.textstyle]
            }>{props.text}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    GeneralButton: {
        alignSelf: 'center',
        alignItems: 'center',
        width: 150,
        borderRadius: 5,
        backgroundColor: '#293236',
    },
    GeneralButtonText: {
        fontSize: 20,
        color: '#1e90ff',
    },
})