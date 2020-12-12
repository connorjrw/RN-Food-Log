import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const getCurrentDate=()=>{
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  var day = new Date().getDay()
  return date + ' ' + months[month - 1] + ' ' + year ;//format: dd-mm-yyyy;
}

function Home() {
  return (
   <View style = {styles.container}>
       <Text style = {styles.date}>{getCurrentDate()}</Text>
   </View>
  );
}

export default function HomeStack({ navigation: { navigate } }){
  console.log('nav',navigate)
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
    fontSize:30
  }
});