import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { _Text, _VectorIcons, _View } from '../../../../../../../components';
import { whiteThemeColors } from 'utilities';
import { ScheduleAddTimeChangeInstructorModalInterface } from 'interfaces';

export const ChangeInstructorModal: React.FC<
  ScheduleAddTimeChangeInstructorModalInterface
> = ({ showChangeInstructorModal, onPress }) => {
  return showChangeInstructorModal ? (
    <_View style={styles.container}>
      <TouchableOpacity
        style={styles.selectInstructorContainer}
        onPress={onPress}
      >
        <_View style={styles.labelContainer}>
          <_Text style={styles.labelTxt}>Change Instructor for Schedule</_Text>
        </_View>
        <_View style={styles.iconContainer}>
          <_VectorIcons
            type={'AntDesign'}
            name='arrowright'
            size={25}
            color={whiteThemeColors.greyDark}
            style={styles.iconStyles}
          />
        </_View>
      </TouchableOpacity>
    </_View>
  ) : null;
};
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  selectInstructorContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    borderBottomColor: whiteThemeColors.greyDark + 30,
    paddingBottom: 10,
  },
  labelContainer: {
    paddingHorizontal: 5,
  },
  labelTxt: {
    color: whiteThemeColors.primary,
    fontSize: 14,
    letterSpacing: 2,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0,
    borderColor: whiteThemeColors.greyLite,
    marginTop: 5,
    paddingHorizontal: 5,
  },
  iconStyles: {
    marginTop: -5,
  },
});
