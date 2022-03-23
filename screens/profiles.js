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
import getFromAsync from '../getFromAsyncStorage/getFromStorage'
import configServer from './../confProject/conf_serv'
import AsyncStorage from '@react-native-async-storage/async-storage';
let width =dimension.width
let height=dimension.heightWhenNavBar

import axios from 'axios'




  
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
 
  const getPayloadData=async(setFirstName,setLastName,setProfilImage,setToken)=>{
     await getFromAsync.getFromStorage('firstName',setFirstName);
     await getFromAsync.getFromStorage('lastName',setLastName);
     await getFromAsync.getFromStorage('profilePic',setProfilImage);
     await getFromAsync.getFromStorage('token',setToken);
   
  }

  const getGalaryApi=async(token,setAlbum)=>{
    
   
      var config = {
        method: 'post',
        url: configServer.base_url+'user/gallery',
        headers: { 
          'Authorization': 'Bearer '+token,
        },
      };
       axios(config).then(res=>{
        
        console.log(res.data.msg)
        if(res.data.code==200){
          setAlbum(res.data.gallery);
        }
        else {console.warn(res.data.msg)}
      }).catch(err=>{
        console.log(err.message)
        alert(err.message);
      })
 
    
  }

export default function profile({route}){
const bio=profileData.bio;
const matches =profileData.matches_nbr;
const nbrPictures=profileData.album.length;
//const albumImg=profileData.album;

    

  const [buttonVisibilty,setButtonVisibilty]=useState(false)
  const [editGalaryVisibility,setEditGalaryVisibility]=useState(false);
  
  const [firstName,setFirstName]=useState('');
  const [lastName,setLastName]=useState('');
  const [prfilImage,setProfilImage]=useState(null);
  const [name,setName]=useState();
  const [album,setAlbum]=useState('');
  const [token,setToken]=useState(null)
  


    useEffect(()=>{
      getPayloadData(setFirstName,setLastName,setProfilImage,setToken);
     // getFromAsync.getFromStorage('token',setToken);
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
          setName(getFullName(firstName,lastName))
          return () => backHandler.remove();
          
    },[]);
    useEffect(()=>{
      getPayloadData(setFirstName,setLastName,setProfilImage,setToken);
      //getFromAsync.getFromStorage('token',setToken);
      setName(getFullName(firstName,lastName));

    
    },);
        
useEffect(()=>{

  if(token){
    getGalaryApi(token,setAlbum);
    
  }

  
},[token])



return (
        <View style={styles.container}>
            <EditAlbum
                albumImg={album}
                setAlbum={setAlbum}
                editGalaryVisibility={editGalaryVisibility}
                setEditGalaryVisibility={setEditGalaryVisibility}
                setProfilImage={setProfilImage}

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
                //imgSrc={profilePicture}
                userName={name}
                bio={bio}
                buttonVisibilty={buttonVisibilty}
                prfilImage={prfilImage}
                setProfilImage={setProfilImage}
            />
            
           
          
            <Matches 
                matches={matches}
                nbrPictures={nbrPictures}
                setEditGalaryVisibility={setEditGalaryVisibility}
            />

            <AlbumPic
                albumImg={album}
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
