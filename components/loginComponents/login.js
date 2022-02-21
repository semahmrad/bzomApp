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

const  loginApis = async (emialOrUserName,password,setErrorMessage,navigation)=>{
  
  await client.post('sign/in',

    {
        authenticator:emialOrUserName.toLowerCase(),
        password:password
    }
    
  ).then((result)=>{
    console.log(result.data.code,"<<<<=======================<<<<<")
    if(result.data.code==200) {
      //setErrorMessage('');
      navigation.navigate('Profile');
      setEmialOrUserName

      console.log('token ===>',result.data.token)
    }
    else{
      console.log(result.data.msg)
      setErrorMessage(result.data.msg);
    }
    
    
  }).catch(err=>{  
      setErrorMessage('conexion ...')
      console.log('err ....!',JSON.stringify(err));
  });
}



const getDataFromlocalStorage = async () => {
  try {
    const value = await AsyncStorage.getItem('userPayloadSignUp')
    if(value !== null) {
        console.log('storage',value.username);
        console.log('storage',JSON.stringify(value));
    }
  } catch(e) {
  
  }
}
export default function login() {
 const navigation=useNavigation();
 const [emialOrUserName,setEmialOrUserName]=useState();
 const [password,setPassword]=useState();
 const [errorMessage,setErrorMessage]=useState('');


 getDataFromlocalStorage();
  return (
      <View style={styles.container} >
        <Image
          style={styles.logo}
          source={require('./loginIcons/logo_login.png')}
        />
        <View style={styles.signContainer}>
          <Text style={styles.loginTextTitle}>Login to your account</Text>
          <Text style={styles.textForInput}>Email or Username</Text>
          <TextInput
            
            style={styles.inputLogin}
            placeholderTextColor="#6f6e6e"
            placeholder='Email or Username'
            onChangeText={setEmialOrUserName}
            value={emialOrUserName}
           
          />
          <Text style={styles.textForInput}>Password</Text>
          <TextInput
            style={styles.inputLogin}
            placeholderTextColor="#6f6e6e"
            placeholder='Password'
            secureTextEntry
            onChangeText={setPassword}
            value={password}
            
          />
          <TouchableOpacity
            style={styles.resetPasswordButton}
            onPress={()=>{
              
              navigation.navigate('resetPassword')
            }}
          >
            <Text style={styles.resetPassword}>Recover password?</Text>
          </TouchableOpacity>
          <Text style={styles.errorMsg}>{errorMessage}</Text>
          
          <TouchableOpacity
            style={styles.loginButton}
            onPress={async ()=>{
              await loginApis(emialOrUserName,password,setErrorMessage,navigation);
            }}
          >
            <Text style={styles.loginText}>PROCEED</Text>
          </TouchableOpacity>
            <Text style={styles.or}>--- OR ---</Text>
            <View style={styles.otherLoginMethode}>
              <TouchableOpacity
                style={styles.googleLoginButton}
              >
                <Image
                  source={require('./loginIcons/google.png')}
                  style={styles.googleLoginLogo}
                />
                <Text style={styles.googleText}>GOOGLE</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.facebookLoginButton}
              >
                <Image
                  source={require('./loginIcons/fb.png')}
                  style={styles.facebookLoginLogo}
                />
                <Text style={styles.facebookText}>FACEBOOK</Text>
              </TouchableOpacity>
            </View>

        </View>
        <View style={styles.changePageContainerBackground}>
            <View style={styles.changePageContainer}>
               
                    <View style={styles.changePageTextContainer}>
                        <Text style={styles.explicationPageChange}>Don't have an account? </Text>
                        <TouchableOpacity
                            onPress={()=>{navigation.navigate('signup')}}
                            style={styles.changePagButton}
                            >
                        <Text style={styles.signInText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

              
            </View>
        </View>
        
      </View>    
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#e24731",
    height:height,
    width:width,
    
  },
  logo:{
    width:width/2.2,
    height:width/4.5,
    alignSelf:'center',
    marginTop:height/50
  },
  signContainer:{
    backgroundColor:"white",
    height:height/1.6,
    width:width,
    marginTop:height/25,
    borderTopStartRadius:width/12,
    borderTopEndRadius:width/12,
    //elevation:width/25,
  },
  loginTextTitle:{
    color:'black',
    alignSelf:'center',
    fontSize:height/28,
    marginTop:height/30,
    fontWeight:'bold'
  },
  inputLogin:{
    fontSize:height/67,
    color:'black',
    alignSelf:'center',
    width:width/1.08,
    height:height/17,
    backgroundColor:'#f5f9fc',
    marginTop:height/100,
    //borderRadius:width/15,
    borderBottomWidth:1,
    borderColor:'#838080',
    elevation:width/50,
  },
  textForInput:{
    marginTop:height/50,
    marginLeft:(width-(width/1.08))/2,
    fontSize:height/57,
    fontWeight:"400",
    color:'#525050',
    
  },
  resetPasswordButton:{
    //backgroundColor:'black',
    height:height/30,
    justifyContent:'center',
    width:width/2.5,
    marginRight:(width-(width/1.08))/2,
    alignSelf:'flex-end',
    alignItems:'center'
  },
  resetPassword:{
    fontSize:height/55,
    color:'#3228b4',
  },
  errorMsg:{
    color:'red',
    textAlign:'center',
    //marginTop:height/100,
  },
  loginButton:{
    width:width/1.1,
    height:height/14,
    backgroundColor:'#e24731',
    alignSelf:'center',
    marginTop:height/100,
    borderRadius:width/45,
    justifyContent:'center',
    elevation:width/25,
    borderWidth:width/width
  },
  loginText:{
    color:'white',
    textAlign:'center',
    fontSize:height/32,
    fontWeight:'bold'
  },
  or:{
    textAlign:'center',
    marginTop:height/150,
    fontWeight:'bold',
    fontSize:height/40,
    color:'#b6b6b6',
  },
  otherLoginMethode:{
    //backgroundColor:'red',
    width:width/1.08,
    height:height/20,
    alignSelf:'center',
    marginTop:height/100,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    alignContent:'center'
  },
  googleLoginButton:{
    backgroundColor:"#dc4e40",
    width:width/2.3,
    borderRadius:width/50,
    height:height/20,
    alignItems:'center',
    flexDirection:'row',
  },
  googleLoginLogo:{
    width:methods.circleObject(12),
    height:methods.circleObject(12),
    marginLeft:width/100,
  },
  googleText:{
    color:'white',
    marginLeft:width/50,
    fontSize:height/45
  },
  facebookLoginButton:{
    backgroundColor:"#45619d",
    width:width/2.3,
    borderRadius:width/50,
    height:height/20,
    alignItems:'center',
    flexDirection:'row',
  },
  facebookLoginLogo:{
    width:methods.circleObject(12),
    height:methods.circleObject(12),
    marginLeft:width/100,
  },
  facebookText:{
    color:'white',
    marginLeft:width/50,
    fontSize:height/45
  },
  changePageContainerBackground:{
    backgroundColor:'white',
    height:height-(width/4.5+height/1.7+height/50+height/25),
    
  
   //borderTopEndRadius:width/10
},
changePageContainer:{
  height:height-(width/4.5+height/1.7+height/50+height/25),
  width:width,
  backgroundColor:'#e24731',
  borderTopEndRadius:width/7,
  alignItems:'center',
  
},
changePagButton:{
    //alignSelf:'center',
   // width:width/1.1,
    //height:height/20,
    marginTop:height/25,
    
},
changePageTextContainer:{
 
  flexDirection:'row',
},
explicationPageChange:{
    color:'white',
    textAlign:'center',
    fontSize:height/35,
    fontWeight:'400',
    marginTop:height/25,
   
},
signInText:{
  color:'white',
  textAlign:'center',
  fontSize:height/35,
  fontWeight:'bold'
},

});