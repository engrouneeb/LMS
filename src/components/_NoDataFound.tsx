import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { whiteThemeColors } from '../Utilities';
import { _Text, _View } from './index';
import CommonStyles from '../screens/CommonStyles';

export const _NoDataFound = ({
  image = require('../../assets/NoDataFound.png'),
  discription = '',
}) => {
  return (
    <_View style={styles.main}>
      <_View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode='contain' />
      </_View>
      <_Text style={styles.discription}>{discription}</_Text>
    </_View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discription: {
    fontSize: 16,
    fontFamily: CommonStyles.fonts.medium,
    color: whiteThemeColors.greyDark,
    marginTop: -40,
  },
});
