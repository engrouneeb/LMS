import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _View } from '../../../../components';
import CommonStyles from 'screens/CommonStyles';

interface Props {
  onPress: () => void;
  text: string;
  userName: string;
}

export const SelectUserButton: FC<Props> = ({ onPress, text, userName }) => {
  return (
    <_View style={{ width: '100%' }}>
      <TouchableOpacity onPress={onPress} style={styles.userBtn}>
        <Text style={styles.txt}>{text}</Text>
        <Text style={styles.txt}>{userName}</Text>
      </TouchableOpacity>
    </_View>
  );
};

const styles = StyleSheet.create({
  txt: {
    color: whiteThemeColors.primary,
    lineHeight: 20,
    marginRight: 5,
    fontSize: 14,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  userBtn: {
    backgroundColor: whiteThemeColors.white + 90,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    width: '100%',
  },
});
