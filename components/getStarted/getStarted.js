import React,{useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView,Dimensions,TouchableOpacity, ViewBase,TextInput } from "react-native";
import { Input } from 'react-native-elements';
import dimension from '../../screenSizes/screenOfSizes'

import{useNavigation} from "@react-navigation/native"
import DatePicker from 'react-native-datepicker';
import { RadioButton } from 'react-native-paper';
let width =dimension.width
let height=dimension.heightWhenNavBar

export default function getStarted() {
 const navigation=useNavigation();

 const [firstName,setFirstName]=useState();
 const [lastName,setLastName]=useState();
 const [birthDay,setBirtDay]=useState('01-01-1990');
 const [gender,setGender]=useState();
 const [phone,setPhone]=useState();


  return (
        <ScrollView style={styles.container} >
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
            <Text style={styles.textForInput}>birthday</Text>
            <DatePicker
                style={styles.datePickerStyle}
                date={birthDay} // Initial date from state
                mode="date" // The enum of date, datetime and time
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate="01-01-1970"
                maxDate="01-01-2005"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    //display: 'none',
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                }}
                onDateChange={(date) => {
                  setBirtDay(date);
                }}
            />
            
            <View style={styles.radioButtonConatiner}>
              <View style={styles.oneRadioButtonContainer}>
                <RadioButton
                  value="M"
                  status={ gender === 'Male' ? 'checked' : 'unchecked' }
                  onPress={() => setGender('Male')}
                  color='black'
                />
                <Text style={styles.RadioButtonText}>Male</Text>
              </View>

              <View style={styles.oneRadioButtonContainer}>
                  <RadioButton
                    value="F"
                    status={ gender === 'Female' ? 'checked' : 'unchecked' }
                    onPress={() => setGender('Female')}
                    color='black'
                  />
                  <Text style={styles.RadioButtonText}>Femele</Text>
              </View>

              <View style={styles.oneRadioButtonContainer}>
                  <RadioButton
                    value="O"
                    status={ gender === 'Other' ? 'checked' : 'unchecked' }
                    onPress={() => setGender('Other')}
                    color='black'
                 />
                 <Text style={styles.RadioButtonText}>Other</Text>
              </View>

            </View>
            
            <Text style={styles.textForInput}>Phone number</Text>
            <TextInput
                style={styles.inputs}
                placeholderTextColor="#6f6e6e"
                placeholder='Phone number'
                onChangeText={setPhone}
                value={phone}
            />
            <TouchableOpacity
                style={styles.nextButton}
                onPress={()=>{navigation.navigate('getStartedProfilePick')}}
            >
                <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
        </ScrollView>
        
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
    height:height/18,
    backgroundColor:'#f5f9fc',
    marginTop:height/150,
    //borderRadius:width/15,
    borderBottomWidth:1,
    borderColor:'#838080',
    elevation:width/50,
  },
  datePickerStyle:{
    marginLeft:(width-(width/1.08))/2,
    marginTop:height/50,
    
  },
  radioButtonConatiner:{
    marginTop:height/50,
    marginLeft:(width-(width/1.08))/2,
  },

  oneRadioButtonContainer:{
    flexDirection:'row',
    alignContent:'center',
    
  },
  RadioButtonText:{
    textAlignVertical:'center',
    fontWeight:"400",
    color:'#525050',
    fontSize:height/52,
  },
  nextText:{
    color:'white',
    textAlign:'center',
    fontSize:height/32,
    fontWeight:'bold'
  },
  nextButton:{
    width:width/1.1,
    height:height/16,
    backgroundColor:'#e24731',
    alignSelf:'center',
    marginTop:height/35,
    borderRadius:width/30,
    justifyContent:'center',
    elevation:width/25,
    //borderWidth:width/width
  },

  
});