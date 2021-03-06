import React,{useState} from "react";
import { StyleSheet, Text, View, Image, ScrollView,Dimensions, SafeAreaView} from "react-native";
import Location from './../components/settingsComponent/locationComponent'
import DistanceSlider from './../components/settingsComponent/distanceComponent'
import ShowMe from './../components/settingsComponent/showMeComponent'
import AgeSliderRang from './../components/settingsComponent/ageRang'
import Separator from './../components/settingsComponent/separator'
import VipItem from './../components/settingsComponent/vipAccountItem'
import ChangePassword from './../components/settingsComponent/changePasswordComponent'
import PersonalInformation from '../components/settingsComponent/personalInformationComponent'
import AboutBzom from './../components/settingsComponent/aboutBzom'

let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}
if(height<600){height=(800+height)/2}
if(height<732){height=(732+height)/2}

export default function settings() {


  
    
    return (
        <ScrollView style={styles.container}>
           
            <Location/>
            <DistanceSlider/>
            <ShowMe/>
            <AgeSliderRang/>
            <Separator/>
            <VipItem/>
            <ChangePassword/>
            <PersonalInformation/>
            <AboutBzom/>
        </ScrollView>
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