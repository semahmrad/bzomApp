import React,{useEffect,useState} from "react";
import { StyleSheet, Text, View, Image, Modal,Dimensions,TouchableOpacity } from "react-native";



let width =Dimensions.get("window").width
let height=Dimensions.get("window").height

export default function Picture(props){
    //const [popupVisibility,setPopupVisibility]=useState(false)
    const {setButtonVisibilty,buttonVisibilty}=props

    return (
        <View style={styles.container}>
            <TouchableOpacity

               onPress={()=>setButtonVisibilty(!buttonVisibilty)} 
             /*  onPress={()=>ImagePicker.openPicker({
                   freeStyleCropEnabled:true,
                    width: width/5,
                    height: width/5,
                    cropping: true
                  }).then(image => {
                    console.log(image);
                    setImagePath(image.path)
                  }).catch(e=>{console.warn(error)})}*/
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