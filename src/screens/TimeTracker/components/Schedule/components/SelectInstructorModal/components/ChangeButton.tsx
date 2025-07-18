import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { _Button } from '../../../../../../../components';
import CommonStyles from '../../../../../../CommonStyles';
import { whiteThemeColors } from '../../../../../../../Utilities';
import { SelecteInstructorModalChangeBtnInterface } from '../../../../../../../interfaces';

export const ChangeButton: FC<SelecteInstructorModalChangeBtnInterface> = ({
  selectedInstructor,
  selectedWage,
  loading,
  changeInstructor,
}) => {
  return (
    <_Button
      isBlock={selectedInstructor && selectedWage ? false : true}
      submitting={!loading}
      width={'95%'}
      borderRadius={5}
      style={[
        styles.button,
        {
          backgroundColor:
            selectedInstructor && selectedWage
              ? CommonStyles.themeClr.backgroundColor
              : whiteThemeColors.greyDark,
        },
      ]}
      callback={changeInstructor}
      BtnTxt={styles.buttonLabel}
      btnText={'Change'}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 50,
  },
  buttonLabel: {
    color: 'white',
    alignSelf: 'center',
  },
});
