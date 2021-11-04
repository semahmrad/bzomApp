import React,{useState}  from 'react';
import { StyleSheet, Text, View,Dimensions,TouchableOpacity,TextInput } from "react-native";

import ModalSelector from 'react-native-modal-selector'
let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}


    const validateVisibility=(oldPassword,newPassword,confNewPassword)=>{
      if(oldPassword && newPassword && confNewPassword ){
        return true
      }
      else {return false}

    }
    
    export default function ChangePassword() {
      const [oldPassword,setOldPassword]=useState('')
      const [newPassword,setNewPassword]=useState('')
      const [confNewPassword,setconfNewPassword]=useState('')


      
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
          <TextInput
            style={styles.input}
            onChangeText={setNewPassword}
            value={newPassword}
            secureTextEntry={true}
          />

          <Text style={styles.textChangePassword}>Confirme New Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setconfNewPassword}
            value={confNewPassword}
            secureTextEntry={true}
          />

          {validateVisibility(oldPassword,newPassword,confNewPassword)
          ?<TouchableOpacity
            onPress={()=>{ }}
          >
            <Text style={styles.validateButton}>Validate</Text>
          </TouchableOpacity>
          : null
          }

        </View>
         

      );
    }

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height,
        marginLeft:width/12,
        marginTop:height/25,
    },
    textChangePassword:{
      fontSize:height/50,
      fontWeight:'300',
      
      
    },
 
  
});



