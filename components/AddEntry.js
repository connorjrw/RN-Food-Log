import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MenuItemButton from './MenuItemButton.js'
import GeneralButton from './GeneralButton.js'
import { useNavigation } from '@react-navigation/native';
import config from '../config.js'

const axios = require('axios');
const api = config.api

export default function AddEntry(props) {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedType, setSelectedType] = useState('Breakfast')
  const navigation = useNavigation();

  const selectedDate = props.route.params.date
  const navigate = navigation.navigate // Previously passed this in props, no need

  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true;
      axios.get(api + "recipes").then(response => {
        for (var item in response.data) {
          if (selectedItem['_id'] == response.data[item]['_id']) {
            response.data[item]['selected'] = 'True'
          } else {
            response.data[item]['selected'] = 'False'
          }
        }
        setData(response.data)
      }).catch(err => {
        console.log(err)
      })
      return () => {
        isMounted = false
      };
    }, [selectedItem])
  );
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.dateText}>{selectedDate}</Text>
        <View style={styles.selectedTypeView}>
          <GeneralButton text='Breakfast'
            onPress={() => { setSelectedType('Breakfast') }}
            buttonstyle={[styles.entryTypeButton, selectedType == 'Breakfast' ? styles.entryTypeButtonSelected : styles.entryTypeButton]}
            textstyle={styles.entryTypeText}>
          </GeneralButton>
          <GeneralButton text='Lunch'
            onPress={() => { setSelectedType('Lunch') }}
            buttonstyle={[styles.entryTypeButton, selectedType == 'Lunch' ? styles.entryTypeButtonSelected : styles.entryTypeButton]}
            textstyle={styles.entryTypeText}>
          </GeneralButton>
          <GeneralButton text='Dinner'
            onPress={() => { setSelectedType('Dinner') }}
            buttonstyle={[styles.entryTypeButton, selectedType == 'Dinner' ? styles.entryTypeButtonSelected : styles.entryTypeButton]}
            textstyle={styles.entryTypeText}>
          </GeneralButton>
        </View>
      </View>
      <View style={styles.menuItemOption}>
        <ScrollView>
          {data.map(dataitem =>
            <View key={dataitem._id}>
              <MenuItemButton fooddata={dataitem} onPress={() => {
                const updatedData = JSON.parse(JSON.stringify(select(dataitem, data)));
                setData(updatedData)
                setSelectedItem(dataitem)
              }}>
              </MenuItemButton>
            </View>)}
        </ScrollView>
      </View>
      <View style={styles.optionView}>
        <View style={styles.optionButtonView}>
          <GeneralButton text='Add'
            onPress={() => { addEntry(selectedItem, selectedType, selectedDate, navigate) }}
            buttonstyle={styles.optionButton}></GeneralButton>
        </View>
        <View style={styles.optionButtonView}>
          <GeneralButton text='New'
            onPress={() => {
              addNew(
                navigate,
                selectedItemSet => setSelectedItem(selectedItemSet),
                dataSet => setData(dataSet),
                data)
            }
            }
            buttonstyle={styles.optionButton}></GeneralButton>
        </View>
      </View>
    </View>
  );
}

function select(dataitem, data) {
  for (var item in data) {
    if (data[item]._id == dataitem._id) {
      console.log('setting to true')
      data[item]['selected'] = 'True'
    } else {
      console.log('setting to false..')
      data[item]['selected'] = 'False'
    }
  }
  return data
}

function addEntry(selectedItem, selectedType, selectedDate, navigate) {
  axios.post(api + 'addfood', {
    food_name:selectedItem.name,
    food_description:selectedItem.description,
    date: selectedDate,
    food_id: selectedItem._id,
    type: selectedType
  }).then(resp => {
    navigate('Home')
  })
}
function addNew(navigate, selectedItemSet, dataSet, data) {
  navigate('Add New', {
    selectedItemSet: selectedItemSet,
    dataSet: dataSet,
    data: data
  })
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  headerView: {
    height: 80,
  },
  selectedTypeView: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  dateText: {
    alignSelf: 'center',
    marginTop: 15,
    fontSize: 27
  },
  entryTypeButton: {
    alignItems: 'center',
    marginTop: 50,
    height: 40,
    width: 105,
    backgroundColor: 'white',
    borderWidth: 0.5
  },
  entryTypeButtonSelected: {
    backgroundColor: '#293236'
  },
  menuItemOption: {
    height: 500,
    marginTop: 40,
    marginHorizontal: 5,
    borderRadius: 10
  },
  entryTypeText: {
    marginTop: 10,
    fontSize: 15,
  },
  optionView: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  
  optionButtonView: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  optionButton: {
    width:150,
    alignSelf: 'auto',
    paddingTop: 8,
    height: 40
  }
})

