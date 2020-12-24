import { StyleSheet, Text, View, ScrollView, Image  } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import ustyles from '../std-styles.js'

const api = "http://connor.local:3000/"
const axios = require('axios');
var fileUrl = require('file-url');  



import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function getUrl(url){
  return fileUrl('/Users/con/Desktop/React/FoodBus/Images/' + url.toString() + '.png')
}

const formatDate = (date) => {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    var ddate = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear()
    return ddate + ' ' + months[month - 1] + ' ' + year ;
}

const nextDate = (selectedDate) => {
    var datevar = new Date(selectedDate)
    datevar.setDate(datevar.getDate() + 1)
    console.log('date is ', formatDate(datevar))
    return formatDate(datevar)
}
const previousDate = (selectedDate) => {
    var datevar = new Date(selectedDate)
    datevar.setDate(datevar.getDate() -1)
    console.log('date is ', formatDate(datevar))
    return formatDate(datevar)
}






function Home() {
  var today = new Date()
  const [selectedDate, setDate] = useState(formatDate(today));
  const [foodlog, setLog] = useState([]);
  const [foodname, setfoodname] = useState("")
  const [fooddesc, setfooddesc] = useState("")

  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true; 
      axios.get(api + "foodlog", {
        params:{
          date:selectedDate
        }
      }).then(response => {
        setLog(response.data)
      }).catch(err => {
        console.log('error?')
        console.log(err)
      })
      return () => {
        isMounted = false
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [selectedDate])
  );
  return (
    <ScrollView contentContainerStyle={ustyles.scrollcontainer} style = {ustyles.container}>
        <View style = {styles.datewrap}>
          <View>
            <TriangleLeft onPress = { () => { 
              setDate(previousDate(selectedDate))
              // getData()
            }}> </TriangleLeft>
          </View>
          <View>
            <Text style = {styles.date}>{selectedDate}</Text></View>
          <View>
            <TriangleRight onPress = { () => {
              setDate(nextDate(selectedDate))
              // getData()
              }}></TriangleRight>
          </View>
       </View>
       <View style = {styles.contentwrap}>
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
       </View>
       <TouchableOpacity
        style={styles.button}
        // onPress={AddPress}
      >
      <Text style = {styles.buttontext}>Add Entry</Text>
      </TouchableOpacity>
   </ScrollView>
  );
}

export default function HomeStack({ navigation: { navigate } }){
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={ 
          {
            title: 'Home',
            headerStyle: {
              backgroundColor: 'white',
              height:100
            },
            headerTitleStyle: {
              alignSelf:'flex-start',
              fontSize: 23,
              textAlign: 'left'
            }
          }
        }

      />
      
    </Stack.Navigator>
  );
}

const Triangle = (props) => {
  return <TouchableOpacity style={[styles.triangle, props.style]} onPress = {props.onPress}/>;
};
const TriangleRight = (props) => {
  return <Triangle style =  {styles.triangleRight} onPress = {props.onPress}></Triangle>
}
const TriangleLeft = (props) => {
  return <Triangle style = {styles.triangleLeft} onPress = {props.onPress}></Triangle>
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
  triangle: {
    marginHorizontal:20,
    marginTop:15,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 24,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#293236",
  },
  triangleRight:{
    transform: [{ rotate: "90deg" }],
  },
  triangleLeft:{
    transform: [{ rotate: "-90deg" }],
  },
  datewrap:{
    marginTop:20,
    flex:1,
    // height:10,
    // width:10,
    alignItems:'flex-start',
    justifyContent:'space-between',
    flexDirection:'row'
  },
  contentwrap:{
    flex:1,
    marginTop:20,
    // alignSelf:'flex-start'
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

    // borderWidth:20
  },
  type:{
    color:'#1e90ff',
    marginLeft:10,
    fontWeight:'bold',
    // backgroundColor:'#293236',
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
    // alignItems:'center',
    backgroundColor:'white',
    marginLeft:20,
    borderWidth:1,
    marginHorizontal:20, 
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    height:100
  },
  foodname:{
    fontSize:20,
    marginTop:5,
    marginLeft:10
  }, 
  button: {
    // alignSelf: "center",
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
  imageStyle: {
    borderRadius:10,
    paddingRight:2,
    width: 99,
    height: 99,
  },
});