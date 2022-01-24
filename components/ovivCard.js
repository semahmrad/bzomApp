import React, { useState } from 'react'
import { View, Text, Dimensions,StyleSheet ,ScrollView, ImageBackground,Image} from 'react-native'



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
                       
         
                    </ImageBackground >
                    <View style={styles.textCardContainer}>
                        <ScrollView>
                            <Text style={styles.name}>{user.name}</Text>
                            <Text numberOfLines={3} style={styles.bio}>{user.bio}</Text>
                        </ScrollView>
                     </View>
                </View>
                
            </View>
       
     );
 }


const styles = StyleSheet.create({

    card:{
        flex:1,
        width:width/1.05,
        height:height/1.32,
        alignSelf:"center",
        alignItems:"center",
        borderRadius:width/57,
        resizeMode:'contain',
        position:'absolute',
        marginTop:height/30,
        backgroundColor:'white',
        //borderWidth:3,
        //borderColor:'#f1491f',
        borderRadius:width/20,
    
    },
    userPicStyle:{
        //flex:0.97,
        width:width/1.06,
        height:height/1.9,
        overflow:"hidden",
        borderRadius:width/20,
        borderWidth:width/150,
        borderColor:"#131d23",
        //marginTop:height/65,
        justifyContent:"flex-end",
        //position:"absolute",
        resizeMode: 'cover'
    },

    textCardContainer:{
       
        height:height/6.5,
        width:width/1.1,
        marginTop:height/100,
        //backgroundColor:'red',
       // borderWidth:1,
       

    },
    name:{
        fontStyle:'italic',
        fontSize:width/20,
        color:'black',
        fontWeight:'600',
  

        //marginLeft:width/45,
    },
    bio:{
        fontSize:width/27,
        color:'black',
        fontWeight:'400',
      

    },

  });