import 'react-native-gesture-handler';

import React from 'react';
import { StyleSheet, Text, View,SafeAreaView,Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from "./components/tabs"
import Swiper from 'react-native-deck-swiper'

//const Stack = createStackNavigator();


 let width =Dimensions.get("window").width
 let height=Dimensions.get("window").height
 if(height>732){height=(732+height)/2}

export default function App() {
    const[index,setIndex]=useState(0);
  return (
    <View>
       

    </View>    
  );
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: '#131d23',
    marginTop:height/10,
   
  },
});
