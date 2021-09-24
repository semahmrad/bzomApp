import React,{useEffect, useState} from "react";
import { StyleSheet, Modal , View, Image, TouchableOpacity,Dimensions,text } from "react-native";
import ImageViewer from 'react-native-image-zoom-viewer';
import { useNavigation } from '@react-navigation/native';
let width =Dimensions.get("window").width
let height=Dimensions.get("window").height

const getArrauImageSource =(albumImg)=>{
    const imgesSource=[]
    albumImg.map(item=>{
        imgesSource.push(item.img_path)
    })
    console.log(imgesSource)
    return imgesSource
}
export default function imageDisplay({route,navigation}){
   // const navigation = useNavigation();
    const albumImg=route.params.albumImg;
    const index=route.params?.index;
    const [modalVisibility,setModalVisibility]=useState(true);
    console.log("index=====>",index)

    console.log("albumImg=====>",albumImg[index])

    useEffect(()=>{
        console.log("useEffect======>",modalVisibility)
        setModalVisibility(false)
    })

   // const {albumImg,indexPicPressed,visibility}=props
    //const[modalVisibility,setModelVisibility]=useState(visibility)
    return (
     
            <View style={styles.container}>
            
                       
                     <TouchableOpacity
                                style={styles.buttonCancel}
                                onPress={()=>{
                                    
                                    navigation.navigate('Profile')
                                }}
                            >
                                <Image 
                                    source={require('./profileComponentIcons/cancel.png')}
                                    style={styles.cancelButton}
                                />
                        </TouchableOpacity>
                         <ImageViewer 
                            imageUrls={
                                getArrauImageSource(albumImg).map(item=>{
                                    return   { url: item,}
                                })
                                }
                                index={index}
                                enableSwipeDown
                                useNativeDriver
                                enableModal={true}
                                enableVerticalExit
                                saveToLocalByLongPress={false}
                                onSwipeDown={()=>{navigation.navigate('Profile')}}
                                enablePreload={true}
                                style={{ zIndex: 2 ,position:'absolute',height:height/1.07,width:width}}
                            >
                 
                          </ImageViewer>
                          
                        
                          
                      
            </View>
           
    );
}

const styles = StyleSheet.create({
    container:{
        //backgroundColor:'red',
        width:width,
        height:height,
        //alignSelf:'center',
    
            
    },
   
    buttonCancel:{
        width:width/10,
        height:height/20,
        backgroundColor:'black',
        zIndex: 10,
        marginTop:height/50,
        marginLeft:width/40,
        alignItems:'center',
        justifyContent:'center',
    },
    cancelButton:{
        position:'absolute',
        tintColor:'white',
        height:height/25,
        width:width/13,
        //backgroundColor:'red',
        opacity:0.5,
        
    },


})