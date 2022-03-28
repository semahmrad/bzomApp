import React,{useEffect,useState} from "react";
import {Text, View, Image, StyleSheet,FlatList,ScrollView,TouchableOpacity } from "react-native";
import{useNavigation} from "@react-navigation/native"
import dimension from  './../../screenSizes/screenOfSizes'
import usedMethodes from '../../usedMethods/usedMethods'
import ImagePicker from 'react-native-image-crop-picker';
import colors from './../../projectColor/colors'
import getFromAsync from '../../getFromAsyncStorage/getFromStorage'
import configServer from './../../confProject/conf_serv'
import axios from 'axios'

let width =dimension.width
let height=dimension.heightWhenNavBar


const testImageType=(image)=>{
    if(image.substr(0,4)=='file'){
        console.log('I am here =========>',image.substr(4))
        return(
            <Image 
                source={{uri:image}}
                style={styles.image}
                resizeMode='stretch'
            />
        )
    }
    else{
        return(
            <Image 
                source={{uri:`data:image/jpeg;base64,${image}`}}
                style={styles.image}
                resizeMode='stretch'
            />
        )
    }
}
const DeleteImageFromArray=(arr,id,setActions,actions)=>{

       if(actions.filter(elem=>elem.imageId==id).length>0){
            setActions(actions.filter(elem=>elem.imageId!=id));
       }
       else{
        setActions([{imageId:id,option:'remove'},...actions])
       }
        
        return arr.filter(element=>element.img_id!=id);

}
const addImageFromGallery=(setAlbum,album,setActions,actions)=>{
    ImagePicker.openPicker({
       
         width:width*2,
         height: width*2.5,
         cropping: true,
         
       }).then(image => {
        const picAdd={
            img_id:'new'+(Math.random() + 1).toString(36).substring(7),
            imageBase64:image.path.toString('base64'),
        }
      
       setAlbum([picAdd,...album]);
       setActions([{imageId:picAdd.img_id,imagePath:image.path,option:'add'},...actions])
        
       
       }).catch(e=>{console.warn(e)})
}
const imageOption=(imageOptionVisibility,setImageOptionVisibility,imageSelected)=>{
    if(imageOptionVisibility){
        return(
            <View style={styles.makeAsProfilePicture}>
                <TouchableOpacity 
                    style={styles.imageProfileButton}
                    onPress={()=>{alert(imageSelected)}}
                >
                    <Text style={styles.textButtonProfile}>Make profile picture</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.imageProfileButton}
                    onPress={()=>{setImageOptionVisibility(false)}}
                >
                    <Text style={styles.textButtonProfile}>Cancel</Text>
                </TouchableOpacity>
            </View>
        );
    }else{return null}
}
//APIS###############
const addNewPicApis=async(token,imagePath)=>{
    console.log('imagePth',imagePath)
    const formAddImage=new FormData();
    formAddImage.append('newPic',{
        uri:imagePath,
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
      await axios(config).then(res=>{
          console.log('res add new pic',res.data);
      }).catch(err=>{
          console.log('err =>'+err.message);
      });
}

const deleteImageApis=async(token,imageId)=>{

    var config = {
        method: 'post',
        url: configServer.base_url+'user/remove/picture',
        headers: { 
          'Authorization': 'Bearer '+token,
          'Content-Type': 'application/json'
          
        },
        data : {"imageId":imageId}
      };
     
      await axios(config).then(res=>{
          console.log('deleteImageApis',res.data);
      }).catch(err=>{
          console.log('err1 =>'+err.message);
      });
}


const doActions= async(actions,token,setActions)=>{
    actions.forEach(action => {
        if(action.option='add'){
            setTimeout(()=>{
                addNewPicApis(token,action.imagePath);
            },100);
        }
        if(action.option='remove'){
            setTimeout(()=>{
                deleteImageApis(token,action.imageId);
            },100)
           
        }
    });
}
export default function pictureProfileVisited({route}){
    const navigation=useNavigation();
    const [album,setAlbum]=useState([])
    const [actions,setActions]=useState([]);

    const [token,setToken]=useState('');
    const [imageOptionVisibility,setImageOptionVisibility]=useState(false);
    const [imageSelected,setImageSelected]=useState('');

    console.log('Actions==>',actions);
    //const gallery=route.params.gallery;
    useEffect(()=>{
        const gallery=route.params.gallery;
        setAlbum(gallery);
     
    },[])
    useEffect(()=>{
        if(!token){
            getFromAsync.getFromStorage('token',setToken);
            console.log("token==>",token); 
        }
    },)

    return (
        <View style={styles.container}>
            <View style={styles.topBarContainer}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={()=>{
                        navigation.navigate('Profile')
                    }}
                >
                    <Image 
                        source={require('./icons/back.png')}
                        style={styles.iconsTopBar}
                    />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.addPicButton}
                    onPress={()=>{
                        addImageFromGallery(setAlbum,album,setActions,actions)
                    }}
                >
                    <Image 
                        source={require('./icons/addPicture.png')}
                        style={styles.iconsTopBar}
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.doneButton}
                    onPress={()=>{
                         doActions(actions,token,setActions)
                        navigation.navigate('Profile',{reload:true});
                    }}
                >
                    <Text style={styles.doneText}>Done</Text>
                </TouchableOpacity>
            </View>
            
            
            <View style={styles.subContainer}>
                <FlatList
                    
                        style={styles.FlatList}
                        data={album}
                        keyExtractor={item=>item.img_id}
                        numColumns={2}
                        renderItem={(({item,index})=>{
                        
                            return(
                                <View>
                                    <TouchableOpacity
                                        style={styles.crossButton}
                                        onPress={()=>{
                                            setAlbum(DeleteImageFromArray(album,item.img_id,setActions,actions));
                                            //changetArray.push();
                                           
                                        }}

                                    >
                                        <View style={styles.crossIconContainer}>
                                            <Image
                                                style={styles.crossIcon}
                                                source={require('./icons/cross.png')}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                
                                
                                    <TouchableOpacity
                                        onPress={()=>{
                                            setImageOptionVisibility(true);
                                            setImageSelected(item.img_id);
                                        }}
                                    >
                                        {testImageType(item.imageBase64)}
                                        
                                    </TouchableOpacity>
                                </View>

                            )
                    
                    })}
                />  
            </View>
            {imageOption(imageOptionVisibility,setImageOptionVisibility,imageSelected)}
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        width:width,
        height:height/1.13,
       // backgroundColor:'#ff6d62',
    },
    topBarContainer:{
        width:width,
        backgroundColor:'white',
        flexDirection:"row",
        position:'absolute',
        zIndex:2,
        justifyContent:'space-between',
        alignSelf:'center',
    
    },
    subContainer:{
        
        backgroundColor:'#dedede',
        width:width,
        height:height/1.3,
        borderBottomColor:'black',
        borderBottomWidth:1,
        //elevation:50
    },
    backButton:{
        //backgroundColor:'red',
        justifyContent:'center',
        width:usedMethodes.circleObject(7),
        height:usedMethodes.circleObject(7),
    },
    addPicButton:{
        justifyContent:'center'
    },
   
    iconsTopBar:{
        
        width:usedMethodes.circleObject(9),
        height:usedMethodes.circleObject(9),
        tintColor:colors.baseColor,
        
    },
    doneButton:{
  
        width:width/5.5,
        
        justifyContent:'center',
      
    },
    doneText:{
        textAlign:'center',
        fontWeight:'400',
        color:colors.baseColor,
        fontSize:height/50
    },
   
    FlatList:{
        marginTop:height/19
    },
    crossButton:{
      
        width:usedMethodes.circleObject(12),
        height:usedMethodes.circleObject(12),
        position:'absolute',
        zIndex:2,
        marginLeft:width/45,
        marginTop:height/60,
    },
    crossIconContainer:{
        width:usedMethodes.circleObject(12),
        height:usedMethodes.circleObject(12),
        justifyContent:'center',
        backgroundColor:'white',
        borderRadius:width/25,
    },
    crossIcon:{
        tintColor:'red',
        width:usedMethodes.circleObject(20),
        height:usedMethodes.circleObject(20),
        alignSelf:'center'
    },
    image:{
        width:(width-(width/35)*3)/2,
        height:((width-(width/35)*3)/2)*1.3,
        borderWidth:width/100,
        alignSelf:'center',
        marginLeft:width/35,
       
        marginTop:height/40,
        borderRadius:width/20
    },
    makeAsProfilePicture:{
       
        width:width,
        height:height-(height/1.3+usedMethodes.circleObject(8)),
        alignItems:'center'
    },
    imageProfileButton:{
        backgroundColor:colors.baseColor,
        height:height/20,
        width:width/1.3,
        marginTop:((height-(height/1.3+usedMethodes.circleObject(8)))-((height/20)*2))/3,
        borderRadius:width/70,
        justifyContent:'center',
        elevation:10
    },
    textButtonProfile:{
        textAlign:'center',
        color:'white',
        fontWeight:'600'
    },
})