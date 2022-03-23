import React,{useEffect,useState} from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity,BackHandler,Alert,ScrollView } from "react-native";

import Swiper from 'react-native-swiper'
import dimension from '../screenSizes/screenOfSizes';
import getFromAsync from '../getFromAsyncStorage/getFromStorage'
import configServer from './../confProject/conf_serv'
import methodsUsed from './../usedMethods/usedMethods'
import colors from './../projectColor/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import{useNavigation} from "@react-navigation/native"
let width =dimension.width
let height=dimension.heightWhenNavBar
import axios from 'axios'

const getFullName=(firstName,lastName)=>{
    let firstName1=firstName.charAt(0).toUpperCase() + firstName.slice(1);
    let lastName1=lastName.charAt(0).toUpperCase() + lastName.slice(1);
    return firstName1+' '+lastName1;
  }
const getGalaryApi=async(token,setGalary)=>{
    
    var config = {
        method: 'post',
        url: configServer.base_url+'user/gallery',
        headers: { 
          'Authorization': 'Bearer '+token,
        },
      };
       await axios(config).then(res=>{
        
        console.log(res.data.msg)
        if(res.data.code==200){
            console.log('length is here =>',res.data.gallery.length);
            setGalary(res.data.gallery);
        }
        else {console.warn(res.data.msg)}
      }).catch(err=>{
        console.log(err.message)
        alert(err.message);
      });
}

//Apis
const addNewPicApis=async(token,imagePth)=>{
    console.log('imagePth',imagePth)
    const formAddImage=new FormData();
    console.log("===============>1");
    formAddImage.append('newPic',{
        uri:imagePth,
        name:'image',
        type:'image/jpeg'
      });
    var config = {
        method: 'post',
        url: configServer.base_url+'user/add/picture/',
        headers: { 
          'Authorization': 'Bearer '+token,
          'content-type': 'multipart/form-data;',
          'accept':'application/json'
          
        },
        data : formAddImage
      };
      console.log("===============>2");
      await axios(config).then(res=>{
          console.log('res add new pic',res.data);
          console.log("===============>3");

      }).catch(err=>{
        console.log("===============>4");
          console.log('err =>'+err.message);
      });
}
const actionsFilter=(actionsArray,token)=>{
    for(let i=0;i<actionsArray.length;i++){
        if(actionsArray[i].option=='add'){
            addNewPicApis(token,actionsArray[i].imagePath)
        }
    }

}


export default function profile({route}){
    const navigation=useNavigation();
  
    //console.log('actions ===>',gallaryUpdates);
    const [gallery,setGallery]=useState([]);
    const [token,setToken]=useState();
    const [profilePic,setProfilePic]=useState();
    //name
    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [name,setName]=useState();
    //images
    const [currentImg,setCurrentImg]=useState();
    //actions from gallery update
    const [actions,setActions]=useState();
    useEffect(()=>{
        if(token){
            getGalaryApi(token,setGallery);
            
            console.log('token=>',token)
        }
        
        getFromAsync.getFromStorage('firstName',setFirstName);
        getFromAsync.getFromStorage('lastName',setLastName);
        setName(getFullName(firstName,lastName));
        console.log('name'+name)
    },[token])

    useEffect(()=>{
        if(!token){
            getFromAsync.getFromStorage('token',setToken);
            console.log("token==>",token);
           
        }
        if(!profilePic){
            getFromAsync.getFromStorage('profilePic',setProfilePic);
        }
        
        if(route.params!=undefined) {
            if(route.params.actions!=undefined){
              console.log('actions=> : ',route.params.actions);
              if(route.params.actions.length>0){
                  actionsFilter(route.params.actions,token);
              }
            }
        }
        
    },);
    useEffect(()=>{
       //console.log('test life cycle====>',gallaryUpdates[0].imageId)
    
    },);
console.log("currentImg : ",currentImg)
return (
        <View style={styles.container}>
            <ScrollView>

           
                <View style={styles.swiperAndimgContainer}>
                    <Swiper 
                                style={styles.swiper}
                                //autoplay={true}
                                showsPagination={false}
                          
                    >
                                
                            {
                            gallery.map(image=>{
                                
                                return(
                                        <View style={styles.ovipOptionContainer} key={image.img_id}>
                                            <Image 
                                                source={{uri:`data:image/jpeg;base64,${image.imageBase64}`}}
                                                
                                                style={styles.image}
                                            />
                                        </View>
                                    );
                                })
                            }
                            
                    </Swiper>
                    <TouchableOpacity
                        style={styles.galleryOptionsButton}
                        onPress={()=>{navigation.navigate('galleryUpdate',{gallery:gallery})}}
                    >
                        <Image
                            source={require('./icons/editGallery.png')}
                            style={styles.galleryOptionsIcon}
                        />
                    </TouchableOpacity>
                
                    <View style={styles.profilePicBackGround}>
                        <Image 
                            source={{uri:`data:image/jpeg;base64,${profilePic}`}}
                            style={styles.profilePic}
                            //resizeMode='contain'
                        />
                    </View>
                
                </View>
                <Text style={styles.nameText}>{name}</Text>
            </ScrollView>
          
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
      height:height/1.13,
        //backgroundColor:'red'
    },
    swiperAndimgContainer:{
        height:(height/1.9+methodsUsed.circleObject(3.2))+2,
        //backgroundColor:'red',
    },
    swiper:{
        height:height/1.75,
        marginTop:height/150,
        
    },
    image:{
        width:width,
        height:height/1.75,
        alignSelf:'center',

        borderRadius:width/25,
        borderWidth:1,
        borderColor:'black',
    },
    galleryOptionsButton:{
        width:methodsUsed.circleObject(10),
        height:methodsUsed.circleObject(10),
        backgroundColor:colors.baseColor,
        position:'absolute',
        zIndex:100,
        marginTop:height/75,
        marginLeft:width-(methodsUsed.circleObject(10)*1.3),
        borderRadius:25,
        justifyContent:'center'
    },
    galleryOptionsIcon:{
        alignSelf:'center',
        width:methodsUsed.circleObject(12),
        height:methodsUsed.circleObject(12),
      
        tintColor:'white',
        
    },
    profilePicBackGround:{
        width:methodsUsed.circleObject(3.2),
        height:methodsUsed.circleObject(3.2),
        borderRadius:width/2.5,
        position:'absolute',
        zIndex:100,
        backgroundColor:'white',
        marginTop:height/1.9,
        justifyContent:'center',
        alignSelf:'center',
     
    },
    profilePic:{
        width:methodsUsed.circleObject(3.5),
        height:methodsUsed.circleObject(3.5),
        borderRadius:width/2.5,
        alignSelf:'center',
        borderColor:'black',
        
    },
    nameText:{
        alignSelf:'center',
        fontSize:height/35,
        fontWeight:'900'
    },
    imagesOptions:{
        width:width,
        height:height/5.5,
       backgroundColor:'#e0e1e2',
      // backgroundColor:'red',
    },
    imagesOptionsButtons:{
        backgroundColor:colors.baseColor,
        height:height/23,
        width:width/1.4,
        marginTop:height/150,
        marginBottom:height/150,
        alignSelf:'center',
        justifyContent:'center',
        borderRadius:width/40
    
    },
    imagesOptionsText:{
        color:'white',
        alignSelf:'center',
    },
  
})
