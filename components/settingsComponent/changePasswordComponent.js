import React,{} from "react";
import { StyleSheet, Text, View,Dimensions, TouchableOpacity,Image} from "react-native";
import { useNavigation } from '@react-navigation/native';

let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}

export default function changePassword() {
    //navigation
    const navigation = useNavigation();
   

    
    return (
        <View style={styles.container}>
            <View style={styles.separator}></View>
            <TouchableOpacity style={styles.buttonChangePassword}
                onPress={()=>{
                    navigation.navigate('changePassword')
                }}
            >
            <View style={styles.optionContainer}>
                <Image
                    style={styles.changePasswordIcon}
                    source={require('./settingsIcons/changePassword.png')}
                />
                <Text style={styles.changePasswordText}>
                    Change Password
                </Text>
            </View>
            </TouchableOpacity>
            <View style={styles.separator}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height/10,
    
        marginTop:height/55,
        marginBottom:height/45,

    },
    separator:{
       
        backgroundColor:'#c5c5c5',
        height:height/500,
        width:width,
        marginTop:height/80
    },
    buttonChangePassword:{
  
        height:height/12,
        marginTop:height/100
    },
    optionContainer:{
        flexDirection:'row',
        marginTop:height/70,
        marginLeft:width/20,
    },
    changePasswordIcon:{
        width:width/12,
        height:height/26,
        tintColor:'#0088ff',
    },
    changePasswordText:{
        
        color:'#0040d3',
        fontSize:height/50,
        marginTop:height/200,
        marginLeft:width/50,
      
    },
   
   
});