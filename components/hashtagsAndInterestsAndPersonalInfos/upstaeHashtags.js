import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import dimension from '../../screenSizes/screenOfSizes';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import hashtags from './../../staticData/hashtags.json';
let width = dimension.width;
let height = dimension.heightWhenNavBar;
import axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';
import colors from '../../projectColor/colors';
import Navigation from '../../navigation/navigationScreen';

const selectHashtags = (itemPressed, selectedHahstag, setSelectedHashtag) => {
  if (selectedHahstag.indexOf(itemPressed) == -1) {
    setSelectedHashtag([...selectedHahstag, itemPressed]);
  } else {
    setSelectedHashtag(selectedHahstag.filter(item => item != itemPressed));
  }
};

export default function updateHashtags({route}) {
  const [selectedHahstag, setSelectedHashtag] = useState(
    route.params.hashtagsSelected,
  );

  console.log('selectedHahstag : ', selectedHahstag);
  const navigation = useNavigation();

  useEffect(() => {}, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.doneButton}
        onPress={() => {
          navigation.navigate('Profile', {hashtags: selectedHahstag});
        }}>
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Hashtags</Text>
      <FlatList
        style={styles.hashtagasContainer}
        data={hashtags}
        numColumns={3}
        keyExtractor={item => item}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={[
                styles.buttonOfItem,
                selectedHahstag.indexOf(item) > -1
                  ? {backgroundColor: colors.baseColor}
                  : {backgroundColor: '#9e9e9e'},
              ]}
              onPress={() => {
                selectHashtags(item, selectedHahstag, setSelectedHashtag);
              }}>
              <Text style={styles.textItemNonSelected}>#{item}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: '#dcdcdc',
    paddingTop: height / 65,
  },
  doneButton: {
    width: width / 5,
    height: height / 25,
    justifyContent: 'center',
    backgroundColor: colors.baseColor,
    alignSelf: 'flex-end',
    marginRight: width / 45,
    borderRadius: width / 75,
  },
  doneText: {
    textAlign: 'center',
    fontWeight: '400',
    color: 'white',
    fontSize: height / 50,
  },
  title: {
    fontSize: height / 35,
    alignSelf: 'center',
    marginBottom: height / 50,
  },
  hashtagasContainer: {height: height, width: width},
  buttonOfItem: {
    height: height / 22,
    width: width / 3.4,
    marginLeft: width / 35,
    marginTop: height / 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width / 50,
  },
  textItemNonSelected: {
    fontSize: height / 60,
    color: '#fff7f7',
  },
  textItemSelected: {
    fontSize: height / 60,
    color: 'red',
  },
});
