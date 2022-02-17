import React,{useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView,Dimensions,TouchableOpacity, ViewBase,TextInput } from "react-native";
import dimension from '../../screenSizes/screenOfSizes'
import methods from './../../usedMethods/usedMethods'
import{useNavigation} from "@react-navigation/native"
import ImagePicker from 'react-native-image-crop-picker';
import client from '../../confProject/config_server'
import axios from 'axios'


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



const uploadProfilePicture=async(image,username,firstName,lastName,email,birthday,password,gender)=>{

    const imageData=new FormData();
    imageData.append('profilePic',{
      uri:image.path,
      name:'image',
      type:image.mime
    });
    imageData.append('username',username);
    imageData.append('firstName',firstName);
    imageData.append('lastName',lastName);
    imageData.append('email',email);
    imageData.append('birthday',birthday);
    imageData.append('age',calculateAge(birthday,new Date()));
    imageData.append('password',password);
    imageData.append('gender',gender);
    
  
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
    .then(function (resp) {
      console.log('resp',resp.data)

    })
    .catch(function (error) {
      console.log('error==>',error);
    });
        
}

const pictureRequire=(imagePath)=>{
    if(imagePath==''){
        return 'profile picture is required'
    }else return 'ok'

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
 const [imagePath,setImagePath]=useState('file:///storage/emulated/0/Android/data/com.bzom/files/Pictures/1168b1f1-1f42-47b2-88cc-56fac656e713.jpg');
 const [image,setImage]=useState('file:///storage/emulated/0/Android/data/com.bzom/files/Pictures/1168b1f1-1f42-47b2-88cc-56fac656e713.jpg');

 let username =route.params.signUp.username;
 let email =route.params.signUp.email;
 let password =route.params.signUp.password;
 let firstName  =route.params.firstName;
 let lastName  =route.params.lastName ;
 let birthday =convertBirthdayDate(route.params.birthday);
 let gender=route.params.gender ;
 console.log('birthday',birthday)
 var today = new Date();  
 console.log("ddd",calculateAge(birthday,new Date()))

  return (
        <ScrollView style={styles.container} >
            <Text style={styles.titlePage}>Profile picture</Text>
            
           <Image
                style={styles.profilePic}
                
                source={{uri:imagePath}}
                resizeMethod='scale'
           />
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
                   await uploadProfilePicture(image,username,firstName,lastName,email,birthday,password,gender)
                    //testt(image);
                   // otherTest(imagePath)
                }}
            
                style={styles.pickerButton}
            >
                <Text style={styles.pickerText}>Next</Text>
           </TouchableOpacity>
           <Text style={styles.errorText}>{pictureRequire(imagePath)!='ok'?pictureRequire(imagePath):''}</Text>

        </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
      //backgroundColor:'black',
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
        //backgroundColor:'black',
        width:methods.circleObject(1.6),
        height:methods.circleObject(1.6),
        alignSelf:'center',
        marginTop:height/30,
        marginBottom:height/10,
        borderRadius:width/2,
        borderColor:'black',
        borderWidth:1,
        padding:width/25,
        //elevation:width/25,
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
});