import React,{useEffect, useState,} from 'react';
import { StyleSheet, Text, View, Image, Button,Dimensions,TouchableOpacity, ViewBase,TextInput } from "react-native";
import dimension from '../screenSizes/screenOfSizes'

import { measureConnectionSpeed } from 'react-native-network-bandwith-speed';
import Modal from "react-native-modal";
import { white } from 'react-native-paper/lib/typescript/styles/colors';

let width =dimension.width
let height=dimension.heightWhenNavBar





export default function modelOffLine(props) {

    const{setTryAgain,tryAgain}=props;
  return (

    <View style={styles.container}>
      
        <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Connection Error</Text>
            <Text style={styles.modalText}>
                Oops! Looks like your device is not connected to the internet
            </Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={async()=>setTryAgain(tryAgain+1)}>
                <Text style={styles.buttonText}>Try Again</Text>
            </TouchableOpacity>
        </View>
    </View>

    
  );
}

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        zIndex:20,
        backgroundColor:'white',
        width:width,
        height:height,
        opacity:0.97
      
    },
    modalContainer:{
        width:width,
        height:height/4.5,
        alignItems:'center',
        borderWidth:1,
        borderRadius:width/50,  
        marginTop:(height-height/4.5)/2,
        opacity:1
    },
    modalTitle:{
        fontSize: height/35,
        fontWeight: '600',
    },
    modalText:{
        fontSize: height/40,
        color: '#555',
        marginBottom: height/70,
        textAlign: 'center',
        marginBottom: height/70,
    },
    button:{
        width:width/1.3,
        backgroundColor:'red',
        height:height/20,
        borderRadius:width/50,
        alignItems:'center',
        justifyContent:'center',
        marginTop:height/70,
    },
    buttonText:{
        color:'white',
        fontSize:height/50,
    }
});