import React, { useState } from 'react'
import { View, Dimensions,StyleSheet,Text,Image,TouchableOpacity } from 'react-native'
import { LinearGradient, RadialGradient } from 'rn-gradients';

 let width =Dimensions.get("window").width
 let height =Dimensions.get("window").height
 
 const buttonStyleFuction=(buttonStyleState)=>{
 
     if(buttonStyleState>30){

        return {
            //like
            backgroundColorLike:'#3bf7be',
            tintColorLike:'white',
            opacityBackgroundLike:(buttonStyleState/500),
            opacityTintColorLike:1,
            //dislike
            backgroundColorDislike:'white',
            tintColorDislike:'#ff6266',
            opacityBackgroundDislike:1,
            opacityTintColorDislike:1,
            }
            
     }
     else if(buttonStyleState<-30){
        return {
            //like
            backgroundColorLike:'white',
            tintColorLike:'#3bf7be',
            opacityBackgroundLike:1,
            opacityTintColorLike:1,
            //dislike
            backgroundColorDislike:'#ff6266',
            tintColorDislike:'white',
            opacityBackgroundDislike:buttonStyleState/200,
            opacityTintColorDislike:1-(buttonStyleState/200),
            }
     }
     else {
         return {
            backgroundColorLike:'white',
            tintColorLike:'#3bf7be',
            backgroundColorDislike:'white',
            tintColorDislike:'#ff6266',
            //like
            opacityBackgroundLike:1,
            opacityTintColorLike:1,
            //dislike
            opacityBackgroundDislike:1,
            opacityTintColorDislike:1,
            }
     }
    

 }

 export default function reactionButton(props) {
     const {swipeRef,buttonStyleState}=props;

    const [color,setColor]=useState("#01c9e3");
    console.log('buttonStyleState==>',buttonStyleState)

    

     return(
    
           

            <View style={styles.iconsReact}>
                <TouchableOpacity style={{...styles.buttonIconDisLike,borderColor:"#ff6266",backgroundColor:buttonStyleFuction(buttonStyleState).backgroundColorDislike,}} 
                onPress={()=>{swipeRef.current.swipeLeft()}}>
                    <Image 
                        source={require("./../reactIcons/cross.png")}
                        resizeMode="contain"
                        //tintColor={color}
                        
                        onPress
                       /** style={{
                            width:width/9,
                            height:width/9,
                            tintColor:"#ff6266"
                        }}*/
                        style={{
                            width:width/14,
                            height:width/14,
                            tintColor:buttonStyleFuction(buttonStyleState).tintColorDislike,
                            
                            
                        }}
                    />
                </TouchableOpacity>

                    
                <TouchableOpacity style={{...styles.undoIcon,borderColor:"#ffc06a"}} 
                    onPress={()=>{swipeRef.current.swipeBack()}}
               >
                    <Image 
                        source={require("./../reactIcons/undo.png")}
                        resizeMode="contain"
                        //tintColor={color}
                        tintColor={"#ffc06a"}
                        onPress
                        style={{
                            width:width/15,
                            height:width/15,
                        }}
                    />
                </TouchableOpacity>    
               

                <TouchableOpacity style={{...styles.buttonIconLike,borderColor:"#3bf7be",backgroundColor:buttonStyleFuction(buttonStyleState).backgroundColorLike,}} 
                onPress={()=>{swipeRef.current.swipeRight()
                    console.warn("on swipe right")}}>
                    <Image 
                        source={require("./../reactIcons/like.png")}
                        resizeMode="contain"
                        //tintColor={color}
                        //tintColor={"#3bf7be"}
                        onPress
                      /*  style={{
                            width:width/8,
                            height:width/8,
                            tintColor:'#3bf7be',
                          
                        }}*/
                        style={{
                            width:width/14,
                            height:width/14,
                            //tintColor:'#3bf7be',
                            tintColor: buttonStyleFuction(buttonStyleState).tintColorLike,
                           
                        }}

                    />
                </TouchableOpacity>

               
            </View>
     );
 }


const styles = StyleSheet.create({
   
    //react style
    iconsReact:{
        flexDirection:'row',
        justifyContent:"space-around",
        padding:width/18,
        marginBottom:width/25
        
    },
    buttonIconLike:{
       
        
        borderRadius:width/9,
        padding:width/40,
        justifyContent:"center",
        alignItems:"center",
        borderWidth:width/300,
        width:width/7,
        height:height/14
        
    },
    buttonIconDisLike:{
       
        backgroundColor:'white',
        borderRadius:width/9,
        padding:width/40,
        justifyContent:"center",
        alignItems:"center",
        borderWidth:width/300,
        width:width/7,
        height:height/14
        
    },
    undoIcon:{
        borderRadius:50,
        width:width/8.5,
        height:height/17,
        backgroundColor:'white',
        padding:width/90,
        justifyContent:"center",
        alignItems:"center",
        borderWidth:width/300,
    },
  });