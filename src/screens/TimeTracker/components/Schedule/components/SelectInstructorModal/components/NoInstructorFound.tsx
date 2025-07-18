import { SelectInstructorModalNoInstructorFoundInterface } from '../../../../../../../interfaces';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { _Text, _View } from '../../../../../../../components';
import { whiteThemeColors } from '../../../../../../../Utilities';
import CommonStyles from '../../../../../../../screens/CommonStyles';

export const NoInstructorFound: FC<
  SelectInstructorModalNoInstructorFoundInterface
> = ({ show }) =>
  show ? (
    <_View style={styles.container}>
      <_Text style={styles.nameText}>{'No Instructor Found'}</_Text>
    </_View>
  ) : null;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  nameText: {
    paddingVertical: 20,
    fontSize: 15,
    paddingLeft: 10,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.regular,
  },
});
