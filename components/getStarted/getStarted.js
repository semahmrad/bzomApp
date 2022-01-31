import React,{useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView,Dimensions,TouchableOpacity, ViewBase,TextInput } from "react-native";
import { Input } from 'react-native-elements';
import dimension from '../../screenSizes/screenOfSizes'
import methods from '../../usedMethods/usedMethods'
import{useNavigation} from "@react-navigation/native"
import DateField from 'react-native-datefield';
let width =dimension.width
let height=dimension.heightWhenNavBar

export default function getStarted() {
 const navigation=useNavigation();

 const [firstName,setFirstName]=useState();
 const [lastName,setLastName]=useState();
 const [birthDay,setBirtDay]=useState();
 const [gender,setGender]=useState();
 const [phone,setPhone]=useState();

  return (
        <View style={styles.container} >
            <Text style={styles.getStartedTitle}>Get Started</Text>
            <Text style={styles.textForInput}>First name</Text>
            <TextInput
                style={styles.inputs}
                placeholderTextColor="#6f6e6e"
                placeholder='First name'
                onChangeText={setFirstName}
                value={firstName}
            />
            <Text style={styles.textForInput}>Last name</Text>
            <TextInput
                style={styles.inputs}
                placeholderTextColor="#6f6e6e"
                placeholder='Last name'
                onChangeText={setLastName}
                value={lastName}
            />
            <Text style={styles.textForInput}>Birthday</Text>
            <DateField
                labelDate="Input date"
                labelMonth="Input month"
                labelYear="Input year"
                onSubmit={(value) => console.log(value)}
                containerStyle={{ backgroundColor: 'red',width:250, marginLeft:(width-(width/1.08))/2,color:'pink'}}
                styleInput={{color:'pink'}}
                style={{color:'red'}}
            />
            <TextInput
                style={styles.inputs}
                placeholderTextColor="#6f6e6e"
                placeholder='Email or Username'
                onChangeText={setGender}
                value={gender}
            />
            <Text style={styles.textForInput}>Phone number</Text>
            <TextInput
                style={styles.inputs}
                placeholderTextColor="#6f6e6e"
                placeholder='Phone number'
                onChangeText={setPhone}
                value={phone}
            />

        </View>
        
  );
}

const styles = StyleSheet.create({
  container:{
      //backgroundColor:'black',
    height:height,
    width:width,
},
getStartedTitle:{
    alignSelf:'center',
    marginTop:height/25,
    fontSize:height/23,
    fontWeight:'700'
},
textForInput:{
    marginTop:height/60,
    marginLeft:(width-(width/1.08))/2,
    fontSize:height/57,
    fontWeight:"400",
    color:'#525050',
    
  },

inputs:{
    fontSize:height/67,
    color:'black',
    alignSelf:'center',
    width:width/1.08,
    height:height/20,
    backgroundColor:'#f5f9fc',
    marginTop:height/150,
    //borderRadius:width/15,
    borderBottomWidth:1,
    borderColor:'#838080',
    elevation:width/50,
  },

  
});