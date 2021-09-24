import React from "react";
import { StyleSheet, Text, View, Image, ScrollView,Dimensions } from "react-native";
import ModalSelector from 'react-native-modal-selector'

let width =Dimensions.get("window").width
let height=Dimensions.get("window").height

export default function AgeRang() {

    const ageData=[
        { key: 'all', label: '18-45+' },
        { key: '18-30', label: '18-30'},
        { key: '30-45', label: '30-45' },
        { key: '45+', label: '45+' },
        
    ]
    return (
        <View style={styles.container}>

            
            <Text style={styles.ageText}>Age</Text>

            <ModalSelector
                style={styles.ageSelector}
                touchableStyle={styles.touchableSelector}      
                data={ageData}
                keyExtractor= {item => item.key}
                disabled={false}
                initValue='Age'
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

    ageText:{
        fontSize:width/23,
        //backgroundColor:'green',
        width:width/2.8,
        fontWeight:'bold',
        marginTop:height/90

    },

    ageSelector:{
        //backgroundColor:'pink',
        width:width/2.2,
        height:height/22,
        marginLeft:width/12

    },
    touchableSelector:{
     
    }
});