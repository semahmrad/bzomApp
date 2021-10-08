import React,{useState} from "react";
import { StyleSheet, Text, View, Image, ScrollView,Dimensions, } from "react-native";
import Location from './../components/settingsComponent/locationComponent'
import DistanceSlider from './../components/settingsComponent/distanceComponent'
import ShowMe from './../components/settingsComponent/showMeComponent'
import AgeSliderRang from './../components/settingsComponent/ageRang'
import Separator from './../components/settingsComponent/separator'
import VipItem from './../components/settingsComponent/vipAccountItem'

let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}

export default function settings() {


  
    
    return (
        <View style={styles.container}>
           
            <Location/>
            <DistanceSlider/>
            <ShowMe/>
            <AgeSliderRang/>
            <Separator/>
            <VipItem/>



            
          
        </View>
    );
}

const styles = StyleSheet.create({
    container:{},
    firstTitle:{
     color :'red',
     fontSize:width/22,
     marginLeft:width/20,
     marginTop:width/30,
     
    },
   
});