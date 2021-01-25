import { StyleSheet, Text, View, ScrollView, Image  } from 'react-native';
import React, { useState } from 'react';
import ustyles from '../std-styles.js';
import DateNavigator from './DateNavigator'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import utils from '../utils.js'

const api = "http://connor.local:3000/"
const axios = require('axios');
var fileUrl = require('file-url');  

function getUrl(url){
  return fileUrl('/Users/con/Desktop/React/FoodBus/Images/' + url.toString() + '.png')
}

function changePage(navigate, selectedDate){
  navigate('Add Entry', {date:selectedDate, navigate:navigate})
}

export default function Home({ navigation: { navigate } }) {
  var today = new Date()
  const [selectedDate, setDate] = useState(utils.formatDate(today));
  const [foodlog, setLog] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true; 
      console.log('asd')
      axios.get(api + "foodlog", {
        params:{
          date:selectedDate
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
    <ScrollView contentContainerStyle={ustyles.scrollcontainer} style = {ustyles.container}>
        <View style = {styles.datewrap}>
          <View>
          <DateNavigator 
              direction = 'left'
              onPress = { () => { 
              setDate(utils.previousDate(selectedDate))
            }
            }> 
          </DateNavigator>
          </View>
          <View>
            <Text style = {styles.date}>{selectedDate}</Text></View>
          <View>
            <DateNavigator 
              direction = 'right'
              onPress = { () => {
              setDate(utils.nextDate(selectedDate))
              }}>
            </DateNavigator>
          </View>
       </View>
       <View style = {styles.contentwrap}>
         {Object.entries(foodlog).map(([key, values]) => 
            <View key = {key} style = {styles.fooditem}>
              <View style = {styles.typewrap}>
                <Text style = {styles.type}>{key}</Text>
              </View>

              {values.map((value, i) => 
                  <View key = {i}  style = {[styles.foodwrap, (i == values.length - 1) ? styles.curved : styles.foodwrap]}>
                    <Text style = {styles.foodname}>{value.name}</Text>
              {/* <Text>{values}</Text> */}

                    <Image
                      source={{url: getUrl(value.recipe_id)}}
                      style={[styles.imageStyle, (i == values.length -1) ? styles.imageCurved : styles.imageStyle]}
                    />
                    </View>
                )}
              {/* <View style = {styles.typewrap}>
                <Text style = {styles.type}>{foodlog.type}</Text>
              </View>
              <View style = {styles.foodwrap}>
                <Text style = {styles.foodname}>{foodlog.name}</Text>
                <Image
                  source={{url: getUrl(foodlog.recipe_id)}}
                  style={styles.imageStyle}
                />
                </View> */}
            </View>)}
       </View>
       {/* <View style = {styles.contentwrap}>
         {foodlog.map(foodlog => 
            <View key = {foodlog._id} style = {styles.fooditem}>
              <View style = {styles.typewrap}>
                <Text style = {styles.type}>{foodlog.type}</Text>
              </View>
              <View style = {styles.foodwrap}>
                <Text style = {styles.foodname}>{foodlog.name}</Text>
                <Image
                  source={{url: getUrl(foodlog.recipe_id)}}
                  style={styles.imageStyle}
                />
                </View>
            </View>)}
       </View> */}
       <TouchableOpacity
        style={styles.button}
        onPress={ () => {changePage(navigate, selectedDate)}}
      >
      <Text style = {styles.buttontext}>Add Entry</Text>
      </TouchableOpacity>
   </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 100,
  },
  date:{
    alignSelf:'center',
    marginTop:10,
    fontSize:27
  },
  datewrap:{
    marginTop:20,
    flex:1,
    alignItems:'flex-start',
    justifyContent:'space-between',
    flexDirection:'row'
  },
  contentwrap:{
    flex:1,
    marginTop:20,
  }, 
  typewrap:{
    flex:1,
    height:50,
    alignSelf:'stretch',
    justifyContent:'space-between',
    backgroundColor:'#293236',
    marginTop:20,
    marginHorizontal:20, 
    borderTopLeftRadius:10,
    borderTopRightRadius:10
  },
  type:{
    color:'#1e90ff',
    marginLeft:10,
    fontWeight:'bold',
    marginTop:10,
    fontSize:25
  },
  fooditem:{
    flex:1,
    alignItems:'stretch'
  },
  foodwrap:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'white',
    marginLeft:20,
    borderWidth:1,
    marginHorizontal:20, 
    // borderBottomLeftRadius:10,
    // borderBottomRightRadius:10,
    height:100
  },
  curved:{
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
  },
  foodname:{
    fontSize:20,
    marginTop:5,
    marginLeft:10
  }, 
  button: {
    alignItems:'center',
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    width:150,
    borderRadius:5,
    backgroundColor:'#293236',  
    paddingVertical: 10
  },
  buttontext:{
    fontSize:20,
    color:'#1e90ff',
  }, 
  imageCurved:{
    borderBottomRightRadius:10,
  },
  imageStyle: {
    // borderRadius:10,
    paddingRight:2,
    width: 99,
    height: 99,
  },
});