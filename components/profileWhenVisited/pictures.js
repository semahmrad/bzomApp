import React,{useEffect,useState} from "react";
import { FlatList, View, Image, StyleSheet,Dimensions } from "react-native";
import dimension from '../../screenSizes/screenOfSizes'

let width =dimension.width
let height=dimension.height



export default function pictures(props){
    const {pictures}=props
  



    return (
        <View style={styles.container}>
               <FlatList
                style={styles.flatList}
                data={pictures}
                keyExtractor={item=>item.img_id}
                renderItem={(({item,index})=>{
                    return(
                        <Image
                            style={styles.pictur}
                            source={{uri:item.img_path}}
                            resizeMode='contain'
                         />
                      
                )})}
            />   
        
        </View>
    );
}
const styles = StyleSheet.create({
    container:{

        width:width,
        height:(height*2)/3,

    },
    pictur:{
        height:height/2.2,
        //width:width/1.1,
        marginTop:height/50,
       //backgroundColor:'black'
    },


})