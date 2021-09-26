import React,{useEffect,useState} from "react";
import { StyleSheet, FlatList, View,  Dimensions,Image,TouchableOpacity,Text } from "react-native";



let width =Dimensions.get("window").width
let height=Dimensions.get("window").height

const saveTheNewGalaryChange=(setEditGalaryVisibility)=>{
    setEditGalaryVisibility(false)
}

export default function editAlbum(props){
const {albumImg,editGalaryVisibility,setEditGalaryVisibility}=props

    return (
      
          <View style={styles.container}>
              {editGalaryVisibility
              ?<View>
                <View style={styles.spacePicture}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.editGalryText}>Edit Galary</Text>
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
                                    onPress={()=>{alert('delete')}}
                                    style={styles.deletePicButton}
                                >
                                    <Text style={styles.deleteIcon}>x</Text>
                                </TouchableOpacity>
                                <Image 
                                source={{uri:item.img_path}}
                                style={styles.imgPath}
                                resizeMode='stretch'
                                />
                            </View>

                    )})}
                />  
            

                </View>
                <TouchableOpacity
                        onPress={()=>setEditGalaryVisibility(false)}
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
    doneButton:{
        height:height/20,
        width:width/4,
        backgroundColor:'#ff7100',
        marginTop:height/85,
        marginLeft:width/2.28,
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
  
})