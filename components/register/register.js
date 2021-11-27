import React,{useState} from 'react';
import { StyleSheet, Text, View, BackHandler, ScrollView,Dimensions,TouchableOpacity, ViewBase,TextInput } from "react-native";
import { Input } from 'react-native-elements';
import colors from './../../projectColor/colors'
import {Picker} from '@react-native-picker/picker';


let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}
if(height<732){height=(732+height)/2}

const passwordVerif=(password,confPassword,username,email,)=>{
    if(username.length<6&&username.length>0){
        return 'Username invaide'
    }
    else if(email.includes(' ')||(!email.includes('@gmail.com')&&!email.includes('@hotmail')&&!email.includes('@yahoo.com'))){
        return 'email invaide'
    }
    
    else if(password.length<8&&password.length>0){
        return 'your password is very short'
    }
    else if(password!=confPassword){
        return'verify your password'
    }
    else if(password.length>8&&password==confPassword){
        return ''
    }

}

export default function login() {
  const [username,setUsername]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPssword]=useState('');
  const [confPassword,setConfPssword]=useState('');
  const [gender,setGender]=useState('');
  //validate password
  const [verifyPassword,setVerifyPassword]=useState(passwordVerif(password,confPassword,username,email));

console.log('verifyPassword =>>>',verifyPassword)

  return (
        <ScrollView style={styles.container}>
            <Input
                style={styles.input}
                placeholder='Username'
                onChangeText={setUsername}
                value={username}
            />
            <Input
                style={styles.input}
                placeholder='Email'
                onChangeText={setEmail}
                value={email}
            />
            <Input
                style={styles.input}
                placeholder='Enter Password'
                onChangeText={setPssword}
                value={password}
                secureTextEntry={true}
            />
            <Input
                style={styles.input}
                placeholder='Confirme Password'
                onChangeText={setConfPssword}
                value={confPassword}
                secureTextEntry={true}
            />
            <Picker
                selectedValue={gender}
                onValueChange={itemValue => setGender(itemValue)}>
                <Picker.Item label="Male" value="MALE" />
                <Picker.Item label="Femal" value="FEMALE" />
                <Picker.Item label="Other" value="OTHER" />
            </Picker>

            <TouchableOpacity
                style={styles.loginButton}
                onPress={()=>{setVerifyPassword(passwordVerif(password,confPassword,username,email))}}
            >
                <Text style={styles.loginText}>Register</Text>
            </TouchableOpacity>

            {!verifyPassword?null
            :<Text style={styles.error}>{verifyPassword}</Text>} 
          
        </ScrollView>
    
  );
}
const styles = StyleSheet.create({
  container:{
      width:width,
      height:height,
     // marginLeft:width/15,
      marginTop:height/25,

  },
  input:{

    color:'#000',
    fontSize:height/50,
    //elevation:20,
    zIndex:1
  },
  loginButton:{
    backgroundColor:colors.baseColor,
    width:width/1.1,
    height:height/22,
    marginLeft:width/30, 
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:width/50,
    opacity:0.8,
    alignSelf:'center',
    marginTop:height/30
  },
  loginText:{
    color:'white',
    fontSize:height/45,
    fontWeight:'400',
  },
  error:{
      backgroundColor:'red',
      height: height/27,
      width:width/1.5,
      alignSelf:'center',
      marginTop:height/25,
      borderRadius:width/2,
      textAlign:'center',
      color:'white',
      fontSize:height/45,
      fontWeight:'bold',
      opacity:0.7
  }
});


