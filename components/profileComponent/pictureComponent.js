import React,{useEffect,useState} from "react";
import { ImageBackground, Text, View, Image, TouchableOpacity,Dimensions } from "react-native";

import styles from './profileStyles/profilePicStyle.js'
import ButtonPickerProfilePicture from './profilePicturePickerButtons'

import dimension from '../../screenSizes/screenOfSizes'
let width =dimension.width
let height=dimension.heightWhenNavBar


export default function Picture(props){
    const {userName,bio,buttonVisibilty,setButtonVisibilty,imagePath,setImagePath}=props
    //const [imagePath,setImagePath]=useState(imgSrc)
    console.log("part of image ",imagePath.substr(1,12))

    return (
        <View style={styles.container}>

            <ButtonPickerProfilePicture
                setButtonVisibilty={setButtonVisibilty}
                buttonVisibilty={buttonVisibilty}
                setImagePath={setImagePath}
            />
            
                <Image
                    style={styles.imageStyles}
                    source={{uri:`data:image/jpeg;base64,${imagePath}`}}
                   // resizeMode='contain'
                />
       
       
            <View style={styles.nameContainer}>
                <Text style={styles.nameText}>{userName}</Text>
            </View>
            <View style={styles.bioContainer}>
                <Text style={styles.bioText}>{bio}</Text>
            </View>
        
        </View>
    );
}
