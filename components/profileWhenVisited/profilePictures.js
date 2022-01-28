import React,{useEffect,useState} from "react";
import {Text, View, Image, StyleSheet,Dimensions,ScrollView,TouchableOpacity } from "react-native";

import dimension from  './../../screenSizes/screenOfSizes'
import usedMethodes from '../../usedMethods/usedMethods'
/*
let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
*/
//if(height>732){height=(732+height)/2}


let width =dimension.width
let height=dimension.height


export default function pictureProfileVisited(props){

    const {profilePic,nameProfile,bio}=props

    return (
        <View style={styles.container}>
            <View style={styles.profilePicSendMessageContainer}>
                <Image
                    style={styles.picProfile}
                    source={{uri:profilePic}}
                />
                <TouchableOpacity
                    style={styles.sendMessageButton}
                    onPress={()=>console.warn('hhhh')}
                >

                    <Image
                        style={styles.sendMessageIcon}
                        source={require('./profileVisitedIcons/sendmessage.png')}
                        tintColor={'white'}
                    />
                </TouchableOpacity>
            </View>
            
            
             <Text style={styles.nameText}>{nameProfile}</Text>
             <Image style={styles.positionIcon}
                source={require('./profileVisitedIcons/position.png')}
                tintColor={'white'}
             />
             <Text style={styles.positionText}>Italy</Text>
             <ScrollView style={styles.bioContainer}>
                <Text style={styles.bioText}>{bio} </Text>
             </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        width:width,
        height:height/4.3,
        backgroundColor:'#ff6d62'
    },
    profilePicSendMessageContainer:{
        flexDirection:'row'
    },
    picProfile:{
        backgroundColor:'green',
        width:usedMethodes.circleObject(6),
        height:usedMethodes.circleObject(6),
        borderRadius:width,
        //alignSelf:'center',
        marginTop:height/60,
        marginLeft:width/30,
       borderWidth:width/200,
       borderColor:'white'
        
    },
    sendMessageButton:{
        width:width/12,
        height:width/12,
        marginLeft:width/1.5,
        marginTop:height/50,
  
    },
    sendMessageIcon:{
        //position:'absolute',
        //marginLeft:width/1.15,
       // marginTop:height/50,
        width:width/12,
        height:width/12,
    },
    nameText:{
       
        marginTop:height/60,
        color:'white',
        fontSize:height/50,
        fontWeight:'600',
        position:"absolute",
        marginLeft:width/4.5
     
    },
    positionIcon:{
        width:width/18,
        height:height/36,
        marginTop:height/22,
        color:'white',
        fontSize:height/55,
       
        position:"absolute",
        marginLeft:width/4.5
    },
    positionText:{
        position:'absolute',
        fontSize:height/55,
        fontStyle:'italic',
        marginLeft:width/3.4,
        marginTop:height/22,
        color:'white'
    },
    bioContainer:{

       // maxWidth:width/1.1,
       position:'absolute',
        //alignSelf:'center',
        marginTop:height/9,
        width:width/1.2,
        height:height/12,
        marginLeft:width/25,
    },
    bioText:{
        color:'white',
        fontSize:height/60,
        fontWeight:'300',
       
       

    }

})