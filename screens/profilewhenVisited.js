import React,{useEffect,useState} from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity,Dimensions } from "react-native";

import ProfilePic from '../components/profileComponent/pictureComponent'
import profileData from './../testData/profile.json'
import Matches from './../components/profileComponent/matchesPicNmbComponent'
import AlbumPic from './../components/profileComponent/albumComponent'


let width =Dimensions.get("window").width
let height=Dimensions.get("window").height


export default function profileVisited(props){

    const{profilePicture,userName,bio,matches,nbrPictures,albumImg}=props

    return (

           <View>
                <ProfilePic
                    imgSrc={profilePicture}
                    userName={userName}
                    bio={bio}
                    
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

