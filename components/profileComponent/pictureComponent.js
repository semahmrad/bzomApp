import React,{useEffect,useState} from "react";
import { ImageBackground, Text, View, Image, TouchableOpacity,Dimensions } from "react-native";

import styles from './profileStyles/profilePicStyle.js'
import ButtonPickerProfilePicture from './profilePicturePickerButtons'

import dimension from '../../screenSizes/screenOfSizes'
let width =dimension.width
let height=dimension.heightWhenNavBar


export default function Picture(props){
    const {imgSrc,userName,bio,buttonVisibilty,setButtonVisibilty,imagePath,setImagePath}=props
    //const [imagePath,setImagePath]=useState(imgSrc)
 

    return (
        <View style={styles.container}>

            <ButtonPickerProfilePicture
                setButtonVisibilty={setButtonVisibilty}
                buttonVisibilty={buttonVisibilty}
                setImagePath={setImagePath}
            />
            
                <Image
                    style={styles.imageStyles}
                    source={{uri:imagePath}}
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
