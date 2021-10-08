import React,{useState,useEffect,useCallback} from 'react';
import { StyleSheet, TextInput, View,Text,Dimensions, Image, TouchableOpacity } from 'react-native';
import {withSpring} from 'react-native-reanimated'

let width =Dimensions.get("window").width
let height=Dimensions.get("window").height;
if(height>732){height=(732+height)/2}

const findMsgSender=(partnair,message)=>{
    if(message.is_emiteur=="me"){return "You"}
    else{return partnair.name}
}

const renderColor=(partnair,message)=>{
    
    if(findMsgSender(partnair,message)=='You'){return '#15ea25'}
    else{return'red'}
}

const sendedAtRende=(sendedAt,message)=>{
    if(sendedAt){
        return(<Text style={styles.dateTime}>{message.sended_at}</Text>)
    }
    else return null
}

export default function bubbleChat (props){
    
    const {message,partnair,sendedDateTime}=props;
    const [sendedAt,setSendedAt]=useState(false)
    
    
    
    
    return(
        <View style={styles.container}>
            
            {sendedAtRende(sendedAt,message)}
            
            
            <Text style={styles.senderName}>{findMsgSender(partnair,message)}</Text>
            <View style={{flexDirection:'row'}}>
                <View style={{width:5 ,backgroundColor:renderColor(partnair,message)}}></View>
                
                <TouchableOpacity 
                    style={styles.textContainer}
                   /* onPress={()=>{
                        setSendedAt(!sendedAt)

                    }}*/
                    onPressIn={()=>setSendedAt(!sendedAt)}
                    onPressOut={()=>setTimeout(()=>{
                        setSendedAt(false)
                    },1000)}
                >
                        
                    <Text style={styles.text}>
                        {message.content}
                    </Text>
                </TouchableOpacity>
            </View>
                   
            </View>
  
      

       
    );
}

const styles=StyleSheet.create({

    container:{
        marginTop:10,
    },
    dateTime:{
        alignSelf:'center',
        color:'#6d6d6d',
        fontSize:width/33,
        fontWeight:'bold',
    },
    senderName:{
        fontWeight:'bold', 
        fontFamily: 'AbrilFatface-Regular',
        fontSize:width/23
    },
    textContainer:{
        backgroundColor:'#d3d5d6',
       // borderWidth:2,
      
        padding:5,
        alignSelf:'flex-start',
        width:width/1.05,
        borderRadius:width/90
    },
    text:{
        fontSize:15,
        color:'black',
        //alignSelf:'center',
        //backgroundColor:'red'
        
    },

    

})