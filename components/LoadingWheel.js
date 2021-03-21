import { StyleSheet, View, ActivityIndicator } from 'react-native';
import React from 'react'

export default function LoadingWheel() {
    return (
        <View style = {styles.spinnercontainer}>
            <ActivityIndicator size="large" color='#1e90ff' style = {styles.spinnerStyle}/>
        </View>
    )
}
const styles = StyleSheet.create({
    spinnercontainer: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: 30,
        backgroundColor: '#ecf0f1',
        padding: 8,
        backgroundColor: 'white'
      }
})