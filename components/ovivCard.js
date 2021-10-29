import React, { useState } from 'react'
import { View, Text, Dimensions,StyleSheet , ImageBackground,Image} from 'react-native'

import LinearGradient from 'react-native-linear-gradient';

//import LinearGradient from 'react-native-linear-gradient'
 let width =Dimensions.get("window").width
 let height=Dimensions.get("window").height
 if(height>732){height=(732+height)/2}

 export default function login(props) {
     
     const {user}=props;
     return(
      
            <View style={styles.container}>
                <View style={styles.card}>
                    <ImageBackground 
                    
                        source={{uri:user.image}} style={styles.userPicStyle} 
                        resizeMode="stretch"
                    >
                       
                    
                    <View style={styles.textCardContainer}>
                            <Text style={styles.name}>{user.name}</Text>
                            <Text style={styles.bio}>{user.bio}</Text>
                    </View>
                      
                        
                
                       
                    </ImageBackground >
                </View>
                
            </View>
       
     );
 }


const styles = StyleSheet.create({
  
    card:{
        flex:1,
        //width:width/1.02,
        //height:height/1.4,
        alignSelf:"center",
        alignItems:"center",
        borderRadius:width/30,
        resizeMode:'contain',
        position:'absolute',
        marginBottom:height,
    
    },
    userPicStyle:{
        flex:0.97,
        width:width/1.01,
        height:height/1.3,
        overflow:"hidden",
        borderRadius:width/30,
        borderWidth:width/150,
        borderColor:"#131d23",
        marginTop:height/65,
        justifyContent:"flex-end",
        //position:"absolute",
        resizeMode: 'cover'
    },
  
    cardTexetStyle:{
        position:'absolute',
    },
    textCardContainer:{
        //position:'absolute',
        marginBottom:height/10,
        marginLeft:width/25

    },
    name:{
        fontStyle:'italic',
        fontSize:width/15,
        color:'white',
        //marginLeft:width/45,
    },
    bio:{
        fontSize:width/27,
        color:'white',

    },

  });