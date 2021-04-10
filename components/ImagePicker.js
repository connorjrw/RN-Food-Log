import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

var ImagePickerPackage = require('react-native-image-picker');

const ImagePicker = (props) => {
  const [filePath, setFilePath] = useState({ uri: props.currentPhoto });
  console.log('file', props.currentPhoto)
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
      title: 'Select Food',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePickerPackage.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let source = response;
        props.photo(source)
        setFilePath(source);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={chooseFile}>
          <View style={styles.textwrap}>
            <Text style={styles.textStyle}>
              Photo
          </Text>
          </View>
        </TouchableOpacity>

      </View>
      <Image
        source={{
          url: filePath.uri,
        }}
        style={styles.imageStyle}
      />
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    height: 60,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    paddingTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 10,
    color: '#1e90ff',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 0.5,
    height: 60,
    marginTop: 20,
    borderRadius: 5,
    marginHorizontal: 5
  },
  imageStyle: {
    alignSelf: 'flex-end',
    marginTop: 25,
    marginRight: 15,
    width: 50,
    height: 50,
  },
  textwrap: {
    backgroundColor: '#293236',
    borderRadius: 5,
    height: 60,
    width: 130
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
  }
});