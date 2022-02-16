import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView,Dimensions,TouchableOpacity, ViewBase,TextInput } from "react-native";
import { Input } from 'react-native-elements';
import dimension from '../../screenSizes/screenOfSizes'
import methods from './../../usedMethods/usedMethods'
import{useNavigation} from "@react-navigation/native"
import axios from 'axios'
import client from '../../confProject/config_server'
import NetInfo from "@react-native-community/netinfo";
import { measureConnectionSpeed } from 'react-native-network-bandwith-speed';
let width =dimension.width
let height=dimension.heightWhenNavBar
import ConxionModal from '../../internetConxion/modalOffLine'


const serverValidator=async(username,email,password,setErrorMsg,setIsOfline)=>{
  console.log("fn2")
  if(signUpChampsValidator(username,email,password)!=''){
    setErrorMsg(signUpChampsValidator(username,email,password))
  }
  else{
    setErrorMsg('connecting ...')
    await client.post("signUpValidator/emailAndUsername",{
      username:username.toLowerCase(),
      email:email.toLowerCase(),
      }).then(res=>{
    setErrorMsg(res.data.msg)
  
    }).catch(err=>{
      console.log('i m here ========>')
      setErrorMsg("verify your connexion....!");
      setIsOfline(true)
  });}

}


const signUpChampsValidator=(username,email,password)=>{
  let mail_format = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  let username_format=  /^[a-zA-Z0-9]{5,}$/;
  let password_format=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  console.log("fn3")
  if(username&&email&&password){
    if(username.toLowerCase().match(username_format)){
      if(email.toLowerCase().match(mail_format)){
        console.log('valid email')
        if(password.toLowerCase().match(password_format)){
          return ''
        }else{
          return 'password not valid !!'
        }

      }else{
        console.log('invalide email')
        return 'email not valid !!'
      }
    }else {
      return'username not valid !!'
    }
  }
}
getNetworkBandwidth = async (setIsOfline) => {
  try {
    const networkSpeed = await measureConnectionSpeed();
    //console.log(networkSpeed); // Network bandwidth speed 
    //console.log('networkSpeed===========>',networkSpeed); 
    if(networkSpeed.speed>2){
      setIsOfline(false);
    }
    else{
      setIsOfline(true);
    }
    
  } catch (err) {
    console.log(err);  
    setIsOfline(true);
  }
}
const connectedWithServer=async(setServerContion)=>{
  await client.post("signUpValidator/concting")
   .then(resultat=>{
    setServerContion(resultat.data)
   // console.log('resultat.data',resultat.data);
  
   })
}


export default function signUp() {
 const navigation=useNavigation();
 const [username,setUsername]=useState("");
 const [email,setEmail]=useState("");
 const [password,setPassword]=useState("");
 const [erroMsg,setErrorMsg]=useState("");
 const [isOfline,setIsOfline]=useState(false);
 //try Connexion 
 const [tryAgain,setTryAgain]=useState(0);
 //serverConnexionTes
 const [serverContion,setServerContion]=useState("wait");
 
 
 


useEffect(()=>{
  getNetworkBandwidth(setIsOfline);
  setTryAgain(0);

  serverValidator(username,email,password,setErrorMsg,setIsOfline);
  console.log("1")
},[username,email,password])



  return (
      <View style={styles.container} >
        {isOfline?
        <ConxionModal
          setTryAgain={setTryAgain}
          tryAgain={tryAgain}
        />
        :null}
      
        <Image
          style={styles.logo}
          source={require('./loginIcons/logo_login.png')}
        />
        <View style={styles.signContainer}>
          <Text style={styles.loginTextTitle}>Create your account</Text>
         
          <Text style={styles.textForInput}>Username</Text>
          <TextInput
            style={styles.inputLogin}
            placeholderTextColor="#6f6e6e"
            placeholder='Username'
            onChangeText={setUsername}
            value={username}
          />
          <Text style={styles.conditionInput}>Minimum five characters</Text>

         
         <Text style={styles.textForInput}>Email</Text>
          <TextInput
          style={styles.inputLogin}
          placeholderTextColor="#6f6e6e"
          placeholder='Email'
          onChangeText={setEmail}
          value={email}
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
          <Text style={styles.conditionInput}>Minimum eight characters, at least one letter and one number</Text>

          <Text style={styles.errorText}>{erroMsg}</Text>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={async ()=>{
              await connectedWithServer(setServerContion);
            
               if(erroMsg==''&&serverContion=='connected'){
                navigation.navigate('getStarted',{username:username,email:email,password:password})
              }
             
            }}
          >
            <Text style={styles.loginText}>GET STARTED</Text>
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
                        <Text style={styles.explicationPageChange}>Have an account? </Text>
                        <TouchableOpacity
                            onPress={()=>{navigation.navigate('signIn')}}
                            style={styles.changePagButton}
                            >
                        <Text style={styles.signInText}>Sign In </Text>
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
    marginTop:height/50,
    fontWeight:'bold'
  },
  inputLogin:{
    fontSize:height/77,
    color:'black',
    alignSelf:'center',
    width:width/1.08,
    height:height/20,
    backgroundColor:'#f5f9fc',
    marginTop:height/200,
    //borderRadius:width/15,
    borderBottomWidth:1,
    borderColor:'#838080',
    elevation:width/50,
  },
  conditionInput:{
    fontSize:height/75,
    color:'#6f6e6e',
    marginLeft:(width-(width/1.08))/2,
  },
  textForInput:{
    marginTop:height/150,
    marginLeft:(width-(width/1.08))/2,
    fontSize:height/57,
    fontWeight:"400",
    color:'#525050',
    
  },
  errorText:{
    color:'red',
    textAlign:'center',
    marginTop:height/100,
  },

  signUpButton:{
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
    marginTop:height/120,
    fontWeight:'bold',
    fontSize:height/40,
    color:'#b6b6b6',
  },
  otherLoginMethode:{
    //backgroundColor:'red',
    width:width/1.08,
    height:height/20,
    alignSelf:'center',
    marginTop:height/40,
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
      fontSize:height/30,
      fontWeight:'400',
      marginTop:height/25,
     
  },
  signInText:{
    color:'white',
    textAlign:'center',
    fontSize:height/30,
    fontWeight:'bold'
  },

});