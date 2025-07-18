import { WagesDateInputInterface } from '../../../../../../../interfaces';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import CommonStyles from '../../../../../../../screens/CommonStyles';
import { whiteThemeColors } from '../../../../../../../Utilities';
import { _Text, _VectorIcons, _View } from '../../../../../../../components';

export const DateInput: React.FC<WagesDateInputInterface> = ({
  heading,
  onPress,
  enteredEffectiveDate,
  SelectEffectiveDate,
}) => {
  return (
    <_View style={styles.miniContainer}>
      <_View style={styles.titleContainer}>
        <_Text style={styles.titleTxt}>{heading}</_Text>
      </_View>
      <_View style={styles.dataCapturingContainer}>
        <Pressable style={styles.styledContainer} onPress={onPress}>
          <_Text
            style={
              enteredEffectiveDate != SelectEffectiveDate
                ? styles.selectedEffectiveDateTxt
                : styles.selectedDeeffectiveDateTxt
            }
          >
            {enteredEffectiveDate}
          </_Text>
          <_VectorIcons
            name='calendar'
            type='AntDesign'
            color={whiteThemeColors.primary}
            size={18}
          />
        </Pressable>
      </_View>
    </_View>
  );
};

const styles = StyleSheet.create({
  miniContainer: {
    height: 90,
    justifyContent: 'center',
  },
  titleContainer: { marginLeft: 23, marginBottom: 5 },
  titleTxt: {
    fontSize: 13,
    fontFamily: CommonStyles.fonts.regular,
    color: whiteThemeColors.primary,
  },
  dataCapturingContainer: {
    width: '90%',
    alignSelf: 'center',
    height: 45,
  },
  styledContainer: {
    height: 45,
    borderColor: whiteThemeColors.greyDark,
    backgroundColor: whiteThemeColors.primary + 10,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  selectedDeeffectiveDateTxt: {
    color: whiteThemeColors.greyDark,

    fontSize: 13,
    marginLeft: 5,
  },
  selectedEffectiveDateTxt: {
    color: whiteThemeColors.lightBlack,

    fontSize: 13,
    marginLeft: 5,
  },
});
