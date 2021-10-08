import React,{useEffect,useState} from "react";
import { StyleSheet, Modal , View, Image, FlatList,Dimensions,text,TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}



export default function album(props,){

    const {albumImg,}=props
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
                    return(
                    <TouchableOpacity
                        onPress={()=>navigation.navigate('imageDisplay',{albumImg:albumImg,index:index,})}
                    >
                        <View >
                            <Image 
                                source={{uri:item.img_path}}
                                style={styles.imgPath}
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
        height:height/2.4,
        alignSelf:'center',
            
    },
    flatList:{
      //paddingRight:width/20
    },
    imgPath:{
        width:width/1.35,
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