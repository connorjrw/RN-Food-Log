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
        alignSelf: 'flex-start',
        borderRadius: 10,
        paddingRight: 2,
        width: 99,
        height: 99,
    }
})