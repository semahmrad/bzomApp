import React,{useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView,Dimensions,TouchableOpacity, ViewBase,TextInput } from "react-native";
import dimension from '../../screenSizes/screenOfSizes'
import{useNavigation} from "@react-navigation/native"
import DatePicker from 'react-native-datepicker';
import { RadioButton } from 'react-native-paper';
import PhoneInput from "react-native-phone-number-input";
import client from '../../confProject/config_server'
let width =dimension.width
let height=dimension.heightWhenNavBar

const connectedWithServer=async(setServerContion)=>{
  await client.post("signUpValidator/concting")
   .then(resultat=>{
    setServerContion(resultat.data)
   // console.log('resultat.data',resultat.data);
  
   })
}
const verifchamps=(firstName,lastName,birthDay,gender,phone)=>{
  let name_format = /^[a-zA-Z]{4,}$/;
  let phone_format=/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
  if(firstName&&lastName&&phone&&birthDay&&gender){
    if(firstName.toLowerCase().match(name_format)){
      if(lastName.toLowerCase().match(name_format)){
        console.log('valid email')
        if(phone.toLowerCase().match(phone_format)){
          console.log('ok')
          return 'ok'
        }else{
          console.log('phone not valid !!')
          return 'phone not valid !!';
        }

      }else{
        console.log('lastName not valid !!')
        return 'lastName not valid !!';
      }
    }else {
      console.log('firstName not valid !!')
      return 'firstName not valid !!';
    }
  }
}



export default function getStarted({route}) {
 const navigation=useNavigation();

 const [firstName,setFirstName]=useState();
 const [lastName,setLastName]=useState();
 const [birthDay,setBirtDay]=useState('01-01-1990');
 const [gender,setGender]=useState();
 const [phone,setPhone]=useState();
 const [codePhone,setCodePhone]=useState();
 //verif connexion Withserver
 const [serverContion,setServerContion]=useState("wait");

 console.log('route===============>',birthDay)



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
            <PhoneInput
              defaultCode="TN"
              defaultValue={phone}
              onChangeText={(text) => {
                setPhone(text);
              }}
              onChangeFormattedText={(text) => {
                setCodePhone(text);
              }}
              containerStyle={{marginTop:height/50,marginLeft:(width-(width/1.08))/2,borderBottomWidth:0.5}}
            />
             <Text style={styles.errorText}>{verifchamps(firstName,lastName,birthDay,gender,phone)!="ok"?verifchamps(firstName,lastName,birthDay,gender,phone):""}</Text>
            <TouchableOpacity
                style={styles.nextButton}
                onPress={async ()=>{
                  await connectedWithServer(setServerContion);
                  if(verifchamps(firstName,lastName,birthDay,gender,phone)&&serverContion=='connected'){
                    navigation.navigate('getStartedProfilePick',{signUp:route.params,firstName:firstName,lastName:lastName,birthday:birthDay,gender:gender,phone:phone,phoneWithCode:codePhone})
                }
                }}
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
    height:height/17,
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
  errorText:{
    color:'red',
    textAlign:'center',
    marginTop:height/100,
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