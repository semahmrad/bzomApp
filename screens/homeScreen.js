import React, { useState,useRef } from 'react'
import { View, Dimensions,StyleSheet, TouchableOpacity, Text } from 'react-native'
import Card from "../components/ovivCard"
import Users from "../testData/users.js"
import ReactionButton from '../components/actionButton' 
import Swiper from 'react-native-deck-swiper'
import { useNavigation } from '@react-navigation/native';
import ProfileVisited from './../screens/profilewhenVisited'

//import LinearGradient from 'react-native-linear-gradient'
 let width =Dimensions.get("window").width
 let height =Dimensions.get("window").height


 const visitedAccount=(visitedVisibility)=>{
 
    return(
        <ProfileVisited
            profilePicture={Users[visitedVisibility.id].image}
            userName={Users[visitedVisibility.id].name}
            bio={Users[visitedVisibility.id].bio}
            matches={Users[visitedVisibility.id].matches}
            nbrPictures={Users[visitedVisibility.id].album.length}
            albumImg={Users[visitedVisibility.id].album}
        />
      )

}
 
 export default function home() {
     const [buttonStyleState,setButtonStyleState]=useState(0)
    
 

    const [leftOrRight,setLeftOrRight]=useState('1')
    const [visitedVisibility,setVisitedVisibility]=useState({visbility:false,id:null})
    const swipeRef=useRef()


    const navigation = useNavigation();

     return(
         
        <View style={styles.justBackground}>
            {visitedVisibility.visbility?visitedAccount(visitedVisibility)

            :<View style={{width:width,height:height}}>

                <Text style={{position: 'absolute',}}>Bz0m</Text>           
                <View style={styles.container}>


                    <Swiper 
                        
                    
                        keyExtractorLeft={(user)=>{
                            console.log(leftOrRight)
                            if(leftOrRight=='0'){console.warn(user.username)}
                        }}
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
                        onTapCard={(id)=>{
                            setVisitedVisibility({visbility:true,id:id})
                        }}
                        >
                            
                    </Swiper>
                    
                </View>
            
                <ReactionButton
                    swipeRef={swipeRef}
                    buttonStyleState={buttonStyleState}
                    
                />
          </View>}
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