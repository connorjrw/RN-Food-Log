import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const formatDate = (date) => {
    console.log(date)
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    var ddate = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear()
    return ddate + ' ' + months[month - 1] + ' ' + year ;
}

const nextDate = (selectedDate) => {
    var datevar = new Date(selectedDate)
    datevar.setDate(datevar.getDate() + 1)
    return formatDate(datevar)
}
const previousDate = (selectedDate) => {
    var datevar = new Date(selectedDate)
    datevar.setDate(datevar.getDate() -1)
    return formatDate(datevar)
}


function Home() {
  var today = new Date()
  const [selectedDate, setDate] = useState(formatDate(today));
  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true; 
      return () => {
        isMounted = false
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
  return (
   <View style = {styles.container}>
        <View style = {styles.datewrap}>
          <View>
            <TriangleLeft onPress = { () => { setDate(previousDate(selectedDate)) }}> </TriangleLeft>
          </View>
          <View>
            <Text style = {styles.date}>{selectedDate}</Text></View>
          <View>
            <TriangleRight onPress = { () => { setDate(nextDate(selectedDate)) }}></TriangleRight>
          </View>
       </View>
   </View>
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
  container: {
    flex: 1,
    backgroundColor:'white'
  },
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
    height:10,
    alignItems:'flex-start',
    justifyContent:'space-between',
    flexDirection:'row'
  }
});