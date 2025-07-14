import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { _Text, _View } from '../../../../../../../components';
import { whiteThemeColors } from 'utilities';
import { ScheduleAddTimeDeleteScheduleBtnInterface } from 'interfaces';

export const DeleteScheduleBtn: React.FC<
  ScheduleAddTimeDeleteScheduleBtnInterface
> = ({ showBtn, onPress }) => {
  return showBtn ? (
    <_View>
      <Pressable style={styles.btn} onPress={onPress}>
        <_Text style={styles.btnTxt}>Delete Schedule</_Text>
      </Pressable>
    </_View>
  ) : null;
};

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    height: 50,
    backgroundColor: whiteThemeColors.primary + 10,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: whiteThemeColors.red,
  },
});
