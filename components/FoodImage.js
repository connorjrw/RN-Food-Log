import { StyleSheet, Image } from 'react-native';
import React from 'react'

export default function FoodImage(props) {
    return (
        <Image
        source={props.source}
        style={styles.imageStyle}
    />
    )
}
const styles = StyleSheet.create({
    imageStyle: {
        alignSelf: 'stretch',
        borderRadius: 10,
        paddingRight: 2,
        flex:1,
        width:undefined,
        height:undefined,
        width: 99,
        // height: 99,
    }
})