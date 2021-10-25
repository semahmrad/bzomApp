import React, { memo } from 'react';
import { StyleSheet, Text, View, Image, ScrollView,Dimensions } from "react-native";
import ModalSelector from 'react-native-modal-selector'

let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}

export default memo(

    function separator() {
      return (
        <View style={styles.separator}></View>


      );
    }


  );
const styles = StyleSheet.create({
    separator:{
        backgroundColor:'#c5c5c5',
        height:height/500,
        width:width,
        marginTop:height/50
    },

  
});



