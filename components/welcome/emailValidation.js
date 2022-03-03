import React,{useState,useRef, useEffect} from 'react';
import { StyleSheet, Text, View, Image, ScrollView,Alert,TouchableOpacity, BackHandler,TextInput } from "react-native";
import { Input } from 'react-native-elements';
import dimension from '../../screenSizes/screenOfSizes'
import methods from './../../usedMethods/usedMethods'
import{useNavigation} from "@react-navigation/native"
import axios from 'axios'
import client from '../../confProject/config_server'
import configServer from '../../confProject/conf_serv'

import AsyncStorage from '@react-native-async-storage/async-storage';

import Recaptcha from 'react-native-recaptcha-that-works';
import Navigation from '../../navigation/navigationScreen';
let width =dimension.width
let height=dimension.heightWhenNavBar;

const getEmail= async(setEmail)=>{
    try{
        await AsyncStorage.getItem('email').then(email=>{
            setEmail(email.toLowerCase());
        }).catch(err=>{console.log('err get token ',err)});
    }catch(err){console.log('catch err',err)}
}

const getToken=async(setToken)=>{
    try{
        await AsyncStorage.getItem('token').then(token=>{
            setToken(token);
        }).catch(err=>{console.log('err get token ',err)});
    }catch(err){console.log('catch err',err)}
   
}


const verifyUrAccount =async(secretCode,token,navigation)=>{
    const config={
        method: 'post',
        url: configServer.base_url+'user/verify/account',
        headers: {
            'Authorization': 'Bearer '+token
        },
        data : {secretCode:secretCode}
    }
    await axios(config)
    .then(resp=>{
        console.log('resp data',resp.data)
        if(resp.data.code==200){
            navigation.navigate('Profile');
            try{AsyncStorage.setItem('isVerify','true')}
            catch(err){console.log('err in is verify',err)  }
        }
    })
    .catch(err=>console.log('error in verify account ',err ))
}
const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };
export default function validationByEmail({route}) {

//const email=route.params?.email.toLowerCase();
const navigation=useNavigation();
const[codeValidation,setCodeValidation]=useState();
const[disableButton,setDisableButton]=useState(false);
const[token,setToken]=useState(null);
const[email,setEmail]=useState(null);


useEffect(()=>{
    getToken(setToken);
    getEmail(setEmail);
    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
},[]);


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
                disabled={disableButton}
                style={styles.tryAgainbutton}
                
                onPress={()=>{
                    
              
                    setDisableButton(true)
                    setTimeout(()=>{
                        alert('hello');
                        setDisableButton(false)
                    },1000)
                }}
            >
                <Text style={styles.tryAgainText}> Try Again</Text>
            </TouchableOpacity>
        </View>
        

        <TouchableOpacity
            style={styles.continueButton}
            onPress={()=>{verifyUrAccount(codeValidation,token,navigation)}}
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