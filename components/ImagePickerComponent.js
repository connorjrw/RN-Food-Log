// Example of Image Picker in React Native
// https://aboutreact.com/example-of-image-picker-in-react-native/

// Import React
import React, {useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { set } from 'react-native-reanimated';

// Import Image Picker
var ImagePicker = require('react-native-image-picker');


const ImagePickerComponent = (props) => {
  const [filePath, setFilePath] = useState({});
  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true; 
    
      return () => {
        // Remove photo once we change screens
        setFilePath('')
        isMounted = false
      };
    }, []) 
  )

  const chooseFile = () => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log(
          'User tapped custom button: ',
          response.customButton
        );
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = {
        //   uri: 'data:image/jpeg;base64,' + response.data
        // };
        console.log(source)
        props.photo(source)

        setFilePath(source);
      }
    });
  };

  return (
      <View style={styles.container}>
        <View style = {styles.wrapper}>

        <TouchableOpacity
          // activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={chooseFile}>
            <View style = {styles.textwrap}>
          <Text style={styles.textStyle}>
            Photo
          </Text>
          </View>
        </TouchableOpacity>
        
        </View>
        <Image
          source={{
            uri: 'data:image/jpeg;base64,' + filePath.data,
          }}
          style={styles.imageStyle}
        />
        </View>
    // </SafeAreaView>
  );
};

export default ImagePickerComponent;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height:60,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    // backgroundColor:'black',
    // padding: 10,
    paddingTop:20,
    fontSize:20,
    fontWeight:'bold',
    paddingLeft:10,
    color: '#1e90ff',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth:0.5,
    height:60,
    marginTop:20,
    borderRadius:5,
    marginHorizontal:5
  },
  imageStyle: {
    alignSelf:'flex-end',
    // borderWidth:0.5,
    marginTop:25,
    marginRight:15,
    width: 40,
    height: 40,
    // padding:5
    // margin: 5,
  },
  textwrap:{
    backgroundColor:'#293236',
    borderRadius:5,
    // paddingTop:20
    height:60,
    width:130
  },
  wrapper:{
    flex: 1,
    flexDirection: 'column',
  }
});