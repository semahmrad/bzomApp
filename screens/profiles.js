import React,{useEffect,useState} from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity,Dimensions } from "react-native";

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
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
      

  }
  


export default function profile(){

 
      

    

const [buttonVisibilty,setButtonVisibilty]=useState(false)
const [editGalaryVisibility,setEditGalaryVisibility]=useState(false)
const [imagePath,setImagePath]=useState(albumImg[0].img_path);

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
                imgSrc={albumImg[0].img_path}
                userName={userName}
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
