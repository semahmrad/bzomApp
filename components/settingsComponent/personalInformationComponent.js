import React,{useState,useMemo,useEffect,useRef} from "react";
import { StyleSheet, Text, View, Image, ScrollView,Dimensions, TouchableOpacity} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}

export default function personalInformation() {
    const navigation = useNavigation();
   

    
    return (
        <View style={styles.container}>
         
            <TouchableOpacity style={styles.buttonPersonalInformation}
                onPress={()=>{navigation.navigate('personalInformation')}}
            >
                <View style={styles.optionContainer}>
                    <Image
                        style={styles.personalInfoIcon}
                        source={require('./settingsIcons/personalInformation.png')}
                    />
                    <Text style={styles.personalText}>Personal Information</Text>
        
                </View>
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
    optionContainer:{
        flexDirection:'row',
        marginTop:height/100,
        marginLeft:width/20,
    },
    personalInfoIcon:{
        width:width/12,
        height:width/12,
        tintColor:'#00ffa1',
    },
    personalText:{
        color:'#0040d3',
        fontSize:height/50,
        marginTop:height/200,
        marginLeft:width/50,
     
    },
    separator:{
       
        backgroundColor:'#c5c5c5',
        height:height/500,
        width:width,
        marginTop:height/80
    },
   
   
});