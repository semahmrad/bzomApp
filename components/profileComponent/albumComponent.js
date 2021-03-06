import React,{useEffect,useState} from "react";
import { StyleSheet, Modal , View, Image, FlatList,Dimensions,text,TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

import dimension from '../../screenSizes/screenOfSizes'
let width =dimension.width
let height=dimension.heightWhenNavBar




export default function album(props,){

  

    const {albumImg}=props
    const navigation = useNavigation();

    return (
        
        <View style={styles.container}>
            {/* navigate to the image display screen*/}
          
         
            <FlatList
                style={styles.flatList}
                horizontal={true}
                data={albumImg}
                keyExtractor={item=>item.img_id}
                renderItem={(({item,index})=>{
                    console.log("img_id",item.img_id)
                    return(
                    <TouchableOpacity
                        onPress={()=>navigation.navigate('imageDisplay',{albumImg:albumImg,index:index,})}
                    >
                        <View >
                            <Image 
                                source={{uri:`data:image/jpeg;base64,${item.imageBase64}`}}
                                style={styles.image}
                                resizeMode='contain'
                            />
                            <View style={styles}>

                            </View>
                        </View>
                    </TouchableOpacity>

                )})}
            />      
       
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        //backgroundColor:'red',
        width:width,
        //height:height/2.7,
        alignSelf:'center',
        //backgroundColor:"red",
        marginBottom:height/20
            
    },
    flatList:{
      //paddingRight:width/20
    },
    image:{
        width:width/1.55,
        height:height/2.7,
        borderWidth:width/100,
        //borderColor:"white",
        //borderRadius:width/20,
        marginLeft:width/70,
        resizeMode:'contain',
        //borderRadius:width/20
    },
    separtor:{
        height:height/2.5,
        width:width/50,
        //backgroundColor:'white',
        position:'absolute'

    },
   


})