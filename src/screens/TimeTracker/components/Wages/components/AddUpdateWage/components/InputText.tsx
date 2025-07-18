import { WagesInputTextInterface } from '../../../../../../../interfaces';
import React from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../../../../Utilities';
import {
  _StyledTextInput,
  _Text,
  _View,
} from '../../../../../../../components';
import CommonStyles from '../../../../../../../screens/CommonStyles';

export const InputText: React.FC<WagesInputTextInterface> = ({
  heading,
  placeholder,
  value,
  onChangeText,
  keyboardType,
}) => {
  return (
    <_View style={styles.miniContainer}>
      <_View style={styles.titleContainer}>
        <_Text style={styles.titleTxt}>{heading}</_Text>
      </_View>
      <_View style={styles.dataCapturingContainer}>
        <_StyledTextInput
          keyboardType={keyboardType ? keyboardType : 'default'}
          style={styles.txtInput}
          placeholder={placeholder}
          placeholderTextColor={whiteThemeColors.greyDark}
          value={value}
          onChangeText={(text: string) => onChangeText(text)}
        />
      </_View>
    </_View>
  );
};

const styles = StyleSheet.create({
  miniContainer: {
    height: 90,
    justifyContent: 'center',
  },
  titleContainer: {
    marginLeft: 23,
    marginBottom: 5,
  },
  titleTxt: {
    fontSize: 13,
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.regular,
  },
  dataCapturingContainer: {
    width: '90%',
    alignSelf: 'center',
    height: 45,
  },
  txtInput: {
    flex: 1,
    paddingLeft: 10,
    height: 45,
  },
});
