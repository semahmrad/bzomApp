import React, { useState,useRef } from 'react'
import { View,StatusBar, Dimensions,StyleSheet,Text ,SafeAreaView,Image,TouchableOpacity,ScrollView,alert} from 'react-native'
import Card from "../components/ovivCard"
import Users from "../testData/users.js"
import ReactionButton from '../components/actionButton' 
import Swiper from 'react-native-deck-swiper';
//import settings from "../screens/settings"
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ButtomTabs from './../navigation/buttomNavigationOptions'

import dimension from '../screenSizes/screenOfSizes';

//import LinearGradient from 'react-native-linear-gradient'

let height=dimension.heightWhenNavBar;
let width=dimension.width;


 
 export default function home({route}) {
    const navigation = useNavigation();

    console.log("height===home======>",height)

    const [buttonStyleState,setButtonStyleState]=useState(0)
    const [leftOrRight,setLeftOrRight]=useState('1')
    const swipeRef=useRef()
    //init the settings stack navihgation
    const settings = createBottomTabNavigator();



        

     return(     
         
  <View style={styles.justBackground}>
  

          <ScrollView style={{width:width,height:(height)-height/15.1}}>

               <View style={styles.logoSettingIconConatiner}>
                    <Image source={require('./../home_imgs_icons/bzom_logo_home.png')} 
                        style={styles.homeLogo}
                        resizeMode='contain'
                    /> 
                    <TouchableOpacity
                        onPress={()=>{navigation.navigate('settings')}}
                        style={styles.settings}
                    >
                        <Image source={require('./../home_imgs_icons/settings.png')} 
                            //style={styles.settings}
                            resizeMode='contain'
                        /> 
                    </TouchableOpacity>
                 
               </View>
                   

            
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
                        renderCard={(card,id)=> 
                        <Card 
                            user={card}
                            profilePic={card.image}
                            nameProfile={card.name}
                            bio={card.bio}
                            pictures={card.album}
                            
                        />}
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
                        inputRotationRange={[-width /2, 0, width /2]}
                        animateCardOpacity={true}
                        stackAnimationFriction={300}
                        /*onTapCard={(id)=>{

                            navigation.navigate('profileWhenVisited',
                                {
                                    profilePic:Users[id].image,
                                    nameProfile:Users[id].name,
                                    bio:Users[id].bio,
                                    pictures:Users[id].album
                                });
                               
                       
                        }}*/
                        >
                            
                    </Swiper>
                    
                </View>
                <ReactionButton
                    swipeRef={swipeRef}
                    buttonStyleState={buttonStyleState}
                    
                />
                
          </ScrollView>
          <ButtomTabs/>
        </View>
        
      
     );
 }


const styles = StyleSheet.create({
    container: {
       // flex:1,
        height:height/1.1,
        alignContent:'center',
       // backgroundColor:'white'
    },
    justBackground:{
        height:height,
    },
    logoSettingIconConatiner:{
        width:width/1.1,
        alignSelf:'center',
        flexDirection:'row',
        position:'absolute',
      
    },

    homeLogo:{
        width:width/3.6,
        height:height/20,
        position:'absolute',
        marginTop:height/35,
        zIndex:10,
       // marginBottom:50,
       
    },
    settings:{
        width:width/10,
        height:height/23,
        position:'absolute',
        marginTop:height/23,
        zIndex:10,
        //backgroundColor:'red',
        marginLeft:width/1.20,
        alignContent:'center'
       
  
    },
 
  
  
  
  });