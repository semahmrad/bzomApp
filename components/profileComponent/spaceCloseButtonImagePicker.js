import React,{useEffect,useState} from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity,Dimensions } from "react-native";





let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}

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
        height:height/1.35,
        flex:2,
        backgroundColor:'black',
        position:'absolute',
        opacity:0.3,
        zIndex:11
    },
    
 
})
