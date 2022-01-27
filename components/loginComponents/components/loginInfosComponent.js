import React,{useState} from 'react';
import { StyleSheet, Text, View, BackHandler, ScrollView,Dimensions,TouchableOpacity, ViewBase,TextInput } from "react-native";
import { Input } from 'react-native-elements';
import colors from './../../../projectColor/colors'
import { useNavigation } from '@react-navigation/native';

let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}
if(height<732){height=(732+height)/2}
export default function loginInfos(props) {
    const{setVisibility,visibility}=props;
    const [username,setUsername]=useState('');
    const [password,setPssword]=useState('');

    const navigation = useNavigation();
    const [a,setA]=useState(1)

  return (
      
      <View style={styles.container}>
        <Input
            style={styles.input}
            placeholder='Enter Password'
            onChangeText={setUsername}
            value={username}
        />
        <Input
            style={styles.input}
            placeholder='Enter Password'
            onChangeText={setPssword}
            value={password}
            secureTextEntry={true}
        />
        <View style={styles.forgetPasswordAndRegisterContainer}>
            <TouchableOpacity
                style={styles.registerButton}
            >
                <Text style={styles.forgAndRegText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
                 style={styles.forgetPasswordButton}
                 onPress={()=>setVisibility(!visibility)}
            >
                <Text style={styles.forgAndRegText}>Forget password?</Text>
            </TouchableOpacity>
        </View>  
        <TouchableOpacity
            style={styles.loginButton}
            onPress={()=>{navigation.navigate('home')}}
        >
            <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
  
    
  );
}
const styles = StyleSheet.create({
  container:{

      width:width,
      height:height/2.6,

  },
  input:{

    color:'#000',
    fontSize:height/50,
    //elevation:20,
    zIndex:1
  },
  forgetPasswordAndRegisterContainer:{
      flexDirection:'row',

  },
  registerButton:{
      width:width/4.5,
      height:height/35,
      marginLeft:width/30, 
  },
  forgetPasswordButton:{
    width:width/2.7,
    height:height/35,
    marginLeft:width/2.7, 
  },
  forgAndRegText:{
      color:'#0645AD',
  },
  loginButton:{
    backgroundColor:colors.baseColor,
    width:width/3.5,
    height:height/24,
    marginLeft:width/30, 
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:width/35,
    marginTop:height/32,
  },
  loginText:{
    color:'white',
    fontSize:height/45,
    fontWeight:'bold',

  }
});


