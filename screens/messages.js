    import React, {useState } from 'react'
    import { View, Text,TextInput, Dimensions,StyleSheet,Image, FlatList, ScrollView, TouchableOpacity,SafeAreaView } from 'react-native'
    import users from '../testData/users';
    import descuChat from '../testData/chatData'
    //colors 
    import colors from './../projectColor/colors'
    import ButtomTabs from './../navigation/buttomNavigationOptions'
    import dimension from '../screenSizes/screenOfSizes'
    let height=dimension.heightWhenNavBar;
    let width=dimension.width;
   
    

    const getLastMessageWithPartnair=(descuChat,searchInput)=>{
    const arrayMsgData=[]


    descuChat.map((descu,index)=>{
        const objectMsgData={
            partnair:{},
            lastMsg:{},
            sended:'',
            id:''
            }
        objectMsgData.partnair=descu.partnair
        objectMsgData.lastMsg=descu.messages[descu.messages.length-1]
        objectMsgData.sended=descu.messages[descu.messages.length-1].is_emiteur
        objectMsgData.id=index+''
        arrayMsgData.push(objectMsgData)

    });
    if(!searchInput){return arrayMsgData}
    else{
        const res= arrayMsgData.filter(messageObject=>messageObject.partnair.name.toUpperCase().includes(searchInput.toUpperCase()));
        return res
    }
   
  
   
    }

    const descuRenderByUser=(descuChat,username,arraymsg)=>{
       
       descuChat.map(descu=>{
            
            if(descu.partnair.name==username){
                arraymsg=descu.messages
            }
            else return "no descu with"+descu.partnair.name
        });
       return  arraymsg;
    }



    export default function messages({navigation}) {
        //const[msgArray,setMsgArray]=useState([])
        const [searchInput,setSearchInput]=useState('')
        console.log('height====message=======>',height)

        

    return(
        <View style={styles.container} >
            <ButtomTabs/>
            <View style={styles.searchZone}>
                <Image
                    source={require('./../components/messagesComponents/messagesIcons/search.png')}
                    style={styles.searchicon}
                />
                <TextInput
                    style={styles.searchInput}
                    placeholder="search ..."
                    value={searchInput}
                    onChangeText={setSearchInput}
                />
            </View>
           
            
                <View style={{height:height/6.5,backgroundColor:'white'}}>
                  
                    <ScrollView
                    horizontal
                    >
                        <View style={styles.matchesUsers}>
                            {users.map(user=>(
                                <View style={styles.user} key={user.id}>
                                    <TouchableOpacity
                                        onPress={()=>navigation.navigate('chat',{user:user,discution:null})}
                                    >
                                        <Image source={{uri:user.image}} style={styles.image} />
                                    </TouchableOpacity>
                                    
                                    
                                </View>
                            ))}

                        
                        </View>
                    </ScrollView>  
                    <View style={styles.msgTexContainer}>
                        <Text style={styles.msgText}>Messages</Text>
                    </View>
                </View>
                
            
                    
                        <View style={{width:width,height:height/1.37,backgroundColor:'#efefef',}}>
                            <FlatList
                            
                                data={getLastMessageWithPartnair(descuChat,searchInput)}
                                keyExtractor={item=>item.id}
                                renderItem={({item})=>{
  
                                    return(                               
                                    <TouchableOpacity 
                                        onPress={()=>navigation.navigate('chat',{partnair:item.partnair,discution:descuRenderByUser(descuChat,item.partnair.name)},)}
                                        style={styles.itemConatiner}>
                                    
                                        <Image source={{uri:item.partnair.avatar}} style={{width:width/6,height:width/6,borderRadius:width/6,margin:width/70,borderWidth:width/180,borderColor:'white'}} />  
                                        <View style={styles.itemView}>  
                                            <Text numberOfLines={1} style={{fontSize:width/23,fontWeight:"bold",marginTop:width/70}}>{item.partnair.name}</Text>
                                            <Text numberOfLines={1} style={{marginLeft:width/45,marginBottom:width/45,fontSize:width/23,height:height/21}}>{item.lastMsg.content}</Text>
                                        </View>
                                        <Text numberOfLines={1} style={{height:height/25,width:width/3.5,fontWeight:'bold',fontSize:width/30 ,alignItems:'flex-end'}}>{item.lastMsg.sended_at}</Text>
                                        
                                    </TouchableOpacity>
                                )}}
                            />
                             
                        </View>
                   
         
        </View>
    );
    }


    const styles = StyleSheet.create({
    container: {
       
      //  width:width,
      // height:height/1.1,
      //elevation:110
       
    },
    searchZone:{
        flexDirection:'row',
        backgroundColor:'#e4e6e8',
        width:width/1.2,
        height:height/22,
        alignSelf:'center',
        marginTop:height/100,
        borderRadius:width/10,
        elevation:4
    },

    searchicon:{
        width:width/14,
        height:height/28,
        marginTop:height/180,
        marginLeft:width/100,
        tintColor:colors.baseColor,
       
    },
    searchInput:{
        
        marginLeft:width/70,
        width:width/1.5,
        height:height/20,
        color:'black',
        fontSize:height/57
       
    },
    justBackground:{
    // padding:width/30,
    // backgroundColor: '#131d23',
        //flex:1,
        //width:"100%"
    },
    msgText:{
        color:colors.baseColor,
        fontWeight:"500",
        fontSize:width/23,
        width:width,
        height:height/29,
        marginLeft:width/40

        },
        msgTexContainer:{
            //backgroundColor:'#efefef',
            position:'absolute',
           
            marginTop:height/8.5
            
        },

    matchesUsers:{
        flexDirection:"row",
        //flexWrap:"wrap",
        //backgroundColor:'red',
        //width:'100%',
        height:width/4,
        
        
    
        //marginBottom:width/(width/1.01),
        
    },



    user:{
        width:width/5,
        height:width/5,
        margin:width/90,
        borderWidth:width/180,
        borderColor:"white",
        borderRadius:width/7.2,
        padding:width/120,
        

        
    },
    image:{
        width:width/5.8,
        height:width/5.8,
        borderRadius:width/8,
       // backgroundColor:'red'
    },
    itemConatiner:{
        alignSelf:'center',
        width:width/1.01,
        height:height/10,
        backgroundColor:'white',
        //borderWidth:width/500,
        flexDirection:'row',
       // backgroundColor:'#e7eaef',
        borderRadius:width/25,
        marginTop:width/80,
        elevation:2

    },
    itemView:{
        width:width/2.1,
        height:width/5.5,
    // flexDirection:'row',
        //backgroundColor:'white',
    }



    });