
import { Dimensions } from "react-native";
let width =Dimensions.get("window").width
let height=Dimensions.get("window").height

export default 
{
    //add pic
    widthAddPic:width*2,
    heightAddPic:width*2,
    croppingAddPic: true,
    //profilePicture

    widthProfilePic:width*2,
    heightProfilePic:width*2,
    croppingProfilePic: true,

    
}