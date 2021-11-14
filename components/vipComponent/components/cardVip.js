import React, { useState } from 'react';
import { StyleSheet, Text, View,Dimensions, Image,TouchableOpacity,ScrollView,TouchableWithoutFeedback} from "react-native";
import Swiper from 'react-native-swiper'
import colors from './../../../projectColor/colors'
import optionsData from './../../../testData/vipOptions'
import mounthVipPriceData from './../../../testData/vipAccountPrices'
let width =Dimensions.get("window").width
let height=Dimensions.get("window").height
if(height>732){height=(732+height)/2}
if(height<700&&height>600){height=(732+height)/2}


    const choisOffre=(offreClicked)=>{
        const offreStyle= {
            sixMonthBackground:'white',
            sixMonthBorder:'#C0C0C0',
            threeMonthBackground:'white',
            threeMonthBorder:'#C0C0C0',
            monthBackground:'white',
            monthBorder:'#C0C0C0',
        }
        if(offreClicked.six_month){
            offreStyle.sixMonthBackground=colors.baseColor;
            offreStyle.sixMonthBorder=colors.baseColor;
        }
        else if(offreClicked.threemonth){
            offreStyle.threeMonthBackground=colors.baseColor;
            offreStyle.threeMonthBorder=colors.baseColor;
        }
        else if(offreClicked.month){
            offreStyle.monthBackground=colors.baseColor;
            offreStyle.monthBorder=colors.baseColor;
        }
        return offreStyle;
    }

    export default function cardVip(props) {
        const threMonthPrcent=(mounthVipPriceData.month_price*3*(100-mounthVipPriceData.three_month_offre))/100;
        const sixMonthPrcent=(mounthVipPriceData.month_price*6*(100-mounthVipPriceData.six_month_offre))/100;
        const [offreClicked,setoffreClicked]=useState({six_month:'',threemonth:'ok',month:''})
        const[visibilityTest,setVisibilityTest]=useState(true)
        const{visibility,setVisibility}=props
        console.log("height=============>",height)
  
      return (
        <ScrollView style={styles.container}>
           
                {visibilityTest
                ?<View style={styles.swiperContainer}> 
                    <Text style={styles.vipTitle}>Get VIP Bzom Account</Text>
                    <Swiper 
                        style={styles.swiper}
                        autoplay={true}
                    >
                        
                            {
                                optionsData.map(option=>{
                                    return(
                                        <View style={styles.ovipOptionContainer}>
                                            <Image 
                                                source={{uri:option.icon_option}}
                                                style={styles.imageOption}
                                                tintColor={option.color_option}
                                            />
                                            <Text style={styles.vipOptionTitle}>{option.title_options}</Text>
                                            <Text enum='center' style={styles.vipOptionBody}>{option.body_options}</Text>

                                        </View>
                                    );
                                })
                            }
                            
                        
                    
                    </Swiper>
                        <View style={styles.pricesContainer}>
                            <Text style={styles.save}>-{mounthVipPriceData.six_month_offre}/month</Text>
                            <TouchableOpacity 
                                style={{...styles.priceOffre,borderColor:choisOffre(offreClicked).sixMonthBorder}}
                                onPress={()=>setoffreClicked({six_month:'ok',threemonth:'',month:''})}
                            >
                                
                                <Text style={styles.monthText}>6 Months</Text>
                                <Text style={styles.pricePerMonth}>${(sixMonthPrcent/6).toFixed(2)}/moth</Text>
                                <Text style={{...styles.price,backgroundColor:choisOffre(offreClicked).sixMonthBackground}}>
                                    ${sixMonthPrcent.toFixed(2)}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={{...styles.priceOffre,borderColor:choisOffre(offreClicked).threeMonthBorder}}
                                onPress={()=>setoffreClicked({six_month:'',threemonth:'ok',month:''})}
                            >
                                <Text style={styles.monthText}>3 Months</Text>
                                <Text style={styles.pricePerMonth}>${(threMonthPrcent/3).toFixed(2)}/moth</Text>
                                <Text style={{...styles.price,backgroundColor:choisOffre(offreClicked).threeMonthBackground}}>
                                    ${threMonthPrcent.toFixed(2)}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={{...styles.priceOffre,borderColor:choisOffre(offreClicked).monthBorder}}
                                onPress={()=>setoffreClicked({six_month:'',threemonth:'',month:'ok'})}
                            >
                                <Text style={styles.monthText}>1 Months</Text>
                                <Text style={styles.pricePerMonth}>${mounthVipPriceData.month_price.toFixed(2)}/month</Text>
                                <Text style={{...styles.price,backgroundColor:choisOffre(offreClicked).monthBackground}}>
                                    ${mounthVipPriceData.month_price.toFixed(2)}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.buttons}>
                            <Text style={styles.purchaseText}>Continue</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.buttons}
                            onPress={()=>setVisibilityTest(false)}
                        >
                            <Text style={styles.purchaseText}>Close</Text>
                        </TouchableOpacity>
                </View>
         : null}
        
        </ScrollView>
      );
    }

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#1818188a',
        height:height,
        width:width,
      
    },
  
    swiperContainer:{
        backgroundColor:'white',
        width:width/1.05,
        height:height/1.45,
        alignSelf:'center',
        marginTop:height/50,
        borderRadius:width/20,
        borderWidth:1,
        borderColor:'#dbdbdb',
        elevation:25,

    },
    
    vipTitle:{
        alignSelf:'center',
        marginTop:height/80,
        fontSize:height/38,
        fontWeight:'600',
        color:colors.baseColor
    },
    ovipOptionContainer:{
       paddingLeft:width/15,
       paddingRight:width/15,
    },
    imageOption:{
        width:width/5,
        height:width/5,
        alignSelf:'center',
        marginTop:height/50,
        marginBottom:height/60
    },
    vipOptionTitle:{
        alignSelf:'center',
        fontSize:height/42,
        fontWeight:'500',
        marginBottom:height/100,

    },
    vipOptionBody:{
        alignSelf:'center',
        fontSize:height/50,
        fontWeight:'300',
        marginBottom:height/50,
    },
    pricesContainer:{
        backgroundColor:'white',
        width:width/1.05,
        height:height/4.85,
        alignSelf:'center',
        borderRadius:width/20,
        flexDirection:'row',
        justifyContent: 'space-around',
    
    },
    priceOffre:{
        backgroundColor:'white',
        width:width/3.6,
        height:height/5.5,
        borderRadius:width/30,
        borderWidth:width/90,
        //borderColor:colors.baseColor,
        //borderColor:'#C0C0C0',
        elevation:20,
        alignItems:'center',
        paddingTop:width/50,
        marginTop:height/90
       
    },
    save:{
        zIndex:10,
        position:'absolute',
        backgroundColor:'red',
        elevation:21,
        width:width/4.8,
        fontSize:height/57,
        borderRadius:width/50,
        textAlign:'center',
        marginBottom:height/30,
        marginLeft:((width/3.6)-width/4.8)/2,
        color:'white',
        fontWeight:'bold',
    },
    monthText:{
        color :'black',
        fontSize:height/40,
        fontWeight:'500',
        textAlign:'center',
    },
    pricePerMonth:{
        color :'black',
        fontSize:height/47,
        fontWeight:'400',
        marginTop:height/40,
        textAlign:'center',
        
    },
    price:{
        color :'black',
        fontSize:height/37,
        fontWeight:'600',
        marginTop:height/39.5,
        textAlign:'center',
       // backgroundColor:colors.baseColor,
        width:width/3.87,
        height:height/21.6,
        borderTopLeftRadius:width/35,
       borderTopRightRadius:width/35,
    },
    buttons:{
        backgroundColor:'red',
        width:width/1.4,
        height:height/20,
        alignSelf:'center',
        justifyContent:'center',
        marginBottom:height/60,
        borderRadius:width/35,
        backgroundColor:colors.baseColor,
    },
    purchaseText:{
        textAlign:'center',
        color:'white',
        fontSize:height/37,
        fontWeight:'700',
        elevation:25,
        
    },
  
});



