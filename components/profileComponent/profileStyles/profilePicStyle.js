import {Dimensions } from "react-native";
import dimension from '../../../screenSizes/screenOfSizes'
let width =dimension.width
let height=dimension.height

export default {

    container:{
        width:width,
        height:height/2.7,
        //backgroundColor:"#ff7100",

    },
    imageStyles:{
        //backgroundColor:'red',
        width:width/3,
        height:width/3,
        borderRadius:width/2.5,
        alignSelf:'center',
        //borderWidth:width/200,
        borderColor:'black',
        marginTop:width/15,
       // resizeMode:'s'
        
    },
    nameContainer:{
 
        alignSelf:'center',
        marginTop:height/65,
        borderRadius:width/3,
        paddingLeft:width/20,
        paddingRight:width/20,
    },
    nameText:{
        fontSize:height/32,
        alignSelf:'center',
        color:'black',
        fontStyle:'italic',
        fontWeight:"normal"
    }, 

    //vip account#############################
    imageStylesVip:{
       // backgroundColor:'red',
        width:width/2.2,
        height:height/4.5,
        borderRadius:width/2.5,
        alignSelf:'center',
        borderWidth:width/60,
        borderColor:'#FFD700',
        marginTop:width/15
    },
    nameContainerVip:{
        backgroundColor:'#FFD700',
       // width:width/2,
        alignSelf:'center',
        marginTop:height/65,
        borderRadius:width/2,
        paddingLeft:width/20,
        paddingRight:width/20,
    },
   nameTextVip:{
        fontSize:height/32,
        alignSelf:'center',
        color:'white',
        //fontWeight:'bold',
        fontStyle:'italic'
    }, 




    //commune 

    bioContainer:{
        width:width/1.5,
        height:height/10,
        //backgroundColor:'red',
        alignSelf:'center',
        paddingTop:width/30
    },
    bioText:{
        fontSize:width/25,
        alignSelf:'center',
        color:"#777777",
        fontWeight:"400",
    }
}