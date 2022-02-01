import React,{useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView,Dimensions,TouchableOpacity, ViewBase,TextInput } from "react-native";
import dimension from '../../screenSizes/screenOfSizes'
import methods from './../../usedMethods/usedMethods'
import{useNavigation} from "@react-navigation/native"
import ImagePicker from 'react-native-image-crop-picker';
let width =dimension.width
let height=dimension.heightWhenNavBar

const changeProfilePic=(setImagePath)=>{
    ImagePicker.openPicker({
        //freeStyleCropEnabled:true,
         width:methods.circleObject(0.1),
         height: methods.circleObject(0.1),
         cropping: true,
         
       }).then(image => {
         console.log('image.path========>',image.path);
         setImagePath(image.path)
       }).catch(e=>{console.warn(error)})
}
const openCamer=(setImagePath)=>{
    ImagePicker.openCamera({
        width:methods.circleObject(0.1),
        height: methods.circleObject(0.1),
        cropping: true,
      }).then(image => {
        console.log(image);
        setImagePath(image.path)
      });
}


export default function getStartedProfilePick() {
 const navigation=useNavigation();
 const [imagePath,setImagePath]=useState();

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
                onPress={()=>{openCamer(setImagePath)}}
            >
               <Text style={styles.pickerText}>Take Picture</Text>
           </TouchableOpacity>

           <TouchableOpacity 
                style={styles.pickerButton}
                onPress={()=>{changeProfilePic(setImagePath)}}
           >
               <Text style={styles.pickerText}>Upload Picture</Text>
           </TouchableOpacity>
           
           <TouchableOpacity 
                onPress={()=>{navigation.navigate('Profile')}}
                style={styles.pickerButton}
            >
                <Text style={styles.pickerText}>Next</Text>
           </TouchableOpacity>

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
        elevation:width/25,
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
  
});