import React,{useEffect} from "react";
import { StyleSheet, Text, View, Image, ScrollView,Dimensions } from "react-native";

let width =Dimensions.get("window").width
let height=Dimensions.get("window").height


export default function matchesAndPicNbr(props){
    const {matches,nbrPictures}=props
   
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style ={styles.matchesAndPicText}>Matches</Text>
                <Text style ={styles.matchesAndPicText}>Pictures</Text>
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