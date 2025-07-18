import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { _Text, _VectorIcons, _View } from '../../../components';
import { whiteThemeColors } from '../../../Utilities';
import { Constants } from './';

const NoPaymentsFound = () => {
  return (
    <_View style={styles.noPaymentFoundContainer}>
      <_View style={[styles.msgContainer, styles.shadow]}>
        <_VectorIcons
          type={'MaterialIcons'}
          name={'payment'}
          size={100}
          color={whiteThemeColors.greyDark}
        />
        <_Text style={styles.noPaymentFoundTxt}>
          {Constants.NoPaymentFound}
        </_Text>
      </_View>
    </_View>
  );
};

export { NoPaymentsFound };

const styles = StyleSheet.create({
  noPaymentFoundContainer: {
    marginVertical: Dimensions.get('screen').height / 9,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPaymentFoundTxt: {
    fontSize: 17,
    color: whiteThemeColors.greyDark,
    fontWeight: '500',
  },
  msgContainer: {
    width: '85%',
    height: 230,
    backgroundColor: whiteThemeColors.white + 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  shadow: {
    shadowColor: whiteThemeColors.greyDark + 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
