import React,{useEffect,useState} from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity,BackHandler,Alert } from "react-native";

import ProfilePic from '../components/profileComponent/pictureComponent'
import profileData from './../testData/profile.json'
import Matches from './../components/profileComponent/matchesPicNmbComponent'
import AlbumPic from './../components/profileComponent/albumComponent'
import EditButton from './../components/profileComponent/editPicturebutton'
import SpaceCloseImagePickButton from '../components/profileComponent/spaceCloseButtonImagePicker'
import EditAlbum from './../components/profileComponent/editAlbum'
import ButtomTabs from './../navigation/buttomNavigationOptions'
import dimension from '../screenSizes/screenOfSizes';
import client from '../confProject/config_server'
import AsyncStorage from '@react-native-async-storage/async-storage';
let width =dimension.width
let height=dimension.heightWhenNavBar

import axios from 'axios'
const imgSrc=profileData.profile_Pic;
const userName=profileData.user_name;
const bio=profileData.bio;
const matches =profileData.matches_nbr;
const nbrPictures=profileData.album.length;
const albumImg=profileData.album;

const getToken=async(setToken)=>{
    
    try{
        await AsyncStorage.getItem('token').then(res=>{
            setToken(res)
        });
       // console.log('getToken=',token);
    
        
    }catch(err){console.log('err=',err)}
  }

const justTestJWT =async(token)=>{
    console.log('Bearer',token)
    var config = {
        method: 'post',
        url: 'http://192.168.1.253:3000/user/jwtTest',
        headers: { 
          //'Authorization': `Bearer ${token}`
          'Authorization': 'Bearer '+token
        }
      };
      
      await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
      
  }
  
  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };



  const getFullName=(firstName,lastName)=>{
    let firstName1=firstName.charAt(0).toUpperCase() + firstName.slice(1);
    let lastName1=lastName.charAt(0).toUpperCase() + lastName.slice(1);
    return firstName1+' '+lastName1;
  }

export default function profile({route}){
    let profilePicture =route.params.profilePicture;
    let name=getFullName(route.params.firstName,route.params.lastName);
    console.log('=========>',profilePicture.substr(1,10))

    useEffect(()=>{
    
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
          return () => backHandler.remove();
    },[]);
      

    

const [buttonVisibilty,setButtonVisibilty]=useState(false)
const [editGalaryVisibility,setEditGalaryVisibility]=useState(false)
const [imagePath,setImagePath]=useState(profilePicture);

const [token,setToken]=useState('')
useEffect(()=>{
    getToken(setToken);
},[])
justTestJWT(token);

//console.log('barer',token);

return (
        <View style={styles.container}>
            <EditAlbum
                albumImg={albumImg}
                editGalaryVisibility={editGalaryVisibility}
                setEditGalaryVisibility={setEditGalaryVisibility}
                setImagePath={setImagePath}

            />
            <SpaceCloseImagePickButton
                setButtonVisibilty={setButtonVisibilty}
                buttonVisibilty={buttonVisibilty}
            />

           

            <EditButton
             setButtonVisibilty={setButtonVisibilty}
             buttonVisibilty={buttonVisibilty}
          
            />

            <ProfilePic
                setButtonVisibilty={setButtonVisibilty}
                imgSrc={profilePicture}
                userName={name}
                bio={bio}
                buttonVisibilty={buttonVisibilty}
                imagePath={imagePath}
                setImagePath={setImagePath}
            />
            
           
          
            <Matches 
                matches={matches}
                nbrPictures={nbrPictures}
                setEditGalaryVisibility={setEditGalaryVisibility}
            />

            <AlbumPic
                albumImg={albumImg}
            />
            <ButtomTabs
                style={styles.buttomComponent}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
      height:height,
    },
   
   
 
  
})
