import { StyleSheet, View, ScrollView, Image, Alert, Modal, Text, Pressable, StatusBar} from 'react-native';
import React, { useState } from 'react';
import ustyles from '../std-styles.js';
import DateNavigator from './DateNavigator'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import utils from '../utils.js'
import config from '../config.js'
import GeneralButton from './GeneralButton'
import DatePicker from 'react-native-date-picker'
import LoadingIndicator from './LoadingWheel.js'
import LoadingWheel from './LoadingWheel.js';
import { useNavigation } from '@react-navigation/native';


const api = config.api
const axios = require('axios');

export default function Home() {
  var today = new Date()
  const [selectedDate, setDate] = useState(utils.formatDate(today));
  const [modalVisible, setModalVisible] = useState(false);
  const [newDate, setNewDate] = useState(new Date())
  const [foodlog, setLog] = useState([]);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigation().navigate;


  useFocusEffect(
    React.useCallback(() => {
      let loading = true;
      axios.get(api + "foodlog", {
        params: {
          date: selectedDate
        }
      }).then(response => {
        setLog(response.data)
        setLoading(false)
      }).catch(err => {
        console.log(err)
      })
      return () => {
        loading = true
      };
    }, [selectedDate])
  );
  if(!loading){
  return (
    <ScrollView contentContainerStyle={ustyles.scrollcontainer} style={ustyles.container}>
      <View style = {styles.MainView}>

      <View style={styles.dateView}>
        <View>
          <DateNavigator
            direction='left'
            onPress={() => {
              setNewDate(new Date(utils.previousDate(selectedDate)))
              setDate(utils.previousDate(selectedDate))
            }
            }>
          </DateNavigator>
        </View>
        <View > 
          <Text onPress={() => setModalVisible(true)} style={styles.dateText}>{viewSelectedDate(selectedDate)}</Text></View>
        <View>
          <DateNavigator
            direction='right'
            onPress={() => {
              setNewDate(new Date(utils.nextDate(selectedDate)))
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
                <Text style={styles.foodNameText}>{value.food_name}</Text>

                <Image
                  source={{ url: utils.getUrl(value._id) }}
                  style={[styles.imageStyle, (i == values.length - 1) ? styles.imageCurved : styles.imageStyle]}
                />
              </TouchableOpacity>
            )}

          </View>)}
      </View>
      </View>
      <Modal
        presentationStyle = "overFullScreen"
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <DatePicker
              mode = "date"
              date={newDate}
              onDateChange = {setNewDate}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <View style = {styles.buttonview}>
                  <GeneralButton onPress = {() => setModalVisible(!modalVisible)} buttonstyle = {styles.datebuttons} text = "Cancel" height = {30}></GeneralButton>
                  <GeneralButton onPress = {() => {
                    setDate(utils.formatDate(newDate)) 
                    setModalVisible(!modalVisible)}} buttonstyle = {styles.datebuttons} text = "Okay" height = {30}></GeneralButton>
              </View>

              {/* <DeleteButton text = 'cancel'></DeleteButton> */}
            </Pressable>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.addFoodButton}
        onPress={() => { changePage(navigate, selectedDate) }}
      >
        <Text style={styles.foodButtonText}>Add Food</Text>
      </TouchableOpacity>
      
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        
      >
      </Pressable>
    </ScrollView>
  )} else{
    return (<LoadingWheel/>)
  }
}

function changePage(navigate, selectedDate) {
  navigate('Add Entry', { date: selectedDate})
}
function viewEntryItem(navigate, item){
  navigate('View Entry', {item:item})
}
function viewSelectedDate(date){
  var today = utils.formatDate(new Date())
  if(today == date){
    return 'Today'
  } 
  else if (utils.nextDate(today) == date){
    return 'Tomorrow'
  }
  else if (utils.previousDate(today) == date){
    return 'Yesterday'
  }
  else{
    return date
  }
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
    marginTop: 20
  },
  typeView: {
    flex: 1,
    height: 50,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(41, 50, 54)',
    // backgroundColor: 'rgba(0,0,0,0.5)',
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
    borderBottomWidth: 1,
    borderRightWidth:1,
    borderLeftWidth:1,
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
    borderBottomRightRadius: 9,
  },
  imageStyle: {
    paddingRight: 2,
    marginBottom:1,
    width: 99,
    height: '100%',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22
  },
  datebuttons:{
    paddingTop:2,
    marginHorizontal:20,
    width:100
  },
  buttonview:{
    justifyContent:'space-between',
    flexDirection:'row'
  }, 
  overlay:{
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
})