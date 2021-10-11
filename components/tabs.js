import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text,Image, View,SafeAreaView,Dimensions } from 'react-native';
//screens
import Home from "../screens/homeScreen"
import Profiles from "../screens/profiles"
//import Profile from "../screens/profile"
import Messages from "../screens/messages"
import Settings from "../screens/settings"
//components
import Chat from './messagesComponents/ChatScreen'
import ImageDisplay from './profileComponent/imagesDisplay'

import profileData from './../testData/profile.json'

const Tab = createBottomTabNavigator();
const msgTab = createBottomTabNavigator();
const imageDisplayStack = createBottomTabNavigator();
const homeProfile = createBottomTabNavigator();

const imgSrc=profileData.profile_Pic;
let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}

const profilImageDisplayStack=()=>{
    
 
    return(
        <imageDisplayStack.Navigator>
            <imageDisplayStack.Screen name="Profile" component={Profiles} options={{tabBarShowLabel:true,headerShown: false}} />
            <imageDisplayStack.Screen name="imageDisplay" component={ImageDisplay}options={{tabBarShowLabel:false,headerShown: false}} />
        </imageDisplayStack.Navigator>
    )}

const msgStack=()=>{
    
 
    return(
        <msgTab.Navigator>
            <msgTab.Screen name="messages" component={Messages} options={{tabBarShowLabel:true,headerShown: false}} />
            <msgTab.Screen name="chat" component={Chat}
                  options={({route})=>{
                    if(!route.params?.discution){
                        return{
                            title:route.params?.user.name
                        }
                      }
                    else{
                        return {
                            title:route.params?.partnair.name,
                        }
                    }
                      }}
            />
        </msgTab.Navigator>
    )}



export default function Tabs() {
 
   


    return (
            <Tab.Navigator
            screenOptions={{
                tabBarStyle: styles.tabBarStyle,
              }}
            >

                
                

                <Tab.Screen name="home" component={Home} options={{tabBarShowLabel:false,headerShown: false,
                    tabBarIcon:({focused})=>(
                        <View style={styles.iconsContainerStyle}>
                            <Image 
                                source={require("../bottomNavBarIcons/ovivIcon.png")}
                                resizeMode="contain"
                                style={{
                                    tintColor:focused ? "#ff7100": "#131d23",
                                    
                                    ... styles.navBarIconsStyle
                                }}
                            />
                           
                        </View>
                    )
                }}/>
                <Tab.Screen name="profile" component={profilImageDisplayStack} options={{tabBarShowLabel:false,headerShown: false,
                    tabBarIcon:({focused})=>(
                        <View style={styles.iconsContainerStyle}>
                            <Image 
                                source={require("../bottomNavBarIcons/profile.png")}
                                resizeMode="contain"
                                style={{
                                    tintColor:focused ? "#ff7100": "#131d23",
                                    ... styles.navBarIconsStyle
                                }}

                            />
                        </View>
                    )
                }}/>
                <Tab.Screen name="messages" component={msgStack} options={{tabBarShowLabel:false,headerShown: false,
                    tabBarIcon:({focused})=>(
                        <View style={styles.iconsContainerStyle}>
                            <View style={styles.msgNumberStyle}>
                                <Image 
                                    source={require("../bottomNavBarIcons/messages.png")}
                                    resizeMode="contain"
                                    style={{
                                        tintColor:focused ? "#ff7100": "#131d23",
                                        ... styles.navBarIconsStyle
                                    }}

                                />
                                <Text style={styles.numberMsgStyle}>100</Text>
                            </View>                                 
                               
                        </View>
                    )
                }}/>
                <Tab.Screen name="settings" component={Settings} options={{tabBarShowLabel:false,headerShown: true,
                    tabBarIcon:({focused})=>(
                        <View style={styles.iconsContainerStyle}>
                            <Image 
                                source={require("../bottomNavBarIcons/settings.png")}
                                resizeMode="contain"
                                style={{
                                    tintColor:focused ? "#01c9e3": "#131d23",
                                    ... styles.navBarIconsStyle
                                }}

                            />
                          
                        </View>
                    )
                }}/>

               
    

            </Tab.Navigator>

         

       
        
    );


}

const styles = StyleSheet.create({
    tabBarStyle: {
        
       // width:width/1.1,
       //width:"100%",
      // height:width,
        //borderRadius:width/10,
        marginTop:width/(width/1.1),
        width:width,
        height:height/17,
        position:"absolute",
        //marginLeft:(width-(width/1.1))/2,
       // paddingHorizontal:width/15,
        justifyContent:"center",
        //marginBottom:height
        
    },
    navBarIconsStyle:{
       
        width:width/10,
        height:width/10,
       // backgroundColor:"red",
    
       
    },
    navBarIconsTextStyle:{
        width:width/9,
        height:width/20,
        textAlign:"center",
        fontSize:width/32.8,
        justifyContent:"center"
      
    
    },
    iconsContainerStyle:{
        alignItems:"center",
        justifyContent:"center"
    },
    msgNumberStyle:{
       // flexDirection:'row',
        //marginTop:width/31
      
    },
    numberMsgStyle:{
        position:"absolute",
        marginBottom:width/20,
        backgroundColor:'red',
        width:width/19,
        height:width/19,
        textAlign:"center",
        borderRadius:width/10,
        marginLeft:width/19,
        //marginBottom:width/9,
        color:"white",
        fontSize:width/35,
        justifyContent:"center"
    },

  });