import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { _Button, _View } from '../../../../../../../components';
import { whiteThemeColors } from '../../../../../../../Utilities';
import { SetupScreenSaveApprovalsInterface } from '../../../../../../../interfaces';
import CommonStyles from '../../../../../../../screens/CommonStyles';

export const SaveApprovals: FC<SetupScreenSaveApprovalsInterface> = ({
  handlePress,
  addOrEdit,
  isUpdating,
}) => {
  return (
    <_View style={[styles.bottomBtnContainer, styles.shadow]}>
      <_Button
        isBlock={false}
        borderRadius={10}
        submitting={!isUpdating}
        loaderColor={whiteThemeColors.white}
        BtnTxt={styles.btnTxt}
        style={styles.btn}
        btnText={addOrEdit.SaveApprovals}
        callback={() => handlePress()}
      />
    </_View>
  );
};

const styles = StyleSheet.create({
  bottomBtnContainer: {
    height: 60,
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    bottom: 0,
  },
  btnTxt: {
    fontSize: 16,
    color: whiteThemeColors.white,
    textAlign: 'left',
    fontFamily: CommonStyles.fonts.semiBold,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    backgroundColor: whiteThemeColors.primary,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});
