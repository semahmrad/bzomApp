    import React, {useState } from 'react'
    import { View, Text, Dimensions,StyleSheet,Image, FlatList, ScrollView, TouchableOpacity,SafeAreaView } from 'react-native'
    import users from '../testData/users';
    import messageData from '../testData/messageData'
    import descuChat from '../testData/chatData'

    let width =Dimensions.get("window").width
    let height =Dimensions.get("window").height


    const getLastMessageWithPartnair=(descuChat)=>{
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
    return arrayMsgData
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
        const[msgArray,setMsgArray]=useState([])
    

    return(
        <SafeAreaView style={styles.container} >
            
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
                
            
                    
                        <View style={{width:width,height:height/1.44,marginBottom:width/7.2,backgroundColor:'#efefef',}}>
                            <FlatList
                            
                                data={getLastMessageWithPartnair(descuChat)}
                                keyExtractor={item=>item.id}
                                renderItem={({item})=>{
  
                                    return(                               
                                    <TouchableOpacity 
                                        onPress={()=>navigation.navigate('chat',{partnair:item.partnair,discution:descuRenderByUser(descuChat,item.partnair.name,msgArray)},)}
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
                    
                    
                
                
            
        </SafeAreaView>
    );
    }


    const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        width:width,
        height:height
        
        //marginTop:width/15
    },
    justBackground:{
    // padding:width/30,
    // backgroundColor: '#131d23',
        //flex:1,
        //width:"100%"
    },
    msgText:{
        color:"#ff7100",
        fontWeight:"500",
        fontSize:width/23,
        //backgroundColor:'black',

        width:width,
        height:height/29,
        //marginBottom:(width)/width/1.2,
        //marginTop:(width)/width/1.2,
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
        borderRadius:width/18,
        marginTop:width/80

    },
    itemView:{
        width:width/2.1,
        height:width/5.5,
    // flexDirection:'row',
        //backgroundColor:'white',
    }



    });