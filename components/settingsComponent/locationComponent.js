import React,{useEffect} from "react";
import { StyleSheet, Text, View, Image, ScrollView,Dimensions } from "react-native";
import Geocoder from 'react-native-geocoding';
import GetLocation from 'react-native-get-location'

let width =Dimensions.get("window").width
let height=Dimensions.get("window").height

export default function Location() {

    const getPosition=()=>{
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
          
        })
        .then(location => {
            console.log('location',location);
            return location
        })
        .catch(error => {
            const { code, message } = error;
            console.warn('code, message');
        })
    }

    useEffect(()=>{
       
    },[]);

    return (
        <View style={styles.container}>

            <Text style={styles.locationText}>Location</Text>
            <Text style={styles.location}>{getPosition()}</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginLeft:width/20,
        width:width/1.1,
        flexDirection:'row',
        //justifyContent:'space-around',
        marginTop:width/25,
        //backgroundColor:'red'
    },

    locationText:{
        fontSize:width/23,
        //backgroundColor:'green',
        width:width/2.8,
        fontWeight:'bold'

    },

    location:{
        //backgroundColor:'pink',
        width:width/1.81,
        textAlign:'right',
        padding:width/90,

    },
   
});