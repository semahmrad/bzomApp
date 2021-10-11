import React,{useEffect,useState} from "react";
import {Text, View, Image, StyleSheet,Dimensions } from "react-native";


let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}

export default function pictureProfileVisited(props){

    const {profilePic,nameProfile}=props

    return (
        <View style={styles.container}>
            <Image
                style={styles.picProfile}
                source={{uri:profilePic}}
            />
             <Text style={styles.nameText}>Name Profile</Text>
             <View style={styles.bioContainer}>
                <Text style={styles.bioText}>hi my name is semah and i am developper </Text>
             </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        width:width,
        height:height/4,
        backgroundColor:'#ff7100'
    },
    picProfile:{
        backgroundColor:'green',
        width:width/4.5,
        height:width/4.5,
        borderRadius:width,
        alignSelf:'center',
        marginTop:height/60,
       borderWidth:width/200,
       borderColor:'white'
        
    },
    nameText:{
        alignSelf:'center',
        marginTop:height/60,
        color:'white',
        fontSize:height/40,
        fontWeight:'500',
     
    },
    bioContainer:{

        maxWidth:width/1.1,
        alignSelf:'center',
        marginTop:height/150,

       

    },
    bioText:{
        color:'white',
        fontSize:height/60,
        fontWeight:'300'

    }

})