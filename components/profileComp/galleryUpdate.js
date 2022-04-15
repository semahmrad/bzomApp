import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  AppState,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import dimension from './../../screenSizes/screenOfSizes';
import usedMethodes from '../../usedMethods/usedMethods';
import ImagePicker from 'react-native-image-crop-picker';
import colors from './../../projectColor/colors';
import getFromAsync from '../../getFromAsyncStorage/getFromStorage';
import configServer from './../../confProject/conf_serv';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

let width = dimension.width;
let height = dimension.heightWhenNavBar;

const testImageType = image => {
  if (image.substr(0, 4) == 'file') {
    return (
      <Image source={{uri: image}} style={styles.image} resizeMode="stretch" />
    );
  } else {
    return (
      <Image
        source={{uri: `data:image/jpeg;base64,${image}`}}
        style={styles.image}
        resizeMode="stretch"
      />
    );
  }
};

const addImageFromGallery = async (setAlbum, album, token, setApiError) => {
  await ImagePicker.openPicker({
    width: width * 2,
    height: width * 2.5,
    cropping: true,
  })
    .then(image => {
      const picAdd = {
        img_id: 'new' + (Math.random() + 1).toString(36).substring(7),
        imageBase64: image.path.toString('base64'),
      };
      setAlbum([picAdd, ...album]);
      addNewPicApis(token, image.path, setApiError);
    })
    .catch(e => {
      console.log(e);
    });
};
const imageOption = (
  token,
  imageOptionVisibility,
  setImageOptionVisibility,
  imageSelected,
  navigation,
) => {
  if (imageOptionVisibility) {
    return (
      <View style={styles.makeAsProfilePicture}>
        <TouchableOpacity
          style={styles.imageProfileButton}
          onPress={() => {
            changeProfilePicApi(token, imageSelected, navigation);
          }}>
          <Text style={styles.textButtonProfile}>Make profile picture</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageProfileButton}
          onPress={() => {
            setImageOptionVisibility(false);
          }}>
          <Text style={styles.textButtonProfile}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return null;
  }
};
//APIS###############
const addNewPicApis = async (token, imagePath, setApiError) => {
  console.log('token in apis :', token);
  const formAddImage = new FormData();
  formAddImage.append('newPic', {
    uri: imagePath,
    name: 'image',
    type: 'image/jpeg',
  });
  var config = {
    method: 'post',
    url: configServer.base_url + 'user/add/picture/',
    headers: {
      Authorization: 'Bearer ' + token,
      'content-type': 'multipart/form-data;',
      accept: 'application/json',
    },
    data: formAddImage,
  };
  await axios(config)
    .then(res => {
      setApiError(null);
      console.log('res add new pic', res.data);
      console.warn(res.data);
    })
    .catch(err => {
      setApiError(err);
      console.warn(err.message);
      console.log('err =>' + err.message);
    });
};

const deleteImageApis = async (token, imageId, setApiError) => {
  var config = {
    method: 'post',
    url: configServer.base_url + 'user/remove/picture',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    data: {imageId: imageId},
  };

  await axios(config)
    .then(res => {
      setApiError(null);
      console.log('deleteImageApis', res.data);
    })
    .catch(err => {
      setApiError(err);
      console.log('err1 =>' + err.message);
    });
};

const changeProfilePicApi = async (token, imageId, navigation) => {
  var config = {
    method: 'post',
    url: configServer.base_url + 'user/change/profile/picture',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    data: {imageId: imageId},
  };

  await axios(config)
    .then(async res => {
      if (res.data.code == 200) {
        AsyncStorage.setItem('profilePic', res.data.profilePic);
        navigation.navigate('Profile');
      }
    })
    .catch(err => {
      console.log('err1 =>' + err.message);
    });
};
const getGalaryApi = async (
  token,
  setAlbum,
  album,
  startImagePosition,
  elementNumber,
  //for test if in last gallery or not
  setLastGallery,
) => {
  var config = {
    method: 'post',
    url: configServer.base_url + 'user/gallery',
    headers: {
      Authorization: 'Bearer ' + token,
    },

    data: {start: startImagePosition, step: elementNumber},
  };
  await axios(config)
    .then(res => {
      console.log(' elementNumber = ', elementNumber);
      console.log(res.data.msg);
      console.warn(res.data.msg);
      if (res.data.code == 200) {
        if (album.length >= res.data.gallery.length) {
          console.log('length is here =>', res.data.gallery.length);
          setAlbum(album.concat(res.data.gallery));
        }
        if (res.data.gallery.length < elementNumber) {
          setLastGallery(true);
        }
      } else {
        console.warn(res.data.msg);
      }
    })
    .catch(err => {
      console.log(err.message);
      console.warn(err.message);
      alert(err.message);
    });
};
//#################

export default function pictureProfileVisited({route}) {
  const navigation = useNavigation();
  const [album, setAlbum] = useState([]);
  const [token, setToken] = useState('');
  const [imageOptionVisibility, setImageOptionVisibility] = useState(false);
  const [imageSelected, setImageSelected] = useState('');
  const [apiError, setApiError] = useState(null);
  const [startImagePosition, setStartImagePosition] = useState(7);
  const [lastGallery, setLastGallery] = useState(false);
  console.log('lastGallery : ', lastGallery);
  //let startImagePosition = 0;
  let elementNumber = 7;
  useEffect(() => {
    const gallery = route.params.gallery;
    setAlbum(gallery);

    const fetchToken = async () => {
      let token = await AsyncStorage.getItem('token');
      // getGalaryApi(token, setAlbum, album, startImagePosition, elementNumber);
      setToken(token);
    };
    fetchToken();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topBarContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <Image
            source={require('./icons/back.png')}
            style={styles.iconsTopBar}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addPicButton}
          onPress={() => {
            if (apiError) {
              alert(apiError);
            } else {
              addImageFromGallery(setAlbum, album, token, setApiError);
            }
          }}>
          <Image
            source={require('./icons/addPicture.png')}
            style={styles.iconsTopBar}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.subContainer}>
        <FlatList
          style={styles.FlatList}
          data={album}
          keyExtractor={item => item.img_id}
          numColumns={2}
          renderItem={({item, index}) => {
            return (
              <View>
                <TouchableOpacity
                  style={styles.crossButton}
                  onPress={() => {
                    if (apiError) {
                      alert(apiError);
                    } else {
                      setAlbum(
                        album.filter(element => element.img_id != item.img_id),
                      );

                      deleteImageApis(token, item.img_id, setApiError);
                    }
                  }}>
                  <View style={styles.crossIconContainer}>
                    <Image
                      style={styles.crossIcon}
                      source={require('./icons/cross.png')}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setImageOptionVisibility(true);
                    setImageSelected(item.img_id);
                  }}>
                  {testImageType(item.imageBase64)}
                </TouchableOpacity>
              </View>
            );
          }}
          onEndReached={async () => {
            if (!lastGallery) {
              setStartImagePosition(startImagePosition + elementNumber);
              await getGalaryApi(
                token,
                setAlbum,
                album,
                startImagePosition,
                elementNumber,
                setLastGallery,
              );
            }
          }}
        />
      </View>
      {imageOption(
        token,
        imageOptionVisibility,
        setImageOptionVisibility,
        imageSelected,
        navigation,
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height / 1.13,
    // backgroundColor:'#ff6d62',
  },
  topBarContainer: {
    width: width,
    backgroundColor: 'white',
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 2,
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  subContainer: {
    backgroundColor: '#dedede',
    width: width,
    height: height / 1.3,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    //elevation:50
  },
  backButton: {
    //backgroundColor:'red',
    justifyContent: 'center',
    width: usedMethodes.circleObject(7),
    height: usedMethodes.circleObject(7),
  },
  addPicButton: {
    justifyContent: 'center',
  },

  iconsTopBar: {
    width: usedMethodes.circleObject(9),
    height: usedMethodes.circleObject(9),
    tintColor: colors.baseColor,
  },
  doneButton: {
    width: width / 5.5,

    justifyContent: 'center',
  },
  doneText: {
    textAlign: 'center',
    fontWeight: '400',
    color: colors.baseColor,
    fontSize: height / 50,
  },

  FlatList: {
    marginTop: height / 19,
  },
  crossButton: {
    width: usedMethodes.circleObject(12),
    height: usedMethodes.circleObject(12),
    position: 'absolute',
    zIndex: 2,
    marginLeft: width / 45,
    marginTop: height / 60,
  },
  crossIconContainer: {
    width: usedMethodes.circleObject(12),
    height: usedMethodes.circleObject(12),
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: width / 25,
  },
  crossIcon: {
    tintColor: 'red',
    width: usedMethodes.circleObject(20),
    height: usedMethodes.circleObject(20),
    alignSelf: 'center',
  },
  image: {
    width: (width - (width / 35) * 3) / 2,
    height: ((width - (width / 35) * 3) / 2) * 1.3,
    borderWidth: width / 100,
    alignSelf: 'center',
    marginLeft: width / 35,

    marginTop: height / 40,
    borderRadius: width / 20,
  },
  makeAsProfilePicture: {
    width: width,
    height: height - (height / 1.3 + usedMethodes.circleObject(8)),
    alignItems: 'center',
  },
  imageProfileButton: {
    backgroundColor: colors.baseColor,
    height: height / 20,
    width: width / 1.3,
    marginTop:
      (height -
        (height / 1.3 + usedMethodes.circleObject(8)) -
        (height / 20) * 2) /
      3,
    borderRadius: width / 70,
    justifyContent: 'center',
    elevation: 10,
  },
  textButtonProfile: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
  },
});
