import AsyncStorage from '@react-native-async-storage/async-storage';
module.exports.getFromStorage=async(key,setState)=>{
    try{
        await AsyncStorage.getItem('token').then(value=>{
            setState(value)
        })
    }catch(err){
        console.log(err);
    }
}