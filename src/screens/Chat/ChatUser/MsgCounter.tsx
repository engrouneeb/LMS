import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { getWidth, whiteThemeColors } from '../../../Utilities';
import { _Text, _View } from '../../../components';
import { MsgCounterProps } from '../../../interfaces';
export const MsgCounter: FC<MsgCounterProps> = ({ UnreadCount }) => {
  return (
    <_View style={styles.wrapper}>
      <_Text style={styles.text}>{UnreadCount}</_Text>
    </_View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    width: 20,
    borderRadius: 10,
    paddingVertical: 2,
    zIndex: 2,
    backgroundColor: whiteThemeColors.green,
  },
  text: {
    width: getWidth('7%'),
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
    color: whiteThemeColors.white,
  },
});
