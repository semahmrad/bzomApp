import React from "react";
import { StyleSheet, Text, View, Image, ScrollView,Dimensions } from "react-native";
import ModalSelector from 'react-native-modal-selector'
//colors 
import colors from './../../projectColor/colors'

let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}


const selectorData=[
    { key: 'men', label: 'Only Men'},
    { key: 'women', label: 'Only Women' },
    { key: 'both', label: 'Both men & women' }
]
export default function showMe() {



    return (
        <View style={styles.container}>

            <Text style={styles.showMeText}>Show Me</Text>
            <ModalSelector
                style={styles.selector}
                touchableStyle={styles.touchableSelector}      
                data={selectorData}
                keyExtractor= {item => item.key}
                disabled={false}
                initValue='Show Me'
                onChange={(value)=>{console.warn(value.label)}} 
                    
            />

             </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginLeft:width/20,
        width:width/1.1,
        flexDirection:'row',
        //justifyContent:'space-around',
        marginTop:height/20,
        //backgroundColor:'red'
    },

    showMeText:{
        fontSize:width/23,
        //backgroundColor:'green',
        width:width/2.8,
        fontWeight:'bold',
        marginTop:height/90,
        color:colors.baseColor

    },

    selector:{
        //backgroundColor:'pink',
        width:width/2.2,
        height:height/15,
        marginLeft:width/12

    },
    touchableSelector:{
     
    }
});