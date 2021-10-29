import React, { memo } from 'react';
import { StyleSheet, Text, View, Image, ScrollView,Dimensions,TouchableOpacity } from "react-native";

import ModalSelector from 'react-native-modal-selector'
let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}



    export default function personalInformation() {
      return (
        <View style={styles.container}>
        
        </View>
         

      );
    }

const styles = StyleSheet.create({
    container:{
        backgroundColor:'red',
        width:width,
        height:height,
    },
 
  
});



