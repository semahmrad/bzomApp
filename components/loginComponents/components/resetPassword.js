import React,{useState} from 'react';
import { StyleSheet, Text, View, BackHandler, ScrollView,Dimensions,TouchableOpacity, ViewBase,TextInput } from "react-native";
import { Input } from 'react-native-elements';
import colors from '../../../projectColor/colors';

let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}
if(height<732){height=(732+height)/2}
export default function resetPassword(props) {
    const{visibility,setVisibility}=props;
    const[email,setEmail]=useState('')

  return (

        
        <View style={styles.container}>
        {visibility?
            
            <View style={styles.containerResetPassword}>
                <Text numberOfLines={2} style={styles.docsText}>Write your email and click in send ,we will send a new passwort to your email box</Text>
                <Input
                    style={styles.input}
                    placeholder='Email'
                    onChangeText={setEmail}
                    value={email}
                />
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={()=>{}}
                >
                    <Text style={styles.sendEmailText}>Send new password</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={()=>setVisibility(false)}
                >
                    <Text style={styles.sendEmailText}>Cancel</Text>
                </TouchableOpacity>
                
            </View>
      
        :null }
          
    </View>
    
  );
}
const styles = StyleSheet.create({
  
    container:{
        width:width,
        height:height/3.5,
       
    },
 
    containerResetPassword:{

        height:height/3.5,
        width:width,
        backgroundColor:'#e9e9e9',
        elevation:25,
        borderWidth:0.5,
        borderColor:'#fbf8f8'
 

    },
    docsText:{
        fontSize:height/65,
        fontWeight:'bold',
        marginLeft:width/25,
        marginRight:width/55,
        marginTop:height/150
    },
    input:{
      color:'#000',
      fontSize:height/50,
    },
    sendButton:{
        backgroundColor:colors.baseColor,
        width:width/1.3,
        alignSelf:'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: height/25,
        borderRadius:width/35,
        marginBottom:height/100

    },
    sendEmailText:{
        color:'white',
        fontSize:height/45,
        fontWeight:'400',
    }
  

  });