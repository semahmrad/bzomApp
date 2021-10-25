import React, { useState,useRef } from 'react'
import { View, Dimensions,StyleSheet,Text ,BackHandler,Alert,} from 'react-native'
import Card from "../components/ovivCard"
import Users from "../testData/users.js"
import ReactionButton from '../components/actionButton' 
import Swiper from 'react-native-deck-swiper'
import { useNavigation } from '@react-navigation/native';

//for test 
import ProfileWhenVisited from './../components/profileWhenVisited/profileWhenVisited'



//import LinearGradient from 'react-native-linear-gradient'
 let width =Dimensions.get("window").width
 let height =Dimensions.get("window").height
 if(height>732){height=(732+height)/2}

    const visitedProfileFn=(profileinfo,visibilityProfile,setVisbilityProfile)=>{
        if(visibilityProfile){
            console.log("profileinfo===========>",profileinfo.profilePic)
        return(
            < ProfileWhenVisited
                profilePic={profileinfo.profilePic}
                nameProfile={profileinfo.nameProfile}
                bio={profileinfo.bio}
                pictures={profileinfo.pictures}
                setVisbilityProfile={setVisbilityProfile}
                

            />
        )
    }
    }
 
 export default function home({navigation}) {

    
    
    const [buttonStyleState,setButtonStyleState]=useState(0)
    const [leftOrRight,setLeftOrRight]=useState('1')
    const swipeRef=useRef()


     return(     
  <View style={styles.justBackground}>
     

          <View style={{width:width,height:height}}>

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

                            navigation.navigate('profileWhenVisited',
                                {
                                    profilePic:Users[id].image,
                                    nameProfile:Users[id].name,
                                    bio:Users[id].bio,
                                    pictures:Users[id].album
                                });
                               
                       
                        }}
                        >
                            
                    </Swiper>
                    
                </View>
            
                <ReactionButton
                    swipeRef={swipeRef}
                    buttonStyleState={buttonStyleState}
                    
                />
          </View>
   
        </View>
        
      
     );
 }


const styles = StyleSheet.create({
    container: {
        flex:1,
        height:height/1.4,
        alignContent:'center'
    },
    justBackground:{
        flex:1,
    },
  
  });