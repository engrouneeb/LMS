import { TimeSheetSubmitButtonInterface } from 'interfaces';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Button, _View } from '../../../../../../components';
import CommonStyles from 'screens/CommonStyles';

export const SubmitButton: FC<TimeSheetSubmitButtonInterface> = ({
  show,
  handleCallback,
  btnShow,
}) => {
  return show ? (
    <_View style={styles.flatListFooterContainer}>
      <_Button
        submitting
        width={'90%'}
        borderRadius={10}
        style={[
          styles.flatListFooterBtn,
          {
            display: btnShow,
          },
        ]}
        callback={handleCallback}
        btnText={'Submit'}
        BtnTxt={styles.flatListFooterBtnTxt}
      />
    </_View>
  ) : null;
};
const styles = StyleSheet.create({
  flatListFooterContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 5,
  },
  flatListFooterBtn: {
    marginVertical: 10,
    height: 45,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: whiteThemeColors.primary,
  },
  flatListFooterBtnTxt: {
    color: whiteThemeColors.textColor.whiteText,
    fontFamily: CommonStyles.fonts.semiBold,
    fontSize: 16,
  },
});
