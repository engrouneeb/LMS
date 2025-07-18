import { ReviewScheduleModalPublishButtonInterface } from '../../../../../../../interfaces';
import React from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../../../../Utilities';
import { _Button, _View } from '../../../../../../../components';
import CommonStyles from '../../../../../../CommonStyles';

export const PublishButton: React.FC<
  ReviewScheduleModalPublishButtonInterface
> = ({ onPress }) => {
  return (
    <_View style={styles.publishBtnContainer}>
      <_Button
        submitting
        width={'100%'}
        borderRadius={5}
        style={styles.CancleTimeViewButton}
        callback={onPress}
        BtnTxt={styles.buttonLabel}
        btnText={'Publish'}
      />
    </_View>
  );
};

const styles = StyleSheet.create({
  publishBtnContainer: {
    height: 50,
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    bottom: 30,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 5,
  },
  CancleTimeViewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-around',
    backgroundColor: CommonStyles.themeClr.backgroundColor,
    height: 40,
    width: '50%',
    marginTop: 20,
  },
  buttonLabel: {
    fontSize: 15,
    color: whiteThemeColors.white,
    alignSelf: 'center',
    fontFamily: CommonStyles.fonts.bold,
  },
});
