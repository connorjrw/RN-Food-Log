import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import utils from '../utils.js'
import config from '../config.js'
import FoodImage from './FoodImage.js'
import DeleteButton from './DeleteButton.js'

const axios = require('axios');
const api = config.api

function deleteEntryItem(id, navigation) {
    axios.post(api + 'removeentryitem', {
        id: id,
    }).then(res => {
        navigation.navigate('Home')
    }).catch(err => {
        console.log(err)
    })
}

export default function EntryItem(props) {
    const item = props.route.params.item
    return (
        <View style={styles.container}>
            <View style={styles.foodwrap}>
                <Text style={styles.foodname}>{item.name}</Text>
                <FoodImage
                    source={{ url: utils.getUrl(item.recipe_id) }}
                />
            </View>
            <View style={styles.buttonwrap}>
                <DeleteButton onPress = { () => {deleteEntryItem(item._id, props.navigation)}}></DeleteButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    foodwrap: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        marginHorizontal: 20,
        borderWidth: 0.5,
        marginTop: 20,
        borderRadius: 10,
        // height: 90
    },
    foodname: {
        fontSize: 20,
        marginTop: 5,
        marginLeft: 10
    },
    buttonwrap: {
        marginBottom: 540,
        alignSelf: 'center'
    },
});