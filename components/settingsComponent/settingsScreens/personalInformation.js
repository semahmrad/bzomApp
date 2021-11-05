import React, { memo } from 'react';
import { StyleSheet, Text, View, Image, ScrollView,Dimensions,TouchableOpacity, ViewBase } from "react-native";

import Neumorphism from "react-native-neumorphism";
let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}


    export default function personalInformation() {

  
      return (
        <View style={styles.container}>

       
              <Neumorphism
                lightColor={'#ffffff'}
                darkColor={'#b9b4b4'}
                shapeType={'flat'}
                radius={50}
                style={{marginTop:20,borderWidth:2,borderRadius:50,borderColor:'#b9b4b4',width:100,alignItems: 'center'}}
                disabled={false}
                
              >
                
                  <Text>TEST</Text>
              
              </Neumorphism>

        </View>
      );
    }

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height,
        backgroundColor:'#ebebeb',
        
      
    },
    topShadow:{
      backgroundColor:'red',
   
      width:width/3,
      height:height/20,
      marginTop:20,
      alignSelf:'center',
      shadowColor: "#000",
     
      
      elevation: 20 ,
       
    },
 

 
  
});



