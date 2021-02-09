import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import utils from '../utils.js'
import config from '../config.js'

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
    console.log(props)

    return (
        <View style={styles.container}>
            <View style={styles.foodwrap}>
                <Text style={styles.foodname}>{item.name}</Text>
                <Image
                    source={{ url: utils.getUrl(item.recipe_id) }}
                    style={styles.imageStyle}
                />
            </View>
            <View style={styles.buttonwrap}>

                <TouchableOpacity onPress={() => { deleteEntryItem(item._id, props.navigation) }} style={styles.buttondelete}>
                    <Text style={styles.buttontextdelete}>Delete</Text>

                </TouchableOpacity>
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
        borderWidth: 1,
        // marginBottom:548, //Needs to be fixed, but wanted to see what it looked like!!!
        // marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 5,
        height: 100
    },
    foodname: {
        fontSize: 20,
        marginTop: 5,
        marginLeft: 10
    },
    imageStyle: {
        // borderRadius:10,
        paddingRight: 2,
        width: 99,
        height: 99,
    },
    buttondelete: {
        width: 170,
        alignSelf: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        marginTop: 20,
        marginLeft: 8,
        borderRadius: 5,
        paddingVertical: 10,
        backgroundColor: '#ff1e20'
    },
    buttonwrap: {
        marginBottom: 540,
        alignSelf: 'center'
    },
    buttontextdelete: {
        // paddingVertical: 10,
        alignItems: 'center',
        // width:150,
        color: 'black',
        fontSize: 20,
    },
});