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
                       
                    
                       <LinearGradient colors={['#18191a4a', '#000000ab', 'black']}style={styles.cardTexetStyle}>
                 
                            <Text style={styles.name}>{user.name}</Text>
                            <Text style={styles.bio}>{user.bio}</Text>
     
                        </LinearGradient>
                
                       
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
        height:height/1.4,
        overflow:"hidden",
        borderRadius:width/30,
        borderWidth:width/150,
        borderColor:"#131d23",
        //marginTop:width/30,
        justifyContent:"flex-end",
        //position:"absolute",
        resizeMode: 'cover'
    },
  
    cardTexetStyle:{
        paddingLeft:width/60,
        backgroundColor:"#fff",
        opacity:0.7,
        height:height/11
        
        //borderTopLeftRadius:width/15,
        //borderTopRightRadius:width/15,
      
    },
    name:{
        fontStyle:'italic',
        fontSize:width/18,
        color:"white",
        //marginLeft:width/45,
    },
    bio:{
        //marginLeft:width/45,
        fontSize:width/29,
        //fontWeight:'500',
        color:"white",
        marginBottom:width/80,
        
    },

  });