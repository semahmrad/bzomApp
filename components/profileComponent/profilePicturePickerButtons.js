import React,{useEffect,useState} from "react";
import { StyleSheet, Text, View, SafeAreaView,ScrollView, TouchableOpacity,Dimensions } from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
import picConfig from '../imagePickerConfiguration'
import ExtraDimensions from 'react-native-extra-dimensions-android';
import sizes from  '../../screenSizes/screenOfSizes'
import AsyncStorage from '@react-native-async-storage/async-storage';

let width =sizes.width
let height=sizes.height


const getToken=async(setToken)=>{
    await AsyncStorage.getItem('token').then(token=>{
        setToken(token);
    }).catch(err=>console.log('err change profile pic async',err));

}
const signUp=async(newPicture,token)=>{

    const newProfilePicData=new FormData();
    newProfilePicData.append('newPicture',{
      uri:newPicture.path,
      name:'image',
      type:newPicture.mime
    });  
    var config = {
        method: 'post',
        url: configServer.base_url+'sign/up',
        headers: {
        'content-type': 'multipart/form-data;',
        'accept':'application/json'
           
           },
        data : newProfilePicData
      };

    await axios(config)
    .then(async(resp)=> {
        console.log('responce of server in change profile picture',resp.data);

    })
    .catch(function (error) {
      console.log('error==>',error);
    });
}

const changeProfilePic=(setImagePath)=>{
    ImagePicker.openPicker({
        //freeStyleCropEnabled:true,
         width:picConfig.widthProfilePic,
         height: picConfig.heightProfilePic,
         cropping: true,
         
       }).then(image => {
         console.log('image.path========>',image.path);
         setImagePath(image.path)
       }).catch(e=>{console.warn(error)})
}
const openCamer=(setImagePath)=>{
    ImagePicker.openCamera({
        width:picConfig.widthProfilePic,
        height: picConfig.heightProfilePic,
        cropping: true,
      }).then(image => {
        console.log(image);
        setImagePath(image.path)
      });
}

export default function profilePickerButton(props){

    const {buttonVisibilty,setButtonVisibilty,setImagePath}=props
    const[token,setToken]=useState(null)
    useEffect(()=>{
        getToken(setToken)
    },[]);
    //console.log('change profile Pic Token =>',token);
  
   
   
    return (
            <View>
                { buttonVisibilty?
                    
                    <ScrollView style={styles.profilePicPiker}>
                    
                        <TouchableOpacity
                            onPress={()=>{
                                changeProfilePic(setImagePath);
                                setButtonVisibilty(false);
                            }}
                        >
                            <Text style={styles.buttonUploadOpenCamerText}>Upload Picture</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=>{
                                openCamer(setImagePath);
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
