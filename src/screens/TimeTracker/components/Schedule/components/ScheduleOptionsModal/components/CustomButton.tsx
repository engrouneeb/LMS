import { ScheduleOptionsModalCustomBtnInterface } from '../../../../../../../interfaces';
import React from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../../../../Utilities';
import { _Button } from '../../../../../../../components';
import CommonStyles from '../../../../../../../screens/CommonStyles';

export const CustomButton: React.FC<ScheduleOptionsModalCustomBtnInterface> = ({
  show = true,
  btnText,
  callback,
  marginTop = 0,
}) => {
  return show ? (
    <_Button
      borderRadius={10}
      width='100%'
      callback={callback}
      btnText={btnText}
      BtnTxt={styles.buttonText}
      submitting={true}
      style={[styles.button, { marginTop }]}
    />
  ) : null;
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    justifyContent: 'center',
    height: 45,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: whiteThemeColors.primary,
  },
  buttonText: {
    color: whiteThemeColors.white,
    fontSize: 14,
    textAlign: 'left',
    fontFamily: CommonStyles.fonts.medium,
  },
});
