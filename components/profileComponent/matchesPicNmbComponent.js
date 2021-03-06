import React,{useEffect} from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity,Dimensions } from "react-native";

import dimension from '../../screenSizes/screenOfSizes'
let width =dimension.width
let height=dimension.heightWhenNavBar


export default function matchesAndPicNbr(props){
    const {matches,nbrPictures,setEditGalaryVisibility}=props
   
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style ={styles.matchesAndPicText}>Matches</Text>
                <TouchableOpacity
                    onPress={()=>setEditGalaryVisibility(true)}
                >
                    <View style={styles.picturesContainer}>
                        {/*<Image 
                            style={styles.editPicture}
                            source={require('./profileComponentIcons/editProfilePic.png')}
                        />*/}
                        <Text style ={styles.matchesAndPicText}>Pictures</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.separtor}></View>
            <View style={styles.valuesContainer}>
            <Text style ={styles.matchesAndPicValue}>{matches}</Text>
            <Text style ={styles.matchesAndPicValue}>{nbrPictures}</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{

        width:width/1.5,
        height:height/10,
        alignSelf:'center',
            
    },
    textContainer:{

        flexDirection:'row',
        
      
    },
    matchesAndPicText:{
        fontSize:height/42,
        width:width/3,
        textAlign:'center',
        fontWeight:'300',
        color:'#1a0dae'

    },
    picturesContainer:{
        flexDirection:'row',
        justifyContent: 'center',

    },
    editPicture:{
        width:width/18,
        height:width/18,
        //backgroundColor:'red',
        marginRight:-width/15,
        marginLeft:width/50,
        marginTop:height/500
    },

  
    separtor:{
        backgroundColor:'#777777',
        position:'absolute',
        width:width/100,
        height:height/15,
        marginLeft:width/3.05,
        marginTop:height/90
    },
    valuesContainer:{
        flexDirection:'row',
    },

    matchesAndPicValue:{
        fontSize:height/42,
        width:width/3,
        textAlign:'center',
        marginTop:width/30,
        
    },


})