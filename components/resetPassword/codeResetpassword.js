import React,{useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView,Dimensions,TouchableOpacity, ViewBase,TextInput } from "react-native";
import { Input } from 'react-native-elements';
import dimension from '../../screenSizes/screenOfSizes'
import methods from './../../usedMethods/usedMethods'
import{useNavigation} from "@react-navigation/native"
let width =dimension.width
let height=dimension.heightWhenNavBar

const codeVerif=(code)=>{
    let ok=false;
    if(code.length==6){
        for (i=0;i<6;i++){
            if(code[i]>-1){
                ok=true
            }
            else {
                ok=false
                break;
            }
        }
        if(ok){return false}
        else{return true}
    }
    else return true
}

const backgroundButton=(codeValidity)=>{
    if(!codeValidity){
        return '#dc412b'
    }
    else{
        return '#a9a2a1'
    }
}


export default function codeRestPassword() {
    const navigation=useNavigation();
    const [code,setCode]=useState("")

  return (
      <ScrollView style={styles.container}>
        <TouchableOpacity
            onPress={()=>{navigation.navigate('resetPassword')}}
        >
            <Image
                style={styles.backIcon}
                source={require('./resetpasswordIcons/back.png')}
            />
        </TouchableOpacity>
       
        <Text style={styles.restPassworTitle}>My code is</Text>
          
        <TextInput
           style={styles.restPasswordInput}
           placeholder='Code'
           placeholderTextColor="#6f6e6e"
           onChangeText={setCode}
           value={code}
           keyboardType = 'number-pad'

        />
        <TouchableOpacity
            onPress={()=>{alert('code')}}
            disabled={codeVerif(code)}
            style={{...styles.sendButton,backgroundColor:backgroundButton(codeVerif(code))}}
        >
            <Text style={styles.sendText}>Continue</Text>
        </TouchableOpacity>
         
      </ScrollView>    
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"white",
    height:height,
    width:width,
  },
  backIcon:{
      marginTop:height/50,
      width:methods.circleObject(9),
      height:methods.circleObject(9),
  },
  restPassworTitle:{
      alignSelf:'center',
      marginTop:height/20,
      fontSize:height/30,
      fontWeight:'700'
  },
  restPasswordInput:{
      height:height/12,
      width:width/1.1,
      alignSelf:'center',
      //backgroundColor:'red',
      marginTop:height/10,
      borderBottomWidth:1,
      color:'#000'
  },

  sendButton:{
      width:width/1.2,
      //backgroundColor:'#a9a2a1',
      height:height/17,
      alignSelf:'center',
      marginTop:height/10,
      borderRadius:width/25,
      elevation:width/25,
      borderWidth:width/(width*2),
    justifyContent:'center'
  },
  sendText:{
    textAlign:'center',
    color:'white',
    fontSize:height/39
  },

});

