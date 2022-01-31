import React,{useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView,Dimensions,TouchableOpacity, ViewBase,TextInput } from "react-native";
import { Input } from 'react-native-elements';
import dimension from '../../screenSizes/screenOfSizes'
import methods from './../../usedMethods/usedMethods'
import{useNavigation} from "@react-navigation/native"
import axios from 'axios'
import client from '../../confProject/config_server'
let width =dimension.width
let height=dimension.heightWhenNavBar

const  testApiConsumize = async (email,password,setLoading,setErrorMessage)=>{
  
  await client.post('sign/in',

    {
        authenticator:email,
        password:password
    }
    
  ).then((result)=>{
    console.log(result.data.code,"<<<<=======================<<<<<")
    if(result.data.code==200) setLoading(true);
    else{
      setErrorMessage(result.data.msg)
    }
    
    
  }).catch(err=>{  
      setErrorMessage('conexion ...')
      console.log('err ....!',JSON.stringify(err));
  });
}

export default function login() {
 const navigation=useNavigation();
 const [email,setEmail]=useState();
 const [password,setPassword]=useState();
 const [loading,setLoading]=useState(false);
 const [errorMessage,setErrorMessage]=useState("");

 
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
          <TouchableOpacity
            onPress={()=>{
              
              navigation.navigate('resetPassword')
            }}
          >
            <Text style={styles.resetPassword}>Recover password?</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.loginButton}
            onPress={()=>{
              testApiConsumize(email,password,setLoading,setErrorMessage);
              if(loading){
                navigation.navigate('Profile')
              }
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
  resetPassword:{
    fontSize:height/55,
    //marginLeft:width/1.55,
    marginTop:height/55,
    alignSelf:'flex-end',
    marginRight:(width-(width/1.08))/2,
    color:'#3228b4'
  },
  loginButton:{
    width:width/1.1,
    height:height/14,
    backgroundColor:'#e24731',
    alignSelf:'center',
    marginTop:height/35,
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
    marginTop:height/60,
    fontWeight:'bold',
    fontSize:height/40,
    color:'#b6b6b6',
  },
  otherLoginMethode:{
    //backgroundColor:'red',
    width:width/1.08,
    height:height/20,
    alignSelf:'center',
    marginTop:height/35,
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