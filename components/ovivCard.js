import React, { useState } from 'react'
import { View, Text, Dimensions,StyleSheet ,ScrollView, TouchableOpacity,ImageBackground,Image} from 'react-native'
import { useNavigation } from '@react-navigation/native';



//import LinearGradient from 'react-native-linear-gradient'
 let width =Dimensions.get("window").width
 let height=Dimensions.get("window").height
 if(height>732){height=(732+height)/2}

 export default function login(props) {
    const navigation = useNavigation();
     const {user,profilePic,nameProfile,bio,pictures}=props;
     return(
      
            <View style={styles.container}>
                <View style={styles.card}>
                    <ImageBackground 
                    
                        source={{uri:user.image}} style={styles.userPicStyle} 
                        resizeMode="stretch"
                    >
                    <View style={styles.signStartAndPositionContainer}>
                        <Text style={styles.position}>In Italy</Text>
                        <Text style={styles.startSign}>Cancer</Text>
                    </View>
                     
         
                    </ImageBackground >
                    <View style={styles.textCardContainer}>
                       
                            <TouchableOpacity
                            
                            onPress={()=>{
                                navigation.navigate('profileWhenVisited',
                                {
                                    profilePic:profilePic,
                                    nameProfile:nameProfile,
                                    bio:bio,
                                    pictures:pictures
                                });
                            }}
                            >
                                <Text style={styles.name}>{user.name}</Text>
                            </TouchableOpacity>
                            <ScrollView>
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
        height:height/1.3,
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
        height:height/1.8,
        overflow:"hidden",
        borderRadius:width/20,
        borderWidth:width/150,
        borderColor:"#131d23",
        //marginTop:height/65,
        justifyContent:"flex-end",
        //position:"absolute",
        resizeMode: 'cover'
    },
    signStartAndPositionContainer:{
        flexDirection:'row',
        width:width/1.08,
        marginBottom:height/100,
        marginTop:height/150,
        //backgroundColor:'red',
        justifyContent:'space-between',
       
      
    },
    position:{
        color:'white',
        fontStyle:'italic',
        fontSize:height/45,
        fontWeight:'600',
        marginLeft:width/30
      

    },
    startSign:{
        color:'white',
        
        fontSize:height/45,
        fontWeight:'600',
        //marginLeft:width/1.6,
        maxWidth:width/4,
        marginRight:width/30,
        backgroundColor:'#0000009e',
        borderRadius:width/55
       
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
        color:'#1a0dab',
        fontWeight:'600',
  

        //marginLeft:width/45,
    },
    bio:{
        fontSize:width/27,
        color:'black',
        fontWeight:'400',
      

    },

  });