import React,{useEffect,useState} from "react";
import { StyleSheet, Text, View, Image, Modal,Dimensions,TouchableOpacity } from "react-native";



import dimension from '../../screenSizes/screenOfSizes'
let width =dimension.width
let height=dimension.heightWhenNavBar

export default function Picture(props){
    //const [popupVisibility,setPopupVisibility]=useState(false)
    const {setButtonVisibilty,buttonVisibilty}=props

    return (
        <View style={styles.container}>
            <TouchableOpacity

               onPress={()=>setButtonVisibilty(!buttonVisibilty)} 
       
                style={styles.editProfilePicButton}
            >
                <Image 
                    source={require("./profileComponentIcons/editProfilePic.png")}
                    style={styles.editPicButtonIcon}
                />
            </TouchableOpacity>

      
      
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
      

    },
    editProfilePicButton:{
        width:width/12,
        height:width/12,
        position:'absolute',
        marginTop:height/20,
        marginLeft:width/1.7,
        fontWeight:'bold',
       backgroundColor:'white',
        borderRadius:width/2,
        alignItems:'center',
        alignContent:'center',
        zIndex:10,

    },
    editPicButtonIcon:{
        width:width/14,
        height:width/14,
        tintColor:'#ff7100',
        alignSelf:'center'
    },
 
  
})