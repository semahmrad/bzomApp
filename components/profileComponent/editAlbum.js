import React,{useEffect,useState} from "react";
import { StyleSheet, FlatList, View,  Dimensions,Image,TouchableOpacity,Text } from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import configServer from './../../confProject/conf_serv'
import getFromAsync from './../../getFromAsyncStorage/getFromStorage'
import dimension from '../../screenSizes/screenOfSizes'
import axios from 'axios'
let width =dimension.width
let height=dimension.heightWhenNavBar

const saveTheNewGalaryChange=(setEditGalaryVisibility)=>{
    setEditGalaryVisibility(false)
}
//Apis
const addNewPicApis=async(token,image)=>{
    const formAddImage=new FormData();
    console.log('image.mime  : ',image.mime)
    formAddImage.append('newPic',{
        uri:image.path,
        name:'image',
        type:image.mime
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
          console.log('res add new pic',res.data)

      }).catch(err=>{
          console.log('err =>'+err.message);
      })
}

const addPic =async(galary,setGalary,token,setAlbum,albumImg)=>{

    ImagePicker.openPicker({
        //freeStyleCropEnabled:true,
         width:width*2,
         height: width*2.5,
         cropping: true,
         
       }).then(image => {
        const picAdd={
            img_id:galary.length+1,
            img_path:image.path,
        }
       // setGalary([...galary,picAdd]);
       setAlbum([...albumImg,picAdd])
        addNewPicApis(token,image)
       
       }).catch(e=>{console.warn(error)})
}

const addPicVisibility=(galary,setGalary,token,setAlbum,albumImg)=>{
    if(galary.length<100){
        return(
            <TouchableOpacity
                 onPress={()=>addPic(galary,setGalary,token,setAlbum,albumImg)}
                 style={styles.addPicButton}
            >
                <Image
                    source={require('./profileComponentIcons/addPicIcon.png')}
                    style={styles.addPicIcon}
                />
            </TouchableOpacity>
        )
    }
    else return null
}
const makeProfilePicView=(makeProfilePicVisibility,setMakeProfilePicVisibility,setProfilImage,selectedPic,setEditGalaryVisibility)=>{

    if(makeProfilePicVisibility){
    return (
        <View style={styles.makeProfilePicView}>
               
        <TouchableOpacity
            onPress={()=>{
                setProfilImage(selectedPic);
                setMakeProfilePicVisibility(false)
                setEditGalaryVisibility(false)
            }}
        >
            <Text style={styles.buttons}>Make as profile picture</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={()=>{
                setMakeProfilePicVisibility(false)
                setEditGalaryVisibility(false)
            }}
        >
            <Text style={styles.buttons}>Cancel</Text>
        </TouchableOpacity>
    </View>
    )}
    else return null
}




export default function editAlbum(props){

    const {albumImg,setAlbum,editGalaryVisibility,setEditGalaryVisibility,setProfilImage}=props;
    const [galary,setGalary]=useState('');
    const [makeProfilePicVisibility,setMakeProfilePicVisibility]=useState(false);
    const [selectedPic,setSelectedPic]=useState('');
    const [token,setToken]=useState(null);

    //for test 
    const [loadPage,setLoadPage]=useState(false);
    useEffect(()=>{
        getFromAsync.getFromStorage('token',setToken);
    },[]);
    
    useEffect(()=>{
       // setGalary(albumImg)
    

    },);

    return (
      
          <View style={styles.container}>
              {editGalaryVisibility
              ?<View>
                <View style={styles.spacePicture}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.editGalryText}>Edit Galary</Text>
                   
                            {addPicVisibility(galary,setGalary,token,setAlbum,albumImg)}
                        
                            <TouchableOpacity
                                    style={styles.doneButton}
                                    onPress={()=>{saveTheNewGalaryChange(setEditGalaryVisibility)}}
                            >
                                <Text style={styles.doneButtonText}>Done</Text>
                            </TouchableOpacity>
                    </View>
                    
                    <FlatList
                    style={styles.flatList}
                    
                    data={albumImg}
                    keyExtractor={item=>item.img_id}
                    numColumns={3}
                    renderItem={(({item,index})=>{
                      
                        return(
                            <View>
                                <TouchableOpacity
                                    onPress={()=>{
                                        setGalary(galary.filter(image => image!=item))
                                        setMakeProfilePicVisibility(false)
                                    }}
                                    style={styles.deletePicButton}
                                >
                                    <Text style={styles.deleteIcon}>x</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                onPress={()=>{
                                    setSelectedPic(item.imageBase64)
                                    setMakeProfilePicVisibility(true)

                                }}
                                    
                                >
                                    <Image 
                                      
                                        source={{uri:`data:image/jpeg;base64,${item.imageBase64}`}}
                                        style={styles.imgPath}
                                        resizeMode='stretch'
                                    />
                                    
                                </TouchableOpacity>
                              
                              
                            </View>      
                    )
                 
                })}
                />  
            
        
                </View>
               
                    <TouchableOpacity
                            onPress={()=>{
                                setEditGalaryVisibility(false)
                                setGalary(albumImg)
                            }}
                            style={styles.closespace}
                    />
                   

                   {makeProfilePicView(makeProfilePicVisibility,setMakeProfilePicVisibility,setProfilImage,selectedPic,setEditGalaryVisibility)}
                </View>

            : null}        
         </View>
    );
}



const styles = StyleSheet.create({
    container:{

    },
    spacePicture:{
        position:'absolute',
        height: height/2.18999,
        width: width,
        zIndex:11,
        backgroundColor:'white',
        alignSelf: 'center',
        //flexDirection:'row',
        marginTop:10,

    },
    titleContainer:{
        flexDirection:'row',
    },
    editGalryText:{
        marginTop:height/55,
        marginLeft:width/20,
        color:'#ff7100',
        fontSize:height/45,
        fontWeight:'400'
    },
    addPicButton:{
        height:height/20,
        width:width/10,
        marginTop:height/85,
        marginLeft:width/2.26,
       
        position:'absolute',
    },
    addPicIcon:{
       height:height/20,
       width:width/10,
       tintColor:'#FF7100',
    },

    doneButton:{
        height:height/20,
        width:width/4,
        backgroundColor:'#ff7100',
        marginTop:height/85,
        marginLeft:width/2.26,
        borderRadius:width/50,
        justifyContent:'center',
    },
    doneButtonText:{
        alignSelf:'center',
        color:'white',
        fontWeight:'500',
        fontSize:height/50
    },
    deletePicButton:{
        width:width/15,
        height:height/31,
        backgroundColor:'#ff7100',
        alignItems:'center',
        borderRadius:width/20,
        position: 'absolute',
        marginTop:height/100,
        marginLeft:width/100,
        zIndex:12,
        
     
    },
    deleteIcon:{
        fontSize:height/50,
        fontWeight:'500',
        color:'white',
      
    },
 
    imgPath:{
        width:width/3.4,
        height:height/6.6,
        borderWidth:width/100,
        //borderColor:"white",
        //borderRadius:width/20,
      
        resizeMode:'contain',
        alignSelf:'center',
        //borderRadius:width/20,
        marginLeft:width/35,
        marginTop:height/40,
        borderRadius:width/20
    },

    closespace:{
        backgroundColor:'black',
        height:height/2,
        width:width,
        zIndex:12,
        position:'absolute',
        marginTop:height/2.127,
        opacity:0.5
        
    },
    makeProfilePicSpace:{
        height: height/2.18999,
        width: width,
        position:'absolute',
        zIndex:13,
        backgroundColor:'white'
    },
    headerMakeProfilePic:{
        flexDirection:'row',
        height: height/15,
        width: width,
       
       
        marginTop: height/150,
        marginBottom: height/100,
    },
    cancelButtonHeader:{
        backgroundColor:'#ff7100',
        height: height/20,
        width:width/4,
        borderRadius:width/40,
        alignItems:'center',
        justifyContent: 'center',
        marginLeft: width/65,
    },
    donelButtonHeader:{
        backgroundColor:'#ff7100',
        height: height/20,
        width:width/4,
        borderRadius:width/40,
        alignItems:'center',
        justifyContent: 'center',
        marginLeft: width/2.15,
    },
    textButtonHeader:{
        fontSize:height/45,
        color:'white',
        fontWeight:'400',
    },
    makeprofilePic:{
        width:width/2.5,
        height:width/2.5,
        borderRadius:width,
        alignSelf:'center',
      
    },
    discreptionContainer:{
        width:width/1.5,
        alignSelf:'center',
        alignItems:'center',
        marginTop:height/70,
    },
    discreption:{
        fontSize:height/45,
        color:'#ff7100',
        fontFamily:'italic'
    },


    //make as profile pic style
    makeProfilePicView:{
        position:'absolute',
        zIndex:12,
        backgroundColor:'white',
        width:width,
        height:height/7,
        alignSelf:'center',
        marginTop:height/1.265,
        paddingTop:height/65,
        //borderRadius:width/25,
        alignItems:'center',
    },
    buttons:{
        textAlign:'center',
        marginBottom:height/45,
        fontSize:height/40,
        color:'white',
        backgroundColor:'#ff7100',
        width:width/1.2,
        height:height/25,
        borderRadius:width/36,
    }

  
})  