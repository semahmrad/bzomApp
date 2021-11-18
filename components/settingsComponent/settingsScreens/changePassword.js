import React,{useState}  from 'react';
import { StyleSheet, Text, View,Dimensions,TouchableOpacity,TextInput,Image,ScrollView } from "react-native";

import { Input } from 'react-native-elements';
import colors from './../../../projectColor/colors'
import confPass from './../../../confProject/passwordConf'
let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}
if(height<732){height=(732+height)/2}


    const validateVisibility=(oldPassword,newPassword,confNewPassword,passValidate)=>{
      if(oldPassword && newPassword && confNewPassword&&passValidate){
        return false
      }
      else {return true}

    } 

    const newPasswordValidate=(password,newPassword,condtionPassword)=>{
        if(password==newPassword&&password&&condtionPassword){
          return true
        }
        else  return false 
    }

    const passwordCondition=(newPassword,numberOfChar)=>{
      if(newPassword.length>numberOfChar-1){
        
          return true;
      }
      else false
    }
    const oldPasswordValidate=(oldPasswordInput,oldPassword)=>{
      //recive password from database
        if(oldPasswordInput==oldPasswordInput){
          return true
        }
        else return false
    }
    
    export default function ChangePassword() {
      const [oldPassword,setOldPassword]=useState('')
      const [newPassword,setNewPassword]=useState('')
      const [confNewPassword,setconfNewPassword]=useState('')
      const passValidate=newPasswordValidate(newPassword,confNewPassword,passwordCondition(newPassword,confPass.numberOfChar))

      
      return (
      
        <ScrollView style={styles.container}>
          <Text style={styles.textChangePassword}>Old Password</Text>
          <Input
            style={styles.input}
            placeholder='Enter Password'
            onChangeText={setOldPassword}
            value={oldPassword}
            secureTextEntry={true}
          />

          <Text style={styles.textChangePassword}>New Password</Text>
          <View style={styles.newPasswordContainer}>
              <Input
                style={styles.input}
                placeholder='Enter New Password'
                onChangeText={setNewPassword}
                value={newPassword}
                secureTextEntry={true}
              />
              
       
          </View>

          <Text style={styles.textChangePassword}>Confirme New Password</Text>
          <View style={styles.newPasswordContainer}>
              <Input
                style={styles.input}
                placeholder='Confirme New Password'
                onChangeText={setconfNewPassword}
                value={confNewPassword}
                secureTextEntry={true}
              />
          
          </View>

         
          <TouchableOpacity
            style={styles.validateButton}
            disabled={validateVisibility(oldPassword,newPassword,confNewPassword,passValidate)}
            onPress={()=>{ }}
          >
            <Text style={styles.validateButtonText}>Update Password</Text>
          </TouchableOpacity> 
         

          <View style={styles.errorView}>
            <Text style={styles.textError}>the old password is wrong</Text>
          </View>
          

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
    textChangePassword:{
      fontSize:height/50,
      fontWeight:'400',
      color :colors.baseColor,
      marginLeft:width/15,

    },
    newPasswordContainer:{
      flexDirection:'row'
    },
    input:{

      color:'#000',
      fontSize:height/40,
      //elevation:20,
      zIndex:1
    },
   
    validateButton:{
      backgroundColor:colors.baseColor,
      height:height/20,
      width:width/2,
      marginLeft:width/15,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:width/30,
      borderWidth:0.1,
      elevation:15,
      marginTop:height/50,
    },
    validateButtonText:{
        fontWeight:'300',
        fontSize:height/45,
        color :'white',
    
        
    },

    errorView:{
      //position:'absolute',
      backgroundColor:'red',
      width:width/1.8,
      height:height/20,
      alignItems:'center',
      justifyContent: 'center',
      borderRadius:width/30,
      alignSelf:'center',
      marginTop:height/14,
      opacity:0.7,
      zIndex:30
      
    },
    textError:{
      color :'#fff',
    },
});



