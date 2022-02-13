import React,{useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView,Dimensions,TouchableOpacity, ViewBase,TextInput } from "react-native";
import dimension from '../../screenSizes/screenOfSizes'
import methods from './../../usedMethods/usedMethods'
import{useNavigation} from "@react-navigation/native"
import ImagePicker from 'react-native-image-crop-picker';
import client from '../../confProject/config_server'
import axios from 'axios'
import RNFetchBlob from 'rn-fetch-blob'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


let width =dimension.width
let height=dimension.heightWhenNavBar


const openGallary=async(setImagePath,setImage)=>{
    //console.log("event.target.files[0] = "+event.target.files[0])
    await ImagePicker.openPicker({
        //freeStyleCropEnabled:true,
         width:methods.circleObject(0.1),
         height: methods.circleObject(0.1),
         cropping: true,
         
       }).then(picture => {
        //console.log('image.path========>',image.path);
         setImagePath(picture.path);
         // we can upload this var yes that what i do lock to upload function her i set image var with image  value and 
         setImage(picture);
         console.log("image in open galary",JSON.stringify(picture))//returned the line
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
C:\Users\semah\OneDrive\Desktop\bzomApp\.flowconfig


const uploadProfilePicture=async(image)=>{

    const imageData=new FormData();
    imageData.append('pic',{
      uri:image.path,
      name:'image',
      type:image.mime
    });
//then this function upload a image   
// wait
// hm my result is different then your result
// my result is 
    console.log('image',image)
    console.log('image.size',image.size)
    
    //imageData.append('name', 'avatar');
   
    console.log("imageData",imageData)
    var config = {
        method: 'post',
        url: 'http://192.168.1.253:3000/sign/uploadPicTestt',
        headers: {
        'content-type': 'multipart/form-data;',
        'accept':'application/json'
           
           },
        data : imageData
      };
    console.log("imageData=",JSON.stringify(imageData))
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
        
}

const pictureRequire=(imagePath)=>{
    if(imagePath==''){
        return 'profile picture is required'
    }else return 'ok'

}

export default function getStartedProfilePick({route}) {
 const navigation=useNavigation();
 const [imagePath,setImagePath]=useState('file:///storage/emulated/0/Android/data/com.bzom/files/Pictures/1168b1f1-1f42-47b2-88cc-56fac656e713.jpg');
 const [image,setImage]=useState('file:///storage/emulated/0/Android/data/com.bzom/files/Pictures/1168b1f1-1f42-47b2-88cc-56fac656e713.jpg');




if(imagePath!=''){
 RNFetchBlob.fs.readFile(imagePath,'base64').then(res=>{
     console.log(res.length)
//just for test the RNFetchBlob library okey
    })}

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
                onPress={ ()=>{
                    uploadProfilePicture(image)
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