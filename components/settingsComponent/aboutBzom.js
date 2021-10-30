import React,{useState,useMemo,useEffect,useRef} from "react";
import { StyleSheet, Text, View, Image, ScrollView,Dimensions, TouchableOpacity} from "react-native";
//colors 
import colors from './../../projectColor/colors'

let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}

export default function personalInformation() {

   

    
    return (
        <View style={styles.container}>
         
            <TouchableOpacity style={styles.aboutBzomButton}>
                <Text style={styles.aboutBzomText}>
                    about bzom
                </Text>
            </TouchableOpacity>
          
         
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height/12,

    },

    aboutBzomButton:{
  
        height:height/12,
        marginTop:height/200
    },
    aboutBzomText:{
        
        fontSize:height/50,
        marginTop:height/40,
        alignSelf:'center',
        color:colors.baseColor,
    },
    
   
});