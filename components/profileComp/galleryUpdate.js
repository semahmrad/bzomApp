import React,{useEffect,useState} from "react";
import {Text, View, Image, StyleSheet,FlatList,ScrollView,TouchableOpacity } from "react-native";
import{useNavigation} from "@react-navigation/native"
import dimension from  './../../screenSizes/screenOfSizes'
import usedMethodes from '../../usedMethods/usedMethods'
import ImagePicker from 'react-native-image-crop-picker';
import colors from './../../projectColor/colors'

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
const DeleteImageFromArray=(arr,id,setChanged,changed)=>{

       if(changed.filter(elem=>elem.imageId==id).length>0){
            setChanged(changed.filter(elem=>elem.imageId!=id));
       }
       else{
        setChanged([{imageId:id,option:'remove'},...changed])
       }
        
        return arr.filter(element=>element.img_id!=id);

}
const addImageFromGallery=(setAlbum,album,setChanged,changed)=>{
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
       setChanged([{imageId:picAdd.img_id,imagePath:image.path,option:'add'},...changed])
        
       
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

export default function pictureProfileVisited({route}){
    const navigation=useNavigation();
    const [album,setAlbum]=useState([])
    const [changed,setChanged]=useState([]);

    const [imageOptionVisibility,setImageOptionVisibility]=useState(false);
    const [imageSelected,setImageSelected]=useState('');

    
    //const gallery=route.params.gallery;
    useEffect(()=>{
        const gallery=route.params.gallery;
        setAlbum(gallery);
     
    },[])

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
                        addImageFromGallery(setAlbum,album,setChanged,changed)
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
                        navigation.navigate('Profile',{actions:changed,})
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
                                            setAlbum(DeleteImageFromArray(album,item.img_id,setChanged,changed));
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
        //borderColor:"white",
        //borderRadius:width/20,
      
        //resizeMode:'contain',
        alignSelf:'center',
        //borderRadius:width/20,
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