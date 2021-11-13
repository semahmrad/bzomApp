import React,{useState}  from 'react';
import { StyleSheet, Text, View,Dimensions,TouchableOpacity,TextInput,Image } from "react-native";

import ModalSelector from 'react-native-modal-selector'
import colors from './../../../projectColor/colors'
import confPass from './../../../confProject/passwordConf'
let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}


    const validateVisibility=(oldPassword,newPassword,confNewPassword,passValidate)=>{
      if(oldPassword && newPassword && confNewPassword&&passValidate){
        return true
      }
      else {return false}

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
      
        <View style={styles.container}>
          <Text style={styles.textChangePassword}>Old Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setOldPassword}
            value={oldPassword}
            secureTextEntry={true}
          />

          <Text style={styles.textChangePassword}>New Password</Text>
          <View style={styles.newPasswordContainer}>
              <TextInput
                style={styles.input}
                onChangeText={setNewPassword}
                value={newPassword}
                secureTextEntry={true}
              />
              
              { passwordCondition(newPassword,confPass.numberOfChar)
             ? <Image source={require('../settingsIcons/tick.png')}
                style={styles.tickIcon}
              />
              : null
              }
          </View>

          <Text style={styles.textChangePassword}>Confirme New Password</Text>
          <View style={styles.newPasswordContainer}>
              <TextInput
                style={styles.input}
                onChangeText={setconfNewPassword}
                value={confNewPassword}
                secureTextEntry={true}
              />
              {newPasswordValidate(newPassword,confNewPassword,passwordCondition(newPassword,confPass.numberOfChar))
              ?<Image source={require('../settingsIcons/tick.png')}
                style={styles.tickIcon}
              />
              :null
              }
          </View>

          {validateVisibility(oldPassword,newPassword,confNewPassword,passValidate)
          ?<TouchableOpacity
            onPress={()=>{ }}
            style={styles.validateButton}
          >
            <Text style={styles.validateButtonText}>Update Password</Text>
          </TouchableOpacity>
          : null
          }

          <View style={styles.errorView}>
            <Text style={styles.textError}>the old password is wrong</Text>
          </View>

        </View>
         

      );
    }

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height,
        marginLeft:width/15,
        marginTop:height/25,
    },
    textChangePassword:{
      fontSize:height/50,
      fontWeight:'400',
      color :colors.baseColor

    },
    newPasswordContainer:{
      flexDirection:'row'
    },
    input:{
      backgroundColor:'#dfdfdf',
      height: height/20,
      width: width/1.3,
      marginBottom:height/70,
      marginTop:height/100,
      borderRadius:width/30,
      borderWidth:0.1,
      color:'#000',
      fontSize:height/55,
      elevation:20,
      zIndex:1
    },
    tickIcon:{
      width:width/14,
      height:width/14,
      marginTop:height/55,
      marginLeft:width/25,
      tintColor:'#3dff30',
   
    },
    validateButton:{
      backgroundColor:colors.baseColor,
      height:height/20,
      width:width/2,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:width/30,
      borderWidth:0.1,
      elevation:20,
      marginTop:height/50,
    },
    validateButtonText:{
        fontWeight:'300',
        fontSize:height/45,
        color :'white',
    
        
    },

    errorView:{
      position:'absolute',
      backgroundColor:'red',
      width:width/1.8,
      height:height/20,
      alignItems:'center',
      justifyContent: 'center',
      borderRadius:width/50,
      marginLeft:width/6,
      marginTop:height/1.4,
      opacity:0.7,
      
    },
    textError:{
      color :'#fff',
    },
});



