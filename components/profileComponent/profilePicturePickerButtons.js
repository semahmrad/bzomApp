import React,{useEffect,useState} from "react";
import { StyleSheet, Text, View, SafeAreaView,ScrollView, TouchableOpacity,Dimensions } from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
import picConfig from '../imagePickerConfiguration'
import ExtraDimensions from 'react-native-extra-dimensions-android';
import sizes from  '../../screenSizes/screenOfSizes'

import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import configServer from './../../confProject/conf_serv'

let width =sizes.width
let height=sizes.height


const getToken=async(setToken)=>{
    await AsyncStorage.getItem('token').then(token=>{
        setToken(token);
    }).catch(err=>console.log('err change profile pic async',err));

}
const changeProfilePicApis=async(newPicture,token,setProfilImage)=>{

   const newProfilePicData=new FormData();
    newProfilePicData.append('newProfilePic',{
      uri:newPicture.path,
      name:'image',
      type:newPicture.mime
    }); 
    var config = {
        method: 'post',
        url: configServer.base_url+'user/change/profile/picture',
        headers: {
        'content-type': 'multipart/form-data;',
        'accept':'application/json',
        'Authorization': 'Bearer '+token
           
           },
        data : newProfilePicData
      };

    await axios(config)
    .then(async(resp)=> {
        console.log('======>iam here 1')
        if(resp.data.code==200){
            console.log('======>iam here 2')
            try{
                console.log('resp.data',resp.data.msg)
                AsyncStorage.setItem('profilePicture',resp.data.newPicture);
                setProfilImage(resp.data.newPicture)
            }catch(err){console.log('error when storage new pic ',err)}
            
        }
        else{
            alert(resp.data.msg);
        }

    })
    .catch(function (error) {
      console.log('error==>',error);
    });
}

const changeProfilePic=async(setProfilImage,token)=>{
    await ImagePicker.openPicker({
        //freeStyleCropEnabled:true,
         width:picConfig.widthProfilePic,
         height: picConfig.heightProfilePic,
         cropping: true,
         
       }).then(image => {
         console.log('image.path========>',image.path);
         setProfilImage(image.path);
         //call api for profile picture chaneg 
         changeProfilePicApis(image,token,setProfilImage);
         
       }).catch(e=>{console.warn(e)})
}
const openCamer=async(setProfilImage,token)=>{
    await ImagePicker.openCamera({
        width:picConfig.widthProfilePic,
        height: picConfig.heightProfilePic,
        cropping: true,
      }).then(image => {
        
        setProfilImage(image.path);
        changeProfilePicApis(image,token,setProfilImage);
      }).catch(e=>{console.warn(e)});
}

export default function profilePickerButton(props){

    const {buttonVisibilty,setButtonVisibilty,setProfilImage}=props
    const[token,setToken]=useState(null)
    useEffect(()=>{
        getToken(setToken)
    },[]);
   // console.log('change profile Pic Token =>',token);
  
   
   
    return (
            <View>
                { buttonVisibilty?
                    
                    <ScrollView style={styles.profilePicPiker}>
                    
                        <TouchableOpacity
                            onPress={()=>{
                                changeProfilePic(setProfilImage,token,setProfilImage);
                                setButtonVisibilty(false);
                            }}
                        >
                            <Text style={styles.buttonUploadOpenCamerText}>Upload Picture</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=>{
                                openCamer(setProfilImage,token);
                                setButtonVisibilty(false);
                            }}
                        >
                            <Text style={styles.buttonUploadOpenCamerText}>Open Camera</Text>
                        </TouchableOpacity>
        
                        <TouchableOpacity
                            onPress={()=>{
                                setButtonVisibilty(false)
                            }}
                        >
                            <Text style={styles.buttonUploadOpenCamerText}>Cancel</Text>
                        </TouchableOpacity>
                    </ScrollView>
            
                :null
                }
            </View>
    );
}
const styles = StyleSheet.create({
    profilePicPiker:{
        position:'absolute',
        zIndex:5,
        backgroundColor:'white',
        width:width,
        height:height/5.4,
        //flex:1,
        alignSelf:'center',
        marginTop:height/1.54,
        paddingTop:height/65,
        //borderRadius:width/25,
        //alignItems:'center',
    },
  
    buttonUploadOpenCamerText:{
        
        textAlign:'center',
        marginBottom:height/55,
        fontSize:height/40,
        color:'white',
        backgroundColor:'#ff7100',
        width:width/1.2,
        height:height/25,
        borderRadius:width/36,
        alignSelf:'center',

    },
    openCamerText:{}
  
})
