import React,{useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView,Dimensions,TouchableOpacity, ViewBase,TextInput } from "react-native";
import { Input } from 'react-native-elements';
import dimension from '../../screenSizes/screenOfSizes'
import methods from './../../usedMethods/usedMethods'
import{useNavigation} from "@react-navigation/native"
let width =dimension.width
let height=dimension.heightWhenNavBar

const passwordValidty=(newPassword,confNewPassword)=>{
    if(newPassword.length>7 && newPassword==confNewPassword){
        return false
    }
    else{
        return true
    }
}

const backgroundButton=(newPassword)=>{
    if(!newPassword){
        return '#dc412b'
    }
    else{
        return '#a9a2a1'
    }
}

export default function newPassword() {
    const navigation=useNavigation();
    const [newPassword,setNewPassword]=useState("")
    const [confNewPassword,setConfNewPassword]=useState("")
    console.log('passwordValidty=====>',passwordValidty(newPassword,confNewPassword))

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
       
        <Text style={styles.restPassworTitle}>New password</Text>
          
        <TextInput
           style={styles.restPasswordInput}
           placeholder='Password'
           placeholderTextColor="#6f6e6e"
           onChangeText={setNewPassword}
           value={newPassword}
           secureTextEntry

        />
          <TextInput
           style={styles.restPasswordInput}
           placeholder='Password'
           placeholderTextColor="#6f6e6e"
           onChangeText={setConfNewPassword}
           value={confNewPassword}
           secureTextEntry
        />
        <TouchableOpacity
            onPress={()=>{navigation.navigate('signIn')}}
            disabled={passwordValidty(newPassword,confNewPassword)}
            style={{...styles.sendButton,backgroundColor:backgroundButton(passwordValidty(newPassword,confNewPassword))}}
        >
            <Text style={styles.sendText}>Change password</Text>
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
      marginTop:height/50,
      fontSize:height/30,
      fontWeight:'700'
  },
  restPasswordInput:{
      height:height/12,
      width:width/1.1,
      alignSelf:'center',
      //backgroundColor:'red',
      marginTop:height/20,
      borderBottomWidth:1,
      color:'#000'
  },

  sendButton:{
      width:width/1.2,
      //backgroundColor:'#a9a2a1',
      height:height/17,
      alignSelf:'center',
      marginTop:height/20,
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

