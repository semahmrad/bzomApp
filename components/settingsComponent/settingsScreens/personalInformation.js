import React, { memo } from 'react';
import { StyleSheet, Text, View, Image, ScrollView,Dimensions,TouchableOpacity, ViewBase } from "react-native";


let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}

    const NeuMorphTextView=({children,size,style})=>{

   
        return (
        
              <View style={styles.topShadow}>
                <View style={styles.buttomShodow}>
                  <View style={styles.inner}>
                      {children}
                  </View>
              </View>
           
          </View>
        
        )
    }

    export default function personalInformation() {

  
      return (
        <View style={styles.container}>

       

      
          

        </View>
      );
    }

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height,
        backgroundColor:'white',
        
      
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



