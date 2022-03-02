import React,{useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView,Dimensions,TouchableOpacity, ViewBase,TextInput } from "react-native";
import dimension from '../../screenSizes/screenOfSizes'
import methods from './../../usedMethods/usedMethods'
import{useNavigation} from "@react-navigation/native"
import ImagePicker from 'react-native-image-crop-picker';
import client from '../../confProject/config_server'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

let width =dimension.width
let height=dimension.heightWhenNavBar

const openGallary=async(setImagePath,setImage)=>{
    await ImagePicker.openPicker({
         width:methods.circleObject(0.1),
         height: methods.circleObject(0.1),
         cropping: true,
         
       }).then(picture => {
      
         setImagePath(picture.path);
         setImage(picture);
       }).catch(e=>{console.warn(e)})
}
const openCamer=async(setImagePath,setImage)=>{
    await ImagePicker.openCamera({
        width:methods.circleObject(0.1),
        height: methods.circleObject(0.1),
        cropping: true,
      }).then(picture => {
        setImagePath(picture.path)
        setImage(picture)
      });
}

const signUp=async(image,username,firstName,lastName,email,birthday,password,gender,navigation)=>{

    const imageData=new FormData();
    imageData.append('profilePic',{
      uri:image.path,
      name:'image',
      type:image.mime
    });
    imageData.append('username',username.toLowerCase());
    imageData.append('firstName',firstName.toLowerCase());
    imageData.append('lastName',lastName.toLowerCase());
    imageData.append('email',email.toLowerCase());
    imageData.append('birthday',birthday);
    imageData.append('age',calculateAge(birthday,new Date()));
    imageData.append('password',password);
    imageData.append('gender',gender.toLowerCase());
    
  
    var config = {
        method: 'post',
        url: 'http://192.168.1.253:3000/sign/up',
        headers: {
        'content-type': 'multipart/form-data;',
        'accept':'application/json'
           
           },
        data : imageData
      };

    await axios(config)
    .then(async(resp)=> {
          if(resp.data.code==200){
          let imageBase64=resp.data.userPayload.profilePic
          let token=resp.data.token
            try {
              await AsyncStorage.setItem('profilePic',imageBase64);
              await AsyncStorage.setItem('token',token);
            } catch (e) {
              console.log('SET storage e==>',e)
            }
          }
         
    })
    .catch(function (error) {
      console.log('error==>',error);
    });
}

const pictureRequire=(imagePath)=>{
    if(!imagePath){
      return 'profile picture is required'
    }else{
      return ''
    }
}
const getToken=async()=>{
  let token=await AsyncStorage.getItem('token');
  console.log('getToken',token);
  return token;
}

const convertBirthdayDate=(birthday)=>{
  //01-01-1990
  let arrSplit=birthday.split('-');
  let day=parseInt(arrSplit[0])+1;
  let month=arrSplit[1];
  let year=arrSplit[2];
  return  month+'/'+day+'/'+year
}
const calculateAge=(birth,dateNow)=>{
  let arrayBirth=birth.split('/');

  //split the birthday
  let birthDay=arrayBirth[0];
  let birthMonth=arrayBirth[1];
  let birthYear=arrayBirth[2];
  //split date now
  let nowDay=dateNow.getDate();
  let nowMonth=dateNow.getMonth()+1;
  let nowYear=dateNow.getFullYear();
  //calc the diff
  console.log('nowYear',nowYear)
  console.log('birthYear',birthYear)
  let age=parseInt(nowYear)-parseInt(birthYear);

  return age;
}




export default function getStartedProfilePick({route}) {
 const navigation=useNavigation();
 const [imagePath,setImagePath]=useState(null);
 const [image,setImage]=useState(null);
 
 console.log('route params',route.params)

 let username =route.params.signUp.username;
 let email =route.params.signUp.email;
 let password =route.params.signUp.password;
 let firstName  =route.params.firstName;
 let lastName  =route.params.lastName ;
 let birthday =convertBirthdayDate(route.params.birthday);
 let gender=route.params.gender ;
 console.log('birthday',birthday)
 var today = new Date();  
 console.log("ddd",calculateAge(birthday,new Date()));

 console.log('console get token',getToken())



  return (
        <ScrollView style={styles.container} >
            <Text style={styles.titlePage}>Profile picture</Text>
            {imagePath
           ?<Image
                style={styles.profilePic}
                
                source={{uri:imagePath}}
                resizeMethod='scale'
           />
           :<Image
              style={styles.profilePic}
           
              source={require('./default/defaultProfilePick.png')}
              resizeMethod='scale'
              tintColor='white'
            />}
           <TouchableOpacity 
                style={styles.pickerButton}
                onPress={()=>{openCamer(setImagePath,setImage)}}
            >
               <Text style={styles.pickerText}>Take Picture</Text>
           </TouchableOpacity>

           <TouchableOpacity 
                style={styles.pickerButton}
                onPress={()=>{openGallary(setImagePath,setImage)}}
           >
               <Text style={styles.pickerText}>Upload Picture</Text>
           </TouchableOpacity>
           
           <TouchableOpacity 
                onPress={async()=>{
                 await signUp(image,username,firstName,lastName,email,birthday,password,gender,navigation);
                }}
            
                style={styles.pickerButton}
                disabled={!imagePath}
            >
                <Text style={styles.pickerText}>Next</Text>
           </TouchableOpacity>
           <Text style={styles.errorText}>{pictureRequire(imagePath)}</Text>
          

        </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    height:height,
    width:width,
},
titlePage:{
    color:'black',
    alignSelf:'center',
    fontSize:height/23,
    marginTop:height/30,
    fontWeight:'bold'
  },
    profilePic:{
        backgroundColor:'#e24731',
        width:methods.circleObject(1.6),
        height:methods.circleObject(1.6),
        alignSelf:'center',
        marginTop:height/30,
        marginBottom:height/10,
        borderRadius:width/2,
        borderColor:'black',
        borderWidth:1,
        padding:width/25,
    },
    pickerButton:{
        backgroundColor:'#e24731',
        marginTop:height/50,
        height:height/17,
        width:width/1.2,
        alignSelf:'center',
        justifyContent:'center',
        borderRadius:width/45,
        elevation:width/25,
    },
    pickerText:{
        textAlign:'center',
        color:'white',
        fontSize:height/45,
        fontWeight:'500',
        elevation:width/25,
    },  
    errorText:{
        color:'red',
        textAlign:'center',
        marginTop:height/100,
      },
      justTest:{
        height:height/10,
        width:width/5,
        //backgroundColor:'red',
        alignSelf:'center',
      },
});