import React,{useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView,Dimensions,TouchableOpacity, ViewBase,TextInput } from "react-native";

import colors from './../../../projectColor/colors'

let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}
if(height<732){height=(732+height)/2}
export default function login() {



  return (
      
    <View style={styles.container}>
        <View style={{...styles.containerButtons, backgroundColor:'#45619d'}}>
             <Image 
                source={require('../loginIcons/fb.png')}
                style={styles.iconStyle}
            />
            <TouchableOpacity
                style={styles.loginButton}
                onPress={()=>{}}
            >
                <Text style={styles.textLogin}>Login with Facebook</Text>
            </TouchableOpacity>
        </View>

        <View style={{...styles.containerButtons,backgroundColor:'#dc4e40',marginTop:height/50}}>
            <Image 
                source={require('../loginIcons/google.png')}
                style={styles.iconStyle}
            />
            <TouchableOpacity
                style={styles.loginButton}
                onPress={()=>{}}
            >
                <Text style={styles.textLogin}>Login with Google</Text>
            </TouchableOpacity>
        </View>
    </View>
  
    
  );
}
const styles = StyleSheet.create({
    container:{

        width:width,
        height:height/7.2,
    },
    containerButtons:{
        width:width/1.6,
        height:height/20,
        flexDirection:'row',
        marginLeft:width/30,
        borderRadius:width/35,
        padding:width/70
        
       
    },
    iconStyle:{
        width:width/15,
        height:width/15,
        
    },
    loginButton:{
        width:width/1.5,
        height:height/17,
    },
    textLogin:{
        fontSize:height/45,
        marginLeft:width/50,
        color:'white',
        fontWeight:'bold',
    },

});


