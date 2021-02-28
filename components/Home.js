import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import ustyles from '../std-styles.js';
import DateNavigator from './DateNavigator'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import utils from '../utils.js'
import config from '../config.js'
import GeneralButton from './GeneralButton'

const api = config.api
const axios = require('axios');

export default function Home({ navigation: { navigate, goBack } }, props) {
  var today = new Date()
  const [selectedDate, setDate] = useState(utils.formatDate(today));
  const [foodlog, setLog] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true;
      axios.get(api + "foodlog", {
        params: {
          date: selectedDate
        }
      }).then(response => {
        setLog(response.data)
      }).catch(err => {
        console.log(err)
      })
      return () => {
        isMounted = false
      };
    }, [selectedDate])
  );
  return (
    <ScrollView contentContainerStyle={ustyles.scrollcontainer} style={ustyles.container}>
      <View style={styles.dateView}>
        <View>
          <DateNavigator
            direction='left'
            onPress={() => {
              setDate(utils.previousDate(selectedDate))
            }
            }>
          </DateNavigator>
        </View>
        <View>
          <Text style={styles.dateText}>{selectedDate}</Text></View>
        <View>
          <DateNavigator
            direction='right'
            onPress={() => {
              setDate(utils.nextDate(selectedDate))
            }}>
          </DateNavigator>
        </View>
      </View>
      <View style={styles.logListView}>
        {Object.entries(foodlog).map(([key, values]) =>
          <View key={key} style={styles.foodLogItemView}>
            <View style={styles.typeView}>
              <Text style={styles.typeText}>{key}</Text>
            </View>

            {values.map((value, i) =>
              <TouchableOpacity onPress = { () => {viewEntryItem(navigate, value)}} key={i} style={[styles.foodView, (i == values.length - 1) ? styles.curved : styles.foodView]}>
                <Text style={styles.foodNameText}>{value.name}</Text>

                <Image
                  source={{ url: utils.getUrl(value.recipe_id) }}
                  style={[styles.imageStyle, (i == values.length - 1) ? styles.imageCurved : styles.imageStyle]}
                />
              </TouchableOpacity>
            )}

          </View>)}
      </View>
      <TouchableOpacity
        style={styles.addFoodButton}
        onPress={() => { changePage(navigate, selectedDate) }}
      >
        <Text style={styles.foodButtonText}>Add Food</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function changePage(navigate, selectedDate) {
  navigate('Add Entry', { date: selectedDate, navigate: navigate })
}
function viewEntryItem(navigate, item){
  navigate('View Entry', {item:item})
}

const styles = StyleSheet.create({
  header: {
    marginTop: 100,
  },
  dateText: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 27
  },
  dateView: {
    marginTop: 20,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  logListView: {
    flex: 1,
    marginTop: 20,
  },
  typeView: {
    flex: 1,
    height: 50,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    backgroundColor: '#293236',
    marginTop: 20,
    marginHorizontal: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  typeText: {
    color: '#1e90ff',
    marginLeft: 10,
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 25
  },
  foodLogItemView: {
    flex: 1,
    alignItems: 'stretch'
  },
  foodView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginLeft: 20,
    borderWidth: 1,
    marginHorizontal: 20,
    height: 100
  },
  curved: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  foodNameText: {
    fontSize: 20,
    marginTop: 5,
    marginLeft: 10
  },
  addFoodButton: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    width: 150,
    borderRadius: 5,
    backgroundColor: '#293236',
    paddingVertical: 10
  },
  foodButtonText: {
    fontSize: 20,
    color: '#1e90ff',
  },
  imageCurved: {
    borderBottomRightRadius: 10,
  },
  imageStyle: {
    paddingRight: 2,
    width: 99,
    height: 99,
  },
});