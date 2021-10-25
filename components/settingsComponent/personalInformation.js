import React,{useState,useMemo,useEffect,useRef} from "react";
import { StyleSheet, Text, View, Image, ScrollView,Dimensions, TouchableOpacity} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Slider from 'react-native-slider'

let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}

export default function personalInformation() {

   

    
    return (
        <View style={styles.container}>
         
            <TouchableOpacity style={styles.buttonPersonalInformation}>
                <Text style={styles.personalText}>
                    Personal Information
                </Text>
            </TouchableOpacity>
            <View style={styles.separator}></View>
         
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height/12,
    
        marginTop:height/100,
        marginBottom:height/45,

    },

    buttonPersonalInformation:{
  
        height:height/12,
        marginTop:height/150
    },
    personalText:{
        marginLeft:width/20,
        color:'#0040d3',
        fontSize:height/50,
        marginTop:height/40
    },
    separator:{
       
        backgroundColor:'#c5c5c5',
        height:height/500,
        width:width,
        marginTop:height/80
    },
   
   
});