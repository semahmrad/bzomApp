import React,{useState,useEffect,useCallback} from 'react';
import { StyleSheet, TextInput, View,Text,Dimensions, TouchableOpacity, Image,BackHandler } from 'react-native';

let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}


 function TypingMsgAndSend (props){

   
    const [msg,setMsg]=useState('');
 
    BackHandler.addEventListener('hardwareBackPress',()=>{

        setMsg('')
    })

  


    const sendMessagePress=()=>{
        //setMessages([...messages,msg])
        setMsg('')
        console.warn('send message pressed')
    }
    const microPress=()=>{
        console.warn('microphone pressed')

    }
    const onPress = () => {
        if(!msg){
            microPress()
        }
        else {
            sendMessagePress()
        }
        
    };

    console.log("typing text render ")


    return(
        <View style={styles.container}>
              <Image 
                    source={require("./chatIcons/emoji.png")}
                    resizeMode="contain"
                    style={styles.emojiIcon}
                />
            <View style={styles.textInputContainer}>
                 <TextInput
                    style={styles.textInput}
                    placeholder="write message ..."
                    multiline={true}
                    numberOfLines={3}
                    value={msg}
                    onChangeText={setMsg}
                 />
              
            </View>
            
                <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={()=>{
                            onPress()
                        }}
                    

                    >{!msg 
                        ?<Image 
                                source={require("./chatIcons/microphone.png")}
                                resizeMode="contain"
                                style={styles.sendIcon}
                            />
                        :<Image 
                                source={require("./chatIcons/send.png")}
                                resizeMode="contain"
                                style={styles.sendIcon}
                            />
                    }
                </TouchableOpacity>  
            
            
               
              
        </View>
   
    );
}

export default TypingMsgAndSend

const styles=StyleSheet.create({
    container:{
        backgroundColor:'#e4e6e8',
        flexDirection:'row',
        width:width/1.3,
       // flex:0.06,
        //borderWidth:width/100,
        alignSelf:'center',
        borderRadius:width/10,
        //opacity:0.5
        justifyContent:"space-around",
        alignItems:'center',
        //position:'relative',
       // marginTop:height/1.25
       marginBottom:width/50,
      


    },

    emojiIcon:{
        width:width/14,
        height:width/14,
        tintColor:"red",
        alignSelf:'center',
        marginTop:width/180,
        marginLeft:width/20

    },

    textInputContainer:{
        //backgroundColor:'red',
        width:width/1.7,
        borderRadius:20,
        marginLeft:width/300,
       
        alignItems:'center',
        maxHeight:50
      
    },
    textInput:{
        color:"black",
        width:width/1.84,
        //backgroundColor:'green',
        
    },
    buttonContainer:{
        //backgroundColor:'red',
        width:width/10,
        height:height/22,

    },
    sendIcon:{
        width:width/14,
        height:width/14,
        tintColor:"red",
        alignSelf:'center',
        marginTop:width/180,
        marginRight:width/20


    },

})