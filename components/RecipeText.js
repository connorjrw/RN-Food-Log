import { Text, View, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import GeneralButton from '../components/GeneralButton.js'
import { useNavigation } from '@react-navigation/native';


export default function RecipeText(props) {
    const params = props.route.params.params
    const [RecipeText, setRecipeText] = React.useState(params.recipe)
    const navigate = useNavigation().navigate;
    return (
        <View style={styles.container}>
            <View style={styles.recipeView}>
                <View style={styles.recipeTextView}>
                    <Text style={styles.inputTitleText}>Recipe</Text>
                </View>
                <View style={styles.recipeInputView}></View>
                    <TextInput
                        multiline={true}
                        numberOfLines={10}
                        onChangeText={RecipeText => setRecipeText(RecipeText)}
                        style = {styles.recipeInputText}
                        returnKeyType="default"
                        value={RecipeText}>
                    </TextInput>
            </View>
            <GeneralButton 
          text = 'Done' 
          onPress={() => donePress(navigate, RecipeText, params)} 
          width = {200} 
          height = {40} 
          paddingTop = {10}
          buttonstyle = {styles.donebutton}
        >
      </GeneralButton>
        </View>
    )
}
function donePress(navigate, RecipeText, params){
    params.recipe = String(RecipeText)
    navigate('Add', params)
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    recipeTextView: {
        backgroundColor: '#293236',
        borderRadius: 5,
        height: 60
      },
    recipeView: {
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 0.5,
        fontSize: 20,
        borderRadius: 5,

      },
    recipeInputView: {
        alignItems: 'stretch',
        flexDirection: 'column',
        flex: 1,
    },
    inputTitleText: {
        paddingLeft: 5,
        fontSize: 20,
        paddingTop: 20,
        width: 130,
        color: '#1e90ff',
        fontWeight: 'bold',
        paddingLeft: 10
      },
      recipeInputText: {
        marginLeft: 10,
        height: 250,
        fontSize: 20
      }, 
      donebutton:{
          marginTop:10
      }
})