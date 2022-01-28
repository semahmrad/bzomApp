import ExtraDimensions from 'react-native-extra-dimensions-android';
import {StatusBar,Dimensions } from "react-native";

let heightWhenNavBar=ExtraDimensions.getRealWindowHeight()-ExtraDimensions.getStatusBarHeight()-ExtraDimensions.getSoftMenuBarHeight()
let height=ExtraDimensions.getRealWindowHeight();
let width=ExtraDimensions.getRealWindowWidth();

    const screenHeight = Dimensions.get('screen').height;
    const windowHeight = Dimensions.get('window').height;
    const navbarHeight = screenHeight - windowHeight + StatusBar.currentHeight;
    const sershHeightPhone=()=>{
    if(navbarHeight>height/10){
        console.log("navbarHeight========>",navbarHeight)
        console.log("height/10=======>",height/10)
        console.log("heightWhenNavBar=======>",heightWhenNavBar)
        return  heightWhenNavBar;
    }
    else{
        console.log("methode2",height)
        return height-navbarHeight;
    }
}

export default {
    width:width,
    heightWhenNavBar:sershHeightPhone(),
    height:height

}