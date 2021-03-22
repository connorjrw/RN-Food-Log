import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import utils from '../utils.js'
import config from '../config.js'
import FoodImage from './FoodImage.js'
import DeleteButton from './DeleteButton.js'

const axios = require('axios');
const api = config.api

export default function EntryItem(props) {
    const item = props.route.params.item
    const navigate = useNavigation().navigate;
    return (
        <View style={styles.container}>
            <View style={styles.foodView}>
                <Text style={styles.foodNameText}>{item.food_name}</Text>
                <FoodImage
                    source={{ url: utils.getUrl(item._id) }}
                />
            </View>
            <View style={styles.buttonView}>
                <DeleteButton onPress = { () => {deleteEntryItem(item._id, navigation)}}></DeleteButton>
            </View>
        </View>
    );
}

function deleteEntryItem(id, navigation) {
    axios.post(api + 'removeentryitem', {
        id: id,
    }).then(res => {
        navigate('Home')
    }).catch(err => {
        console.log(err)
    })
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        // justifyContent: 'space-between'
    },
    foodView: {
        flex: 1,
        // height:20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        marginHorizontal: 20,
        borderWidth: 0.5,
        marginTop: 20,
        borderRadius: 10,
    },
    foodNameText: {
        flex:2,
        paddingRight:10,
        fontSize: 30,
        marginTop: 5,
        marginLeft: 10
    },
    buttonView: {
        flex:5,
        alignSelf: 'center'
    },
});