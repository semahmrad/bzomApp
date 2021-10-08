import React,{useEffect} from "react";
import { StyleSheet, Text, View, Image, ScrollView,Dimensions } from "react-native";

import GetLocation from 'react-native-get-location'
import Geocoder from 'react-native-geocoding';

let width =Dimensions.get("window").width
let height=Dimensions.get("window").height

export default function Location() {
    Geocoder.init("AIzaSyAX8NZ3Tjhtesvy16l6-JLa4QhrxwcwbAo"); // use a valid API key

    const getLargAndLat=()=>{
        
    }
    const getAdressFromLargLat=()=>{
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
          
        })
        .then(location => {
           // console.log('location',location);
            Geocoder.from(location.altitude, location.latitude)
            .then(json => {
                console.log('console.log(addressComponent)==>',addressComponent);
                    return addressComponent = json.results[0].address_components[0];
                
            })
            .catch(error => console.warn('a==>',error));
        })
        .catch(error => {
            const { code, message } = error;
            console.warn('code, message');
        })
    
    }

   

    return (
        <View style={styles.container}>

            <Text style={styles.locationText}>Location</Text>
            <Text style={styles.location}>{getAdressFromLargLat()}</Text>

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