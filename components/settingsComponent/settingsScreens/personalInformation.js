import React, { useState } from 'react';
import { StyleSheet, Text, View, BackHandler, ScrollView,Dimensions,TouchableOpacity, ViewBase,TextInput } from "react-native";
import colors from './../../../projectColor/colors'
import personalData from './../../../testData/personalData'

let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}
if(height<732){height=(732+height)/2}

  
    const bioChangedValue=(bioDAta,bioText)=>{
      if(bioDAta!=bioText&&bioText.length<51){
        //save the new value in data base
        console.log('the bio value  changed with the new value',bioText);
      }

    }
    const lenghthBio=(bioText)=>{
   
      if(bioText.length>50) return false
      else return true
    }

    export default function personalInformation() {
      const bioDAta=personalData.bio
      const[bioText,setBioText] =useState(bioDAta)

       
    BackHandler.addEventListener('hardwareBackPress',()=>{
      setBioText(bioText)
    })
  

      return (
        <ScrollView style={styles.container}>
          <Text style={styles.titleText}>First Name</Text>
          <Text style={styles.ValueText}>{personalData.first_name}</Text>
          <Text style={styles.titleText}>Last Name</Text>
          <Text style={styles.ValueText}>{personalData.last_name}</Text>
          <Text style={styles.titleText}>Birthday</Text>
          <Text style={styles.ValueText}>{personalData.birthday}</Text>
          <Text style={styles.titleText}>Bio</Text>
          <TextInput style={styles.bioInput}
            value={bioText}
            onChangeText={setBioText}
            numberOfLines={2}
          />
          <TouchableOpacity style={styles.saveButton}
            onPress={()=>bioChangedValue(bioDAta,bioText)}
          >
            <Text style={styles.buttonTex}>Save</Text>
          </TouchableOpacity>

          {!lenghthBio(bioText)
          ?<View style={styles.errorView}>
            <Text style={styles.textError}>bio Max 50 char</Text>
          </View>
          :null}
        </ScrollView>
      );
    }

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height,
        marginLeft:width/18
    },
    titleText:{
      fontSize:height/38,
      marginTop:height/40,
      fontWeight:'400',
    },
    ValueText:{
      fontSize:height/45,
      marginTop:height/300,
      marginLeft:width/100,
      fontWeight:'300',
    },
    bioInput:{
     // backgroundColor:'red',
      height:height/15,
      width:width/1.2,
      backgroundColor:'#d7d7d7',
      borderRadius:width/30
    },
    saveButton:{
      width:width/3.5,
      height:height/25,
      backgroundColor:colors.baseColor,
      marginTop:height/20,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:width/35
    
    },
    buttonTex:{
      fontSize:height/40,
      color:'white',
      fontWeight:'500',
    },
    errorView:{
      //position:'absolute',
      backgroundColor:'red',
      width:width/1.8,
      height:height/20,
      alignItems:'center',
      justifyContent: 'center',
      borderRadius:width/30,
      alignSelf:'center',
      marginTop:height/14,
      opacity:0.8,
      zIndex:30
      
    },
    textError:{
      color :'#fff',
    },

});



