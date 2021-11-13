import React,{useState,useMemo,useEffect,useRef} from "react";
import { StyleSheet, Text, View, Image, ScrollView,Dimensions } from "react-native";
import Slider from 'react-native-slider'
//colors 
import colors from './../../projectColor/colors'

let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}

export default function DistanceSlider() {
    console.log('height============>',height)
    console.log('width============>',width)
    const [sliderVal,setSliderVal]=useState(10);
    const getDistanceValue=()=>{
        const value=(sliderVal/1)-(sliderVal%1);
        if(sliderVal==100){
            return value +'KM+'
        }
        else return value +'KM'
    }

    
    return (
        <View style={styles.container}>
            <View style={styles.distanceValueContainer}>
                <Text style={styles.distanceText}>Distance</Text>
                <Text style={styles.distance}>{getDistanceValue()} </Text>
            </View>
            <View style={styles.sliderContainer}>
                <Image 
                    source={require("./../settingsComponent/settingsIcons/bike.png")}
                    style={styles.bikeIcon}
                />
                
                <Slider
                style={styles.slider}
                value={sliderVal}
                onValueChange={(value) => setSliderVal(value)}
                minimumValue={10}
                maximumValue={100}
                onSlidingComplete={(value)=>{}}
                
                />

                <Image 
                    source={require("./../settingsComponent/settingsIcons/airFlay.png")}
                    style={styles.flayIcon}
                />
           </View>
           
          
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        //marginLeft:width/20,
        width:width/1.1,
        //flexDirection:'row',
        //justifyContent:'space-around',
        marginTop:height/40,
        //backgroundColor:'red'

    },
    distanceValueContainer:{
        marginLeft:width/20,
        width:width/1.1,
        flexDirection:'row',
        //justifyContent:'space-around',
        marginTop:height/50,
        //backgroundColor:'red'
     
    },
    distanceText:{
        fontSize:width/23,
        //backgroundColor:'green',
        width:width/2.8,
        fontWeight:'bold',
        color:colors.baseColor

    },
    distance:{
        width:width/1.81,
        textAlign:'right',
        padding:width/90,
    },
    sliderContainer:{
        flexDirection:'row',
        width:width/1.1,
        marginTop:height/100 ,
    },
    bikeIcon:{
        width:width/13,
        height:width/13,
        tintColor:'#e19684',
        marginLeft:width/20,
        marginTop:height/140,
    },
    slider:{
        width:width/1.5,
        //backgroundColor:'green',
        marginLeft:width/20

    },
    flayIcon:{
        width:width/13,
        height:width/13,
        tintColor:'#e19684',
        marginLeft:width/25,
        marginTop:height/120,
    },

   
});