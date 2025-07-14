import { SelectInstructorModalStatusBoxInterface } from 'interfaces';
import React, { FC } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _View } from '../../../../../../../components';
import CommonStyles from 'screens/CommonStyles';
export const StatusBox: FC<SelectInstructorModalStatusBoxInterface> = ({
  wagesLength,
  isSelected,
  showLoader,
}) => {
  const Loader = () => (
    <_View style={styles.loadingBox}>
      <ActivityIndicator size={'small'} color={whiteThemeColors.greyDark} />
      <_Text style={styles.loadingMsg}>Loading...</_Text>
    </_View>
  );

  const NoWageFound = () => (
    <_View style={styles.erroBoxContainer}>
      <_View style={styles.errorBox}>
        <_Text style={styles.buttonText}>
          No Wage found for Selected Instructor!
        </_Text>
      </_View>
    </_View>
  );

  if (!isSelected || wagesLength > 0) {
    return null;
  } else if (showLoader) {
    return <Loader />;
  } else if (wagesLength < 1) {
    return <NoWageFound />;
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  loadingBox: {
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loadingMsg: {
    fontSize: 11,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.regular,
    marginLeft: 10,
  },
  erroBoxContainer: {
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorBox: {
    width: '95%',
    height: 50,
    backgroundColor: 'orange',
    alignSelf: 'center',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: whiteThemeColors.white,
    textAlign: 'center',
    fontFamily: CommonStyles.fonts.regular,
  },
});
