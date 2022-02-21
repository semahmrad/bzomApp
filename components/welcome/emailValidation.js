import React,{useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView,Dimensions,TouchableOpacity, ViewBase,TextInput } from "react-native";
import { Input } from 'react-native-elements';
import dimension from '../../screenSizes/screenOfSizes'
import methods from './../../usedMethods/usedMethods'
import{useNavigation} from "@react-navigation/native"
import axios from 'axios'
import client from '../../confProject/config_server'

import AsyncStorage from '@react-native-async-storage/async-storage';
let width =dimension.width
let height=dimension.heightWhenNavBar

export default function validationByEmail({route}) {

//const email=route.params?.email.toLowerCase();
const email ='semahmrad@gmail.com';
const[codeValidation,setCodeValidation]=useState()
  return (
    <View style={styles.container} >
        <Text style={styles.title}>Verify Email </Text>
        <View style={styles.sendCodeContainer}>
            <Text style={styles.subTitle}>Code is send To  </Text>
            <Text style={styles.email}>{email}</Text>
        </View>
        <TextInput
            keyboardType = 'number-pad'
            style={styles.inputCode}
            placeholderTextColor="#6f6e6e"
            placeholder='Code'
            onChangeText={setCodeValidation}
            value={codeValidation}
        />

        <View style={styles.contReciveCodeContainer}>
            <Text style={styles.contReciveCodeText}>Don't recive code? </Text>
            <TouchableOpacity
                style={styles.tryAgainbutton}
            >
                <Text style={styles.tryAgainText}> Try Again</Text>
            </TouchableOpacity>
        </View>
        

        <TouchableOpacity
            style={styles.continueButton}
        >
            <Text style={styles.textButton}>Continue</Text>
        </TouchableOpacity>
        
    </View>    
  );
}

const styles = StyleSheet.create({
  container:{
    //backgroundColor:"#e24731",
    height:height,
    width:width,
    
  },
  title:{
    alignSelf:'center',
    marginTop:height/25,
    fontSize:height/30,
    fontWeight:'400'
},
sendCodeContainer:{
    flexDirection:'row',
    //backgroundColor:'red',
    width:width/1.3,
    height:height/25,
    marginTop:height/25,
    alignSelf:'center',
},
subTitle:{
    alignSelf:'center',
    fontSize:height/55,
    fontWeight:'300'
},
email:{
    alignSelf:'center',
    fontSize:height/55,
    fontWeight:'500'
},
inputCode:{
    height:height/12,
    width:width/4,
    alignSelf:'center',
    //backgroundColor:'red',
    marginTop:height/50,
    borderBottomWidth:1,
    color:'#000',
    textAlign:'center',
    fontSize:width/20,
    fontWeight:'bold'
},
contReciveCodeContainer:{
    flexDirection:'row',
    marginTop:height/52,
    //backgroundColor:'red',
    width:width/1.85,
    alignSelf:'center'
},
contReciveCodeText:{
    fontSize:height/50,
    fontWeight:'300',
},
tryAgainbutton:{
    //backgroundColor:'red',

},
tryAgainText:{
    fontSize:height/52,
    fontWeight:'400',
},
continueButton:{
    backgroundColor:'#e24731',
    width:width/2,
    height:height/22,
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:width/55,
    marginTop:height/35,
    alignSelf:'center'
},
textButton:{
    fontSize:height/45,
    color:'white',
    fontWeight:'400',
    elevation:25,
},
});