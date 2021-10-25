import React, { useState,useEffect } from 'react'
import {View, StyleSheet,Dimensions,BackHandler,Alert } from "react-native";
import ProfilePicture from './profilePictures'
import Pictures from './pictures'

let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}



export default function profileWhenVisited({route,navigation}){

    useEffect(()=>{
        navigation.setOptions({ tabBarVisible: false })
    },[])
    const profilePic=route.params?.profilePic;
    const nameProfile=route.params?.nameProfile
    const bio=route.params?.bio
    const pictures=route.params?.pictures

    console.log("params===========================>",route.params)
    
    return (
    
        <View style={styles.container}>
        
        
            <ProfilePicture
                profilePic={profilePic}
                nameProfile={nameProfile}
                bio={bio}
            />

            <Pictures
                pictures={pictures}
            />
        </View>
    );
  
}
const styles = StyleSheet.create({
    container:{
        width:width,
        height:height,
    },

})