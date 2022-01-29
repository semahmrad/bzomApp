import React,{useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView,Dimensions,TouchableOpacity, ViewBase,TextInput } from "react-native";
import { Input } from 'react-native-elements';
import dimension from '../../screenSizes/screenOfSizes'
import methods from './../../usedMethods/usedMethods'
import{useNavigation} from "@react-navigation/native"
let width =dimension.width
let height=dimension.heightWhenNavBar

export default function signUp() {
 const navigation=useNavigation();

  return (
      <View style={styles.container} >
        <Image
          style={styles.logo}
          source={require('./loginIcons/logo_login.png')}
        />
        <View style={styles.signContainer}>
          <Text style={styles.loginTextTitle}>Create your account</Text>
          <Text style={styles.textForInput}>Email</Text>
          <TextInput
            style={styles.inputLogin}
          />

          <Text style={styles.textForInput}>Username</Text>
          <TextInput
            style={styles.inputLogin}
          />

          <Text style={styles.textForInput}>Password</Text>
          <TextInput
            style={styles.inputLogin}
          />

          
          <TouchableOpacity
            style={styles.loginButton}
            onPress={()=>{navigation.navigate('Profile')}}
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
    fontSize:height/67,
    color:'black',
    alignSelf:'center',
    width:width/1.08,
    height:height/20,
    backgroundColor:'#f5f9fc',
    marginTop:height/150,
    borderRadius:width/15,
    borderWidth:1,
    borderColor:'#838080',
    elevation:width/50,
  },
  textForInput:{
    marginTop:height/60,
    marginLeft:(width-(width/1.08))/2,
    fontSize:height/57,
    fontWeight:"400",
    color:'#525050',
    
  },
  resetPassword:{
    fontSize:height/62,
    //marginLeft:width/1.55,
    marginTop:height/70,
    alignSelf:'flex-end',
    marginRight:(width-(width/1.08))/2,
    color:'#585151'
  },
  loginButton:{
    width:width/1.1,
    height:height/16,
    backgroundColor:'#e24731',
    alignSelf:'center',
    marginTop:height/25,
    borderRadius:width/15,
    justifyContent:'center',
    elevation:width/50,
  },
  loginText:{
    color:'white',
    textAlign:'center',
    fontSize:height/32,
    fontWeight:'bold'
  },
  or:{
    textAlign:'center',
    marginTop:height/80,
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