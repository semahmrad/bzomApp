import React from 'react';
import { StyleSheet, Text, View,SafeAreaView,Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from "./components/tabs"

//const Stack = createStackNavigator();



export default function navigation() {
  return (
    
    <NavigationContainer>

        <Tabs/>

    </NavigationContainer>
    
   

  );
}


