import ScreenSize from '../screenSizes/screenOfSizes'
let height=ScreenSize.height;
let width=ScreenSize.width;
module.exports.circleObject=(div)=>{
    if(width*2>=height){
       return  height/(div*2);
    }
    else if(width*2<height){
       return width/div
    }

}
