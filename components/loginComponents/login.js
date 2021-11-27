import React,{useState} from 'react';
import { StyleSheet, Text, View, BackHandler, ScrollView,Dimensions,TouchableOpacity, ViewBase,TextInput } from "react-native";
import { Input } from 'react-native-elements';
import colors from './../../projectColor/colors'
import LoginInfos from './components/loginInfosComponent'
import OtherLogin from './components/othersLogin'
import ResetPassword from './components/resetPassword'

let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}
if(height<732){height=(732+height)/2}
export default function login() {
  const[visibility,setVisibility]=useState(false);

  return (
      <ScrollView >
        
          <LoginInfos
            setVisibility={setVisibility}
            visibility={visibility}
          />
          <OtherLogin/>
          <ResetPassword
            visibility={visibility}
            setVisibility={setVisibility}
          />
        
      </ScrollView>    
  );
}