import React,{useEffect,useState} from "react";
import { ImageBackground, Text, View, Image, StyleSheet,Dimensions } from "react-native";
import ProfilePicture from './profilePictures'
import Pictures from './pictures'

let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}

export default function profileWhenVisited(props){

    const {profilePic}=props

    return (
        <View style={styles.container}>
            <ProfilePicture
                profilePic={profilePic}
            />

            <Pictures/>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        width:width,
        height:height,
    },
    picProfile:{},

})