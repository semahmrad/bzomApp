import React,{useEffect,useState} from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity,Dimensions } from "react-native";





import sizes from  '../../screenSizes/screenOfSizes'
let width =sizes.width
let height=sizes.height

export default function spaceCloseButtonImagePicker(props){

    
    const{setButtonVisibilty,buttonVisibilty}=props
   

    return (
        <View> 
        {buttonVisibilty?
            <TouchableOpacity 
                style={styles.container}
                onPress={()=>setButtonVisibilty(false)}    
            >
               

            </TouchableOpacity>
            : null
            }
         </View>
    );
}
const styles = StyleSheet.create({
    container:{
        width:width,
        height:(height/1.55),
        flex:2,
        backgroundColor:'red',
        position:'absolute',
        opacity:0.3,
        zIndex:11
    },
    
 
})
