import React from 'react';
import { StyleSheet } from 'react-native';
import { _Button, _View } from '../../../../../../../components';
import { whiteThemeColors } from '../../../../../../../Utilities';
import { WagesAddWageButtonInterface } from '../../../../../../../interfaces';

export const AddWageButton: React.FC<WagesAddWageButtonInterface> = ({
  btnTitle,
  onPress,
}) => {
  return (
    <_View style={styles.btnContainer}>
      <_Button
        borderRadius={10}
        submitting={true}
        BtnTxt={styles.btnTxt}
        style={[styles.btn, styles.shadow]}
        loaderColor={whiteThemeColors.white}
        btnText={btnTitle}
        callback={onPress}
      />
    </_View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    height: 45,
    marginTop: 30,
    width: '96%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    backgroundColor: whiteThemeColors.primary,
  },
  btnTxt: {
    fontSize: 18,
    color: whiteThemeColors.white,
    textAlign: 'left',
  },
  shadow: {
    shadowColor: whiteThemeColors.greyDark,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});
