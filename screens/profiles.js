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
  const getFromAsyncStorage= async (key,setValue)=>{
    try{
    await AsyncStorage.getItem(key).then(res=>{
      setValue(res)
    });
  }catch(err){console.log('get from ',key,err);}
  }
  const getPayloadData=async(setFirstName,setLastName,setProfilImage)=>{
    await getFromAsyncStorage('firstName',setFirstName);
    await getFromAsyncStorage('lastName',setLastName);
    await getFromAsyncStorage('profilePic',setProfilImage);
   
  }

export default function profile({route}){
    

  const [buttonVisibilty,setButtonVisibilty]=useState(false)
  const [editGalaryVisibility,setEditGalaryVisibility]=useState(false);
  
  const [firstName,setFirstName]=useState('');
  const [lastName,setLastName]=useState('');
  const [prfilImage,setProfilImage]=useState(null);
  const [name,setName]=useState();
  
  
  const [token,setToken]=useState('')

    useEffect(()=>{
      getPayloadData(setFirstName,setLastName,setProfilImage);
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
          setName(getFullName(firstName,lastName))
          return () => backHandler.remove();
          
    },[]);
    useEffect(()=>{
      getPayloadData(setFirstName,setLastName,setProfilImage);
      setName(getFullName(firstName,lastName))
          
          
    },);
      


useEffect(()=>{
    getToken(setToken);
},[])


//console.log('barer',token);

return (
        <View style={styles.container}>
            <EditAlbum
                albumImg={albumImg}
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
