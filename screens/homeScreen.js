import React, { useState,useRef } from 'react'
import { View, Dimensions,StyleSheet, TouchableOpacity, Text } from 'react-native'
import Card from "../components/ovivCard"
import Users from "../testData/users.js"
import ReactionButton from '../components/actionButton' 
import Swiper from 'react-native-deck-swiper'
import { useNavigation } from '@react-navigation/native';

//import LinearGradient from 'react-native-linear-gradient'
 let width =Dimensions.get("window").width
 let height =Dimensions.get("window").height


const reactButtonStyle=(x,setButtonStyleState)=>{
    if(x>30){
        setButtonStyleState('like')
    }
    else if(x<-30){
        setButtonStyleState('disLike')
    }
    else setButtonStyleState('')
}
 
 export default function home() {
     const [buttonStyleState,setButtonStyleState]=useState(0)
    
 

    const [leftOrRight,setLeftOrRight]=useState('1')
    const swipeRef=useRef()

 
    const testSomeThink=(index)=>{
        console.log(index)
        console.warn(index)
    }
    const navigation = useNavigation();

     return(
         
        <View style={styles.justBackground}>

            <Text style={{position: 'absolute',}}>Bz0m</Text>           
            <View style={styles.container}>


                <Swiper 
                    
                   
                    keyExtractorLeft={(user)=>{
                        console.log(leftOrRight)
                        if(leftOrRight=='0'){console.warn(user.id)}}}
                    //jumpToCardIndex={3,true}
                    ref={swipeRef}
                    backgroundColor={'transport'}
                    verticalSwipe={true}
                    cards={Users}
                    renderCard={card=> <Card user={card}/>}
                   // cardIndex={index}
                    infinite={true}
                    showSecondCard={true}
                    //onSwipedLeftonSwiped={(index)=>{console.warn(index)}}
                    jumpToCardIndex={()=>{}}
                    
                    //onSwipedLeft={(IndexUserSwiped)=>{console.warn('left')}}
                    onSwipedRight={(IndexUserSwiped)=>{setTimeout(()=>{},1000)}}
                    stackSize={3}
                   // stackScale={10}
                   // stackSeparation={14}
                    backgroundColor={'transparent'}
                    overlayLabels={{
                        left:{
                            title:'NOPE',
                       
                            style:{
                                label:{
                                    
                                    backgroundColor: 'red',
                                    color:'white',
                                // borderWidth: 1,
                                    fontSize: 24

                                    },
                                wrapper:{
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-start',
                                
                                }
                            }
                        } ,
                        right:{
                            title:'LIKE',
                       
                            style:{
                                label:{
                                    
                                    backgroundColor: 'green',
                                    color:'white',
                                // borderWidth: 1,
                                    fontSize: 24

                                    },
                                wrapper:{
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                
                                }
                            }
                        } 
                     }}
                    //buton style when swiping
                    onSwiping={(x,y)=>{
                        setButtonStyleState(x)
                        console.log(x)
                    }}
                    dragEnd={()=>{
                    console.log('dragEnd'+buttonStyleState)
                    setButtonStyleState(0)}}

                    horizontalThreshold={width/3}
                    swipeAnimationDuration={750}
                    disableTopSwipe={true}
                    disableBottomSwipe={true}
                    inputRotationRange={[-width /1.1, 0, width /3]}
                    animateCardOpacity={true}
                    stackAnimationFriction={300}
                    onTapCard={(x,y)=>{
                        navigation.navigate('profileVisited')
                    }}
                    >
                         
                </Swiper>
                   
            </View>
           
            <ReactionButton
                swipeRef={swipeRef}
                buttonStyleState={buttonStyleState}
                
            />
          
        </View>
        
      
     );
 }


const styles = StyleSheet.create({
    container: {
        flex:1,
       // backgroundColor: '#131d23',
    
        //marginTop:width/9.5,
        height:height/1.4,
        alignContent:'center'
    },
    justBackground:{
       
        //backgroundColor: '#131d23',
        flex:1,
    },
  
  });