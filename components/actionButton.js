import React, { useState } from 'react'
import { View, Dimensions,StyleSheet,Text,Image,TouchableOpacity } from 'react-native'
import { LinearGradient, RadialGradient } from 'rn-gradients';
//#f1491f
 let width =Dimensions.get("window").width
 let height =Dimensions.get("window").height
 if(height>732){height=(732+height)/2}

 const buttonStyleFuction=(buttonStyleState)=>{
 
     if(buttonStyleState>30){

        return {
            //like
            backgroundColorLike:'#3bf7be',
            tintColorLike:'white',
            opacityBackgroundLike:(buttonStyleState/500),
            opacityTintColorLike:1,
            //dislike
            backgroundColorDislike:'#080808a6',
            tintColorDislike:'#bfbfbf',
            opacityBackgroundDislike:1,
            opacityTintColorDislike:1,
            }
            
     }
     else if(buttonStyleState<-30){
        return {
            //like
            backgroundColorLike:'#080808a6',
            tintColorLike:'#3bf7be',
            opacityBackgroundLike:1,
            opacityTintColorLike:1,
            //dislike
            backgroundColorDislike:'#bfbfbf',
            tintColorDislike:'white',
            opacityBackgroundDislike:buttonStyleState/200,
            opacityTintColorDislike:1-(buttonStyleState/200),
            }
     }
     else {
         return {
            backgroundColorLike:'#080808a6',
            tintColorLike:'#3bf7be',
            backgroundColorDislike:'#080808a6',
            tintColorDislike:'#bfbfbf',
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
                <TouchableOpacity style={{...styles.buttonIconDisLike,borderColor:"#bfbfbf",backgroundColor:buttonStyleFuction(buttonStyleState).backgroundColorDislike,}} 
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
                            width:width/17,
                            height:width/17,
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
                            width:width/16,
                            height:width/16,
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
        padding:width/18,
        position:'absolute',
        marginTop:height/1.27,
        alignSelf:'center'

        
    },
    buttonIconLike:{
       
        
        borderRadius:width/25,
        padding:width/40,
        justifyContent:"center",
        alignItems:"center",
        borderWidth:width/300,
        marginLeft:width/5,
        height:height/24.5,
        width:width/6,
        
    },
    buttonIconDisLike:{
       
        borderRadius:width/25,
        padding:width/40,
        justifyContent:"center",
        alignItems:"center",
        borderWidth:width/300,
        height:height/24.5,
        width:width/6,
      
        
    },
    undoIcon:{
        borderRadius:width/35,
        width:width/7,
        height:height/25,
        backgroundColor:'#080808a6',
        padding:width/90,
        justifyContent:"center",
        alignItems:"center",
        borderWidth:width/300,
        marginLeft:width/5
    },
  });