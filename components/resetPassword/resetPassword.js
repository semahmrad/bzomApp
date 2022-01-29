import React,{useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView,Dimensions,TouchableOpacity, ViewBase,TextInput } from "react-native";
import { Input } from 'react-native-elements';
import dimension from '../../screenSizes/screenOfSizes'
import methods from './../../usedMethods/usedMethods'
import{useNavigation} from "@react-navigation/native"
let width =dimension.width
let height=dimension.heightWhenNavBar

const emailVerifyAndButtonColor=(email)=>{
   
    if((email.includes('@gmail.com')||email.includes('@hotmail')||email.includes('@yahoo'))&&email){
        return false
    }
    else {
        return true
    }
}
const backgroundButton=(buttonEnable)=>{
    if(!buttonEnable){
        return '#dc412b'
    }
    else{
        return '#a9a2a1'
    }
}


export default function restPassword() {
 const navigation=useNavigation();
 const [email,setEmail]=useState('');
 const [buttonEnable,setButtonEnable]=useState(emailVerifyAndButtonColor(email))

 console.log('emailVerifyAndButtonColor=(email)',buttonEnable)

  return (
      <View style={styles.container}>
        <TouchableOpacity
            onPress={()=>{navigation.navigate('signIn')}}
        >
            <Image
                style={styles.backIcon}
                source={require('./resetpasswordIcons/back.png')}
            />
        </TouchableOpacity>
       
        <Text style={styles.restPassworTitle}>Reset password</Text>
          
        <TextInput
           style={styles.restPasswordInput}
           placeholder='Your email address'
           placeholderTextColor="#6f6e6e"
           onChangeText={setEmail}
           value={email}

        />
        <Text style={styles.explicationText}>We'll send you a code to instantly recover your account</Text>
        <TouchableOpacity
        onPress={()=>{alert('aaa')}}
            disabled={emailVerifyAndButtonColor(email)}
            style={{...styles.sendButton,backgroundColor:backgroundButton(emailVerifyAndButtonColor(email))}}
        >
            <Text style={styles.sendText}>Send email</Text>
        </TouchableOpacity>
         
      </View>    
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
      marginTop:height/20,
      fontSize:height/30,
      fontWeight:'700'
  },
  restPasswordInput:{
      height:height/12,
      width:width/1.1,
      alignSelf:'center',
      //backgroundColor:'red',
      marginTop:height/10,
      borderBottomWidth:1,
      color:'#000'
  },
  explicationText:{
      color:'#6f6e6e',
      fontSize:height/60,
      textAlign:'center',
      marginTop:height/150
  },
  sendButton:{
      width:width/1.2,
      //backgroundColor:'#a9a2a1',
      height:height/17,
      alignSelf:'center',
      marginTop:height/10,
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

