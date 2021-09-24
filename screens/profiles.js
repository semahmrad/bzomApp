import React,{useEffect,useState} from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity,Dimensions } from "react-native";

import ProfilePic from '../components/profileComponent/pictureComponent'
import profileData from './../testData/profile.json'
import Matches from './../components/profileComponent/matchesPicNmbComponent'
import AlbumPic from './../components/profileComponent/albumComponent'
import EditButton from './../components/profileComponent/editPicturebutton'
import SpaceCloseImagePickButton from '../components/profileComponent/spaceCloseButtonImagePicker'

let width =Dimensions.get("window").width
let height=Dimensions.get("window").height

const imgSrc=profileData.profile_Pic;
const userName=profileData.user_name;
const bio=profileData.bio;
const matches =profileData.matches_nbr;
const nbrPictures=profileData.album.length;
const albumImg=profileData.album;




export default function profile(){


const [buttonVisibilty,setButtonVisibilty]=useState(false)

    return (
        <View>
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
                imgSrc={imgSrc}
                userName={userName}
                bio={bio}
                buttonVisibilty={buttonVisibilty}
               
            />
            
           
          
            <Matches 
                matches={matches}
                nbrPictures={nbrPictures}
            />

            <AlbumPic
                albumImg={albumImg}
            />
      
        </View>
    );
}

