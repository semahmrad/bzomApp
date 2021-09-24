import React,{useState,useEffect,useCallback} from 'react';
import { StyleSheet, TextInput, View,Text,FlatList, Dimensions, ScrollView } from 'react-native';
import Bubble from './bubbleChat';
import TypingMsgAndSended from './typingMsgSpace'

let width =Dimensions.get("window").width
let height=Dimensions.get("window").height;



export default function discussionSpace(props){
    const {descutionData,partnair}=props;

    
    return(

        <View style={styles.container}>
            <FlatList
            style={styles.container}
            data={descutionData}
            keyExtractor={item=>item.id+''}
            renderItem={({item})=>{
           
            return(
                <Bubble 
                    partnair={partnair}
                    message={item}
                />
                             
         )}
        }
         >
          
        </FlatList>
        
        </View>
    );
}

const styles=StyleSheet.create({
    container:{
        paddingLeft:5,
        paddingRight:5,
        //height:height/1.25,
        //backgroundColor:'green',
        flex:8,

    },

})