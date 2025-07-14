import React from 'react';
import { Image, StyleSheet, TouchableHighlight } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _VectorIcons, _View } from '../../../components';
import { isTablet } from 'utilities';
import CommonStyles from 'screens/CommonStyles';

const Card = ({ title, onPress, SvgIcon, height, orientation }) => {
  return (
    <TouchableHighlight
      style={{
        paddingVertical: orientation == 'PORTRAIT' ? 0 : 10,
      }}
      onPress={onPress}
      underlayColor={whiteThemeColors.primary + '10'}
    >
      <_View
        style={{
          width: '95%',
          height: 120,
          backgroundColor: whiteThemeColors.white + 90,
          alignSelf: 'center',
          marginTop: 10,
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}
      >
        <_View
          style={{
            width: '30%',
            height: 100,
            backgroundColor: whiteThemeColors.primary + 10,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {SvgIcon}
        </_View>
        <_View style={{ width: '50%', height: 100 }}>
          <_View style={styles.textContainer}>
            <_Text style={styles.enrollText}>{'Enroll in'}</_Text>
            <_Text style={styles.enrollTitle}>{title}</_Text>
          </_View>
        </_View>
        <_View
          style={{
            width: '20%',
            height: 100,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}
        >
          <_View style={styles.arrow}>
            <_VectorIcons
              name='arrowright'
              type='AntDesign'
              color={whiteThemeColors.white}
              size={20}
            />
          </_View>
        </_View>
      </_View>
    </TouchableHighlight>
  );
};

export default React.memo(Card);

const styles = StyleSheet.create({
  cardContainer: {
    // paddingVertical: 15,
    height: 120,
    width: '93%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    overflow: 'hidden',
    marginVertical: isTablet ? 10 : 0,
    backgroundColor: whiteThemeColors.white + 90,
    marginTop: 20,
    borderRadius: 20,
    justifyContent: 'center',
  },
  svgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // position: 'absolute',
    zIndex: 10,

    backgroundColor: whiteThemeColors.primary + 20,
    borderRadius: 20,
    width: 100,
    height: '90%',
  },
  bgImg: {
    // position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftImage: {
    marginTop: -2,
  },
  cardRight: {
    flexDirection: 'row',
    height: 100,

    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    // marginLeft: -12,
    width: '70%',

    // justifyContent: 'flex-start',
    backgroundColor: 'pink',
  },
  textContainer: {
    padding: 20,
    justifyContent: 'center',
    height: '100%',
  },
  enrollText: {
    fontSize: 14,
    color: whiteThemeColors.greyDark,
    marginLeft: -10,
    fontFamily: CommonStyles.fonts.regular,
  },
  enrollTitle: {
    fontSize: 20,
    color: whiteThemeColors.primaryTextColor,

    fontFamily: CommonStyles.fonts.semiBold,
  },
  arrow: {
    backgroundColor: whiteThemeColors.primary + 30,
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
