import React,{useEffect,useState} from "react";
import { StyleSheet, Text, View, SafeAreaView,ScrollView, TouchableOpacity,Dimensions } from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
import picConfig from '../imagePickerConfiguration'
import ExtraDimensions from 'react-native-extra-dimensions-android';
import sizes from  '../../screenSizes/screenOfSizes'
let width =sizes.width
let height=sizes.height

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
  
    console.warn('height buttons',height)
    const {buttonVisibilty,setButtonVisibilty,setImagePath}=props
   
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
