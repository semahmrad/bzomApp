import React,{useEffect,useState} from "react";
import { StyleSheet, FlatList, View,  Dimensions,Image,TouchableOpacity,Text } from "react-native";
import ImagePicker from 'react-native-image-crop-picker';


let width =Dimensions.get("window").width
let height=Dimensions.get("window").height

const saveTheNewGalaryChange=(setEditGalaryVisibility)=>{
    setEditGalaryVisibility(false)
}

const addPic =(galary,setGalary)=>{
 
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
        setGalary([...galary,picAdd])
       }).catch(e=>{console.warn(error)})
}

const addPicVisibility=(galary,setGalary)=>{
    if(galary.length<6){
        return(
            <TouchableOpacity
                 onPress={()=>addPic(galary,setGalary)}
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
const makeProfilePicView=(img_path)=>{

    return (
            
        <View style={styles.makeProfilePicSpace}>
            <Image 
                source={{uri:img_path}}
                style={styles.makeprofilePic}
                resizeMode='stretch'
            />
        </View>
    )
}



export default function editAlbum(props){
const {albumImg,editGalaryVisibility,setEditGalaryVisibility}=props;
const [galary,setGalary]=useState(albumImg);

    return (
      
          <View style={styles.container}>
              {editGalaryVisibility
              ?<View>
                <View style={styles.spacePicture}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.editGalryText}>Edit Galary</Text>
                   
                            {addPicVisibility(galary,setGalary)}
                        
                            <TouchableOpacity
                                    style={styles.doneButton}
                                    onPress={()=>{saveTheNewGalaryChange(setEditGalaryVisibility)}}
                            >
                                <Text style={styles.doneButtonText}>Done</Text>
                            </TouchableOpacity>
                    </View>
                    
                    <FlatList
                    style={styles.flatList}
                    
                    data={galary}
                    keyExtractor={item=>item.img_id}
                    numColumns={3}
                    renderItem={(({item,index})=>{
                      
                        return(
                            <View>
                                <TouchableOpacity
                                    onPress={()=>{setGalary(galary.filter(image => image!=item))}}
                                    style={styles.deletePicButton}
                                >
                                    <Text style={styles.deleteIcon}>x</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                
                                >
                                    <Image 
                                    source={{uri:item.img_path}}
                                    style={styles.imgPath}
                                    resizeMode='stretch'
                                    />
                                </TouchableOpacity>
                              
                            </View>
                            
                            
                    )
                 
                })}
                />  
               <View style={styles.makeProfilePicSpace}>
                   <View style={styles.headerMakeProfilePic}>
                        <TouchableOpacity 
                            style={styles.cancelButtonHeader}
                        >
                            <Text style={styles.textButtonHeader}>Ignore</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.donelButtonHeader}
                        >
                            <Text style={styles.textButtonHeader}>Done</Text>
                        </TouchableOpacity>
                   </View>
                <Image 
                source={{uri:'https://scontent.ftun6-1.fna.fbcdn.net/v/t1.6435-9/105037100_960679387701727_7116722160625512159_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=174925&_nc_ohc=IKy5wJia4y8AX-HCcF0&tn=hOMOpji0u81ExvfW&_nc_ht=scontent.ftun6-1.fna&oh=50f54fff1ffe5fa4e7d6df31ba837a05&oe=616568F8'}}
                style={styles.makeprofilePic}
                resizeMode='stretch'
                />
                <View style={styles.discreptionContainer}>
                <Text style={styles.discreption}>if you want make this picture as profile picture click "Done" else click Ignore</Text>
                </View>
                </View>
                      
                </View>
                <TouchableOpacity
                        onPress={()=>{
                            setEditGalaryVisibility(false)
                            setGalary(albumImg)
                        }}
                        style={styles.closespace}
                    />
                   
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
  
})