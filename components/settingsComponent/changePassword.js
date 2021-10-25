import React,{useState,useMemo,useEffect,useRef} from "react";
import { StyleSheet, Text, View, Image, ScrollView,Dimensions, TouchableOpacity} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Slider from 'react-native-slider'

let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}

export default function changePassword() {

   

    
    return (
        <View style={styles.container}>
            <View style={styles.separator}></View>
            <TouchableOpacity style={styles.buttonChangePassword}>
                <Text style={styles.changePasswordText}>
                    Change Password
                </Text>
            </TouchableOpacity>
            <View style={styles.separator}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height/10,
    
        marginTop:height/55,
        marginBottom:height/45,

    },
    separator:{
       
        backgroundColor:'#c5c5c5',
        height:height/500,
        width:width,
        marginTop:height/80
    },
    buttonChangePassword:{
  
        height:height/12,
        marginTop:height/100
    },
    changePasswordText:{
        marginLeft:width/20,
        color:'#0040d3',
        fontSize:height/50,
        marginTop:height/40
      
    },
   
   
});