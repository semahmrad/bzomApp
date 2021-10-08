import React,{useEffect,useState} from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity,Dimensions } from "react-native";

import ProfilePic from '../components/profileComponent/pictureComponent'
import profileData from './../testData/profile.json'
import Matches from './../components/profileComponent/matchesPicNmbComponent'
import AlbumPic from './../components/profileComponent/albumComponent'
import EditButton from './../components/profileComponent/editPicturebutton'
import SpaceCloseImagePickButton from '../components/profileComponent/spaceCloseButtonImagePicker'
import EditAlbum from './../components/profileComponent/editAlbum'


const imgSrc=profileData.profile_Pic;
const userName=profileData.user_name;
const bio=profileData.bio;
const matches =profileData.matches_nbr;
const nbrPictures=profileData.album.length;
const albumImg=profileData.album;




export default function profile(){


const [buttonVisibilty,setButtonVisibilty]=useState(false)
const [editGalaryVisibility,setEditGalaryVisibility]=useState(false)
const [imagePath,setImagePath]=useState(albumImg[0].img_path)

    return (
        <View>
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
      
        </View>
    );
}

