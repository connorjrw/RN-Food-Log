import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Home() {
  return (
      <View style = {styles.container}>
          <Text style = {styles.header}>My Recipes</Text>
      </View>
    
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#add8e6',
      alignItems: 'center',
    },
    header:{
          marginTop:100,
          fontSize:50
    }
  });

