import React, { memo } from 'react';
import { StyleSheet, Text, View, Image, ScrollView,Dimensions,TouchableOpacity, ViewBase } from "react-native";
import CardVip from './components/cardVip'
import colors from './../../projectColor/colors'
let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}


    export default function vip() {

  
      return (
        <View style={styles.container}>
            <CardVip/>

        </View>
      );
    }

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height,
        backgroundColor:'#ebebeb',
        
      
    },

  
});



