

import React,{useState,useEffect} from 'react' ;
import { StyleSheet, View,Dimensions, Text } from 'react-native';
import DescSpace from './chatsComponents/discussionSpace'
import TypingMsgAndSended from './chatsComponents/typingMsgSpace'




 let width =Dimensions.get("window").width
 let height=Dimensions.get("window").height
 if(height>732){height=(732+height)/2}

export default function chat({route,navigation}) {

 
    //const [messages,setMessages]=useState(['heelo','hey how are u','i am fine thanks and you','great thanks'])
    console.log("chat Screen")
    const discussion=route.params.discution;
    const partnair=route.params.partnair
    const user=route.params.user

    

  
    

    return(
        <View style={styles.container}>
          

            {!discussion
            ?   <View style={styles.container}>
                    <Text>you have any discussion with {user.name}</Text>
                </View>
            :
                <DescSpace
                descutionData={discussion}
                partnair={partnair}
                />
            }
            
            <TypingMsgAndSended

            />   
        </View>
    );
}



const styles=StyleSheet.create({
    container:{
       // backgroundColor:'pink',
        //flexDirection:'column',
        flex:1,
    },

})