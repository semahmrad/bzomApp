import React,{useEffect,useState} from "react";
import { FlatList, View, Image, StyleSheet,Dimensions } from "react-native";


let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}
let  album=[
    {
      img_id:'1',
      img_path:'https://img.brut.media/w600/thumbnail/une-vie-jeff-bezos-6bb49d57-5de5-477b-980b-14aca1156797-portrait.jpg?ts=1625501968'
    },
    {
      img_id:'2',
      img_path:'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/jeff-bezos-and-mackenzie-bezos-attend-the-2018-vanity-fair-news-photo-927381540-1547047564.jpg?crop=0.895xw:0.606xh;0.0748xw,0.0288xh&resize=480:*'
    },
    {
      img_id:'3',
      img_path:'https://static01.nyt.com/images/2021/02/09/opinion/09Omara2/09Omara2-mediumSquareAt3X.jpg'
    },
  ]

export default function pictures(props){
    const {pictures}=props
    const [testArray,setTestArray]=useState(album)



    return (
        <View style={styles.container}>
               <FlatList
                style={styles.flatList}
                data={testArray}
                keyExtractor={item=>item.img_id}
                renderItem={(({item,index})=>{
                    return(
                        <Image
                            style={styles.pictur}
                            source={{uri:item.img_path}}
                            resizeMode='contain'
                         />
                      
                )})}
            />   
        
        </View>
    );
}
const styles = StyleSheet.create({
    container:{

        width:width,
        height:(height*2)/3,

    },
    pictur:{
        height:height/2.2,
        //width:width/1.1,
        marginTop:height/50,
       //backgroundColor:'black'
    },


})