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

const testt=async (image)=>{
    const myForm= new FormData();
    //myForm.append('pic',image);
    myForm.append('pic',image);
    myForm.append('String',"image");

    console.log('data ===>',image.uri)
   await fetch('http://192.168.1.253:3000/sign/uploadPicTestt',{
        method:'post',
        data:myForm,
        headers:{
            //'accept': 'type/json',
            'Content-Type': `multipart/form-data boundary=${myForm._boundary}`,
           //'Content-Type': `text/html`,
        }
        //; boundary=${myForm._boundary}
        
    }).then(res=>res.json()).then(resp=>{console.log(resp.val)})
    .catch(err=>{console.log('err===>',err)})
}


const changeProfilePic=(setImagePath,setImage)=>{
    ImagePicker.openPicker({
        //freeStyleCropEnabled:true,
         width:methods.circleObject(0.1),
         height: methods.circleObject(0.1),
         cropping: true,
         
       }).then(picture => {
        //console.log('image.path========>',image.path);
         setImagePath(picture.path);
         setImage(picture);
        // uploadProfilePicture(picture)
       }).catch(e=>{console.warn(e)})
}
const openCamer=(setImagePath,setImage)=>{
    ImagePicker.openCamera({
        width:methods.circleObject(0.1),
        height: methods.circleObject(0.1),
        cropping: true,
      }).then(picture => {
      
        setImagePath(picture.path)
        setImage(picture)
      });
}



const uploadProfilePicture=async(image)=>{
    
    const imageData=new FormData();
   
    imageData.append("pic",{
        name:'bd29bd6b-6b01-4a60-aceb-c46a52c6156f.jpg',
        type:image.mime,
        uri:image.path
    })
   
    console.log('forma data =>',imageData);
    await axios({
        method:'post',
        url:'http://192.168.1.253:3000/sign/uploadPicTestt',
        body:imageData,
        headers: {
            Accept: "/*/",
            //"Content-Type": 'multipart/form-data '
          },
        
    }).then(function(response){
        console.log('image upload successfuly',response.data);
    }).catch(err=>{console.log('error riased', err)})
}

const pictureRequire=(imagePath)=>{
    if(imagePath==''){
        return 'profile picture is required'
    }else return 'ok'

}

export default function getStartedProfilePick({route}) {
 const navigation=useNavigation();
 const [imagePath,setImagePath]=useState('');
 const [image,setImage]=useState();



if(imagePath!=''){
 RNFetchBlob.fs.readFile(imagePath,'base64').then(res=>{
     console.log(res.length)

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
                onPress={()=>{changeProfilePic(setImagePath,setImage)}}
           >
               <Text style={styles.pickerText}>Upload Picture</Text>
           </TouchableOpacity>
           
           <TouchableOpacity 
                onPress={()=>{
                    uploadProfilePicture(image)
                    
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