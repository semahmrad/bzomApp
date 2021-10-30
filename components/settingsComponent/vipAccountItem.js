import React, { memo } from 'react';
import { StyleSheet, Text, View, Image, ScrollView,Dimensions,TouchableOpacity } from "react-native";

import ModalSelector from 'react-native-modal-selector'
let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}

export default memo(

    function VipItem() {
      return (
        <View>
            <TouchableOpacity style={styles.container}>
                <View style={styles.contentsContainer}>
                    <Text style={styles.vipAccount}>VIP ACCOUNT</Text>
                    <View style={styles.optionContainer}>
                        <Image
                            style={styles.vipIcon}
                            source={require('./settingsIcons/vip.png')}
                        />
                        <Text style={styles.purchase}>Purchase Vip Account</Text>
                    </View>
                </View>

            </TouchableOpacity>
        </View>
         

      );
    }


  );
const styles = StyleSheet.create({
    container:{
        //backgroundColor:'red',
        width:width,
        height:height/12,
       

    },
    contentsContainer:{
        marginLeft:width/20,
        marginTop:height/55,
        marginBottom:height/45,
    },
    vipAccount:{
        color :'white',
        backgroundColor:'#FFD700',
        fontSize:height/50,
        width:width/3,
        textAlign:'center',
        fontWeight:'bold'
    },
    optionContainer:{
        flexDirection:'row',
        marginTop:height/70,
    },
    vipIcon:{
        width:width/12,
        height:height/26,
        tintColor:'#00c4ff',
      
    },
    purchase:{
        fontSize:height/50,
        marginTop:height/200,
        marginLeft:width/50,
        color:'#0040d3',
      
    },
    separator:{
        backgroundColor:'#c5c5c5',
        height:height/500,
        width:width,
 
    },

  
});



