import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  BackHandler,
  Alert,
  ScrollView,
  AppState,
} from 'react-native';

import Swiper from 'react-native-swiper';
import ImageViewer from 'react-native-image-zoom-viewer';
import dimension from '../screenSizes/screenOfSizes';
import getFromAsync from '../getFromAsyncStorage/getFromStorage';
import configServer from './../confProject/conf_serv';
import methodsUsed from './../usedMethods/usedMethods';
import colors from './../projectColor/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
let width = dimension.width;
let height = dimension.heightWhenNavBar;
import axios from 'axios';

const getFullName = (firstName, lastName) => {
  let firstName1 = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  let lastName1 = lastName.charAt(0).toUpperCase() + lastName.slice(1);
  return firstName1 + ' ' + lastName1;
};
const getGalaryApi = async (
  token,
  setGalary,
  startImagePosition,
  elementNumber,
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
      console.log(res.data.msg);
      if (res.data.code == 200) {
        console.log('length is here =>', res.data.gallery.length);
        setGalary(res.data.gallery);
      } else {
        console.warn(res.data.msg);
      }
    })
    .catch(err => {
      console.log(err.message);
      alert(err.message);
    });
};

const getHashtagsApi = async (token, setHashtagsSelected) => {
  var config = {
    method: 'post',
    url: configServer.base_url + 'user/get/hashtags',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  await axios(config)
    .then(result => {
      if (result.data.code == 200) {
        setHashtagsSelected(result.data.hashtags);
      }
    })
    .catch(err => {
      console.log('err ', err);
      alert(err);
    });
};
const calcAge = dayBirth => {
  //now
  let birthDay = new Date(dayBirth);
  let daysBirth = birthDay.getDate();
  let monthBirth = birthDay.getMonth() + 1;
  let yearBirth = birthDay.getFullYear();
  //birth
  let daysNow = new Date().getDate();
  let monthNow = new Date().getMonth() + 1;
  let yearNow = new Date().getFullYear();

  if (daysNow - daysBirth < 0) {
    monthNow -= 1;
  }
  if (monthNow - monthBirth < 0) {
    yearNow -= 1;
  }
  return yearNow - yearBirth;
};
export default function profile({route}) {
  const navigation = useNavigation();

  //console.log('actions ===>',gallaryUpdates);
  const [gallery, setGallery] = useState([]);
  //   const [token, setToken] = useState();
  const [profilePic, setProfilePic] = useState();
  //name
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  //birthday
  const [age, setAge] = useState();
  //actions from gallery update
  const [reload, setReload] = useState();
  let token;
  let birthday = '';
  //gallery step and start position

  let startImagePosition = 0;
  let elementNumber = 7;

  //hashtagsSelected
  const [hashtagsSelected, setHashtagsSelected] = useState();

  useEffect(() => {
    const fetchToken = async () => {
      //   console.log('profile useEffect was called');

      token = await AsyncStorage.getItem('token');
      birthday = await AsyncStorage.getItem('birthday');
      setAge(calcAge(birthday));
      //get hashtags
      getHashtagsApi(token, setHashtagsSelected);

      getGalaryApi(token, setGallery, startImagePosition, elementNumber);

      getFromAsync.getFromStorage('firstName', setFirstName);
      getFromAsync.getFromStorage('lastName', setLastName);
      getFromAsync.getFromStorage('profilePic', setProfilePic);
    };
    fetchToken();
  }, []);

  //exec when navigate
  useEffect(() => {
    let startImagePosition = 0;
    let elementNumber = 7;
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('hey=============>');
      //for selected hashtags items

      const fetchToken = async () => {
        token = await AsyncStorage.getItem('token');
        //get hashtags
        getHashtagsApi(token, setHashtagsSelected);

        //get gallery images
        getGalaryApi(token, setGallery, startImagePosition, elementNumber);

        console.log('sett gallary ==>', gallery.length);
        getFromAsync.getFromStorage('profilePic', setProfilePic);
      };
      fetchToken();
    });

    return unsubscribe;
  }, [navigation]);

  //test app state

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);
  console.log('appStateVisible : ', appStateVisible);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.swiperAndimgContainer}>
          <Swiper
            index={0}
            onIndexChanged={async index => {
              console.warn('current index : ', index);
            }}
            renderPagination={(index, total, context) => {
              console.warn('current index : ', index);
            }}
            style={styles.swiper}
            showsPagination={false}>
            {gallery.map(image => {
              return (
                <View style={styles.ovipOptionContainer} key={image.img_id}>
                  <Image
                    source={{
                      uri: `data:image/jpeg;base64,${image.imageBase64}`,
                    }}
                    style={styles.image}
                  />
                </View>
              );
            })}
          </Swiper>
          <TouchableOpacity
            style={styles.galleryOptionsButton}
            onPress={() => {
              navigation.navigate('galleryUpdate', {gallery: gallery});
            }}>
            <Image
              source={require('./icons/editGallery.png')}
              style={styles.galleryOptionsIcon}
            />
          </TouchableOpacity>

          <View style={styles.profilePicBackGround}>
            <Image
              source={{uri: `data:image/jpeg;base64,${profilePic}`}}
              style={styles.profilePic}
              //resizeMode='contain'
            />
          </View>
        </View>
        <Text style={styles.nameText}>
          {getFullName(firstName, lastName)} ,{age}
        </Text>
        {/* Personal Information  */}
        <View style={styles.PersonalInfo}>
          <View style={styles.titleContainer}>
            <Text style={styles.PersonalInfoTitle}>Personal Information</Text>
            <TouchableOpacity
              style={styles.editPersonalInfoButton}
              onPress={() => {
                alert('change the personal information');
              }}>
              <View style={styles.iconAndContentConainer}>
                <Image
                  source={require('./icons/editGallery.png')}
                  style={styles.personalInfoEditIcon}
                />
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.livingIn}>Living in : Tunisie</Text>
        </View>
        <TouchableOpacity
          style={styles.hashtagsConstainer}
          onPress={() => {
            navigation.navigate('updateHashtags');
          }}>
          <Text style={styles.hashtagsTitle}>Hashtags</Text>
          <View>
            <Image
              source={require('./icons/hashtags.png')}
              style={styles.personalInfoEditIcon}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: height / 1.13,
    backgroundColor: '#e1e1e2',
  },
  swiperAndimgContainer: {
    height: height / 1.9 + methodsUsed.circleObject(3.2) + 2,
    //backgroundColor:'red',
  },
  swiper: {
    height: height / 1.75,
    marginTop: height / 150,
  },
  image: {
    width: width,
    height: height / 1.75,
    alignSelf: 'center',

    borderRadius: width / 25,
    borderWidth: 1,
    borderColor: 'black',
  },
  galleryOptionsButton: {
    width: methodsUsed.circleObject(10),
    height: methodsUsed.circleObject(10),
    backgroundColor: colors.baseColor,
    position: 'absolute',
    zIndex: 100,
    marginTop: height / 75,
    marginLeft: width - methodsUsed.circleObject(10) * 1.3,
    borderRadius: 25,
    justifyContent: 'center',
  },
  galleryOptionsIcon: {
    alignSelf: 'center',
    width: methodsUsed.circleObject(12),
    height: methodsUsed.circleObject(12),

    tintColor: 'white',
  },
  profilePicBackGround: {
    width: methodsUsed.circleObject(3.2),
    height: methodsUsed.circleObject(3.2),
    borderRadius: width / 2.5,
    position: 'absolute',
    zIndex: 100,
    backgroundColor: 'white',
    marginTop: height / 1.9,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  profilePic: {
    width: methodsUsed.circleObject(3.5),
    height: methodsUsed.circleObject(3.5),
    borderRadius: width / 2.5,
    alignSelf: 'center',
    borderColor: 'black',
  },
  nameText: {
    alignSelf: 'center',
    fontSize: height / 35,
    fontWeight: '900',
  },
  imagesOptions: {
    width: width,
    height: height / 5.5,
    backgroundColor: '#e0e1e2',
    // backgroundColor:'red',
  },
  imagesOptionsButtons: {
    backgroundColor: colors.baseColor,
    height: height / 23,
    width: width / 1.4,
    marginTop: height / 150,
    marginBottom: height / 150,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: width / 40,
  },
  imagesOptionsText: {
    color: 'white',
    alignSelf: 'center',
  },
  //personal information
  PersonalInfo: {
    //borderTopWidth: 3,
    borderColor: '#e0e0e0',
    marginTop: height / 20,
    marginBottom: height / 50,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  PersonalInfoTitle: {
    fontSize: height / 45,
    fontWeight: '500',
    color: colors.baseColor,
    marginLeft: width / 20,
  },
  editPersonalInfoButton: {
    width: methodsUsed.circleObject(11),
    height: methodsUsed.circleObject(11),
    marginLeft: width / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  personalInfoEditIcon: {
    width: methodsUsed.circleObject(18),
    height: methodsUsed.circleObject(18),
    tintColor: 'black',
  },
  livingIn: {
    marginLeft: width / 15,
    color: '#767676',
    marginTop: height / 150,
  },
  //hashtags styles
  hashtagsConstainer: {
    marginTop: height / 50,
    marginBottom: height / 50,
    borderTopColor: '#dadada',
    borderTopWidth: 3,
  },
  hashtagsTitle: {
    fontSize: height / 45,
    fontWeight: '500',
    color: colors.baseColor,
    marginLeft: width / 20,
    marginTop: height / 100,
  },
});
