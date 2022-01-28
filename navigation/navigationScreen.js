import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator } from '@react-navigation/native-stack'

//import stack screens 
import Login from './../components/loginComponents/login'
import Home from './../screens/homeScreen'
import ProfileVisited from '../components/profileWhenVisited/profileWhenVisited'
import Message from '../screens/messages'
import Chat from '../components/messagesComponents/ChatScreen'
import Ptofile from '../screens/profiles'
import ImageDisplay from '../components/profileComponent/imagesDisplay'
import Setting from '../screens/settings'
import ChangePassword from '../components/settingsComponent/settingsScreens/changePassword'
import PersonalInformation from '../components/settingsComponent/settingsScreens/personalInformation'
import Vip from '../components/vipComponent/vip'


const Stack=createNativeStackNavigator();
const Navigation=()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator sccreenOption={{headerShown:false}}>
            <Stack.Screen name='home' component={Home}  options={{tabBarShowLabel:true,headerShown: false}}/>
                <Stack.Screen name='signIn' component={Login} options={{tabBarShowLabel:true,headerShown: false}}/>

                <Stack.Screen name='profileWhenVisited' component={ProfileVisited}  options={{tabBarShowLabel:true,headerShown: false}}/>
                <Stack.Screen name='message' component={Message}  options={{tabBarShowLabel:true,headerShown: false}}/>
                <Stack.Screen name='chat' component={Chat}  options={({route})=>{
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
                    } />
                <Stack.Screen name='Profile' component={Ptofile}  options={{tabBarShowLabel:true,headerShown: false}}/>
                <Stack.Screen name='imageDisplay' component={ImageDisplay}  options={{tabBarShowLabel:true,headerShown: false}}/>
                <Stack.Screen name='settings' component={Setting}  options={{tabBarShowLabel:true,headerShown: false}}/>
                <Stack.Screen name='changePassword' component={ChangePassword}  options={{tabBarShowLabel:true,headerShown: false}}/>
                <Stack.Screen name='personalInformation' component={PersonalInformation}  options={{tabBarShowLabel:true,headerShown: false}}/>
                <Stack.Screen name='vip' component={Vip} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default Navigation;