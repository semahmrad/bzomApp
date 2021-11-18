import * as React from 'react';
//baseColor
import colors from './../projectColor/colors'

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

//profile when visited stack and
import ProfileWhenVisited from "./profileWhenVisited/profileWhenVisited"

//settings stack
import ChangePassword from "./settingsComponent/settingsScreens/changePassword"
import PersonalInformation from "./settingsComponent/settingsScreens/personalInformation"
import Vip from "./vipComponent/vip"



import profileData from './../testData/profile.json'

const Tab = createBottomTabNavigator();
const msgTab = createBottomTabNavigator();
const imageDisplayStack = createBottomTabNavigator();
const homeProfile = createBottomTabNavigator();
const settings = createBottomTabNavigator();

const imgSrc=profileData.profile_Pic;
let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}
if(height<732){height=(732+height)/2}

const homeandProfileStack=()=>{
    
 
    return(
        <homeProfile.Navigator>
            <homeProfile.Screen name="Profile" component={Home} options={{tabBarShowLabel:false,headerShown: false}} />
            <homeProfile.Screen name="profileWhenVisited" component={ProfileWhenVisited}options={{tabBarShowLabel:false,headerShown: false}} />
        </homeProfile.Navigator>
    )}

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
                   
                      }
                    }
            />
        </msgTab.Navigator>
    )}

    const settingsStack=()=>{
    
 
        return(
        <settings.Navigator>
            <settings.Screen name="settings" component={Settings} options={{tabBarShowLabel:false,headerShown: false}} />
            <settings.Screen name="changePassword" component={ChangePassword}options={{tabBarShowLabel:false,headerShown: true,title: 'Change Password'}} />
            <settings.Screen name="personalInformation" component={PersonalInformation}options={{tabBarShowLabel:false,headerShown: true,title: 'Personal Information'}} />
            <settings.Screen name="vip" component={Vip}options={{tabBarShowLabel:false,headerShown: true,title: 'VIP'}} />
        </settings.Navigator>


        )}



export default function Tabs() {
 
   


    return (
            <Tab.Navigator
            screenOptions={{
                tabBarStyle: styles.tabBarStyle,
              }}
            >

                
                

                <Tab.Screen name="homeandProfileStack" component={homeandProfileStack} options={{tabBarShowLabel:false,headerShown: false,
                    tabBarIcon:({focused})=>(
                        <View style={styles.iconsContainerStyle}>
                            <Image 
                                source={require("../bottomNavBarIcons/ovivIcon.png")}
                                resizeMode="contain"
                                style={{
                                    tintColor:focused ? colors.baseColor: "#131d23",
                                    
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
                                    tintColor:focused ? colors.baseColor: "#131d23",
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
                                        tintColor:focused ? colors.baseColor: "#131d23",
                                        ... styles.navBarIconsStyle
                                    }}

                                />
                                <Text style={styles.numberMsgStyle}>100</Text>
                            </View>                                 
                               
                        </View>
                    )
                }}/>
                <Tab.Screen name="settings" component={settingsStack} options={{tabBarShowLabel:false,headerShown: false,
                    tabBarIcon:({focused})=>(
                        <View style={styles.iconsContainerStyle}>
                            <Image 
                                source={require("../bottomNavBarIcons/settings.png")}
                                resizeMode="contain"
                                style={{
                                    tintColor:focused ? colors.baseColor: "#131d23",
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
        //marginTop:height/(height/2.2),
        width:width,
        height:height/15.1,
        position:"absolute",
        justifyContent:"center",

    },
    navBarIconsStyle:{
       
        width:width/12,
        height:width/12,
       // backgroundColor:"red",
    
       
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