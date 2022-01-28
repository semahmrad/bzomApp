import React from 'react';
import { StyleSheet, StatusBar , View, Image, TouchableWithoutFeedback,Dimensions,TouchableOpacity, ViewBase,TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import dimension from '../screenSizes/screenOfSizes'
import methods from './../usedMethods/usedMethods'

const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;
const navbarHeight = screenHeight - windowHeight + StatusBar.currentHeight;
let width =dimension.width
let height=dimension.heightWhenNavBar
export default function (){
const navigation =useNavigation()
console.log("============================")
    console.log("navbarHeight",navbarHeight)
    console.log("height",height)
    return(
        <View style={styles.container}>
            <TouchableWithoutFeedback
                onPress={()=>{navigation.navigate('home')}}
            >
                <Image
                    source={require('./bottomNavBarIcons/home.png')}
                    style={styles.icon}
                    tintColor={'black'}
                />
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
                onPress={()=>{navigation.navigate('Profile')}}
            >    
                <Image
                    source={require('./bottomNavBarIcons/profile.png')}
                    style={styles.icon}
                    tintColor={'black'}
                />    
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
                onPress={()=>{navigation.navigate('message')}}
            > 
                <Image
                    source={require('./bottomNavBarIcons/messages.png')}
                    style={styles.icon}
                    tintColor={'black'}
                />       
            </TouchableWithoutFeedback>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        height:height/17,
        width:width,
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'white',
        borderTopEndRadius:width/15,
        borderTopStartRadius:width/15,
        position:'absolute',
        marginTop:height/1.06,
        elevation:100,
        zIndex:100
       
    },
    icon:{
        width:methods.circleObject(13),
        height:methods.circleObject(13),
     
        
    }
});