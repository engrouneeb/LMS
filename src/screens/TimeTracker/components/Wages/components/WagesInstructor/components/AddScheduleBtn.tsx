import React, { FC } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { _VectorIcons } from '../../../../../../../components';
import { whiteThemeColors } from '../../../../../../../Utilities';
import { WagesIntructorAddScheduleBtnInterface } from '../../../../../../../interfaces';

export const AddScheduleBtn: FC<WagesIntructorAddScheduleBtnInterface> = ({
  visiblity,
  _onPress,
}) => {
  return visiblity ? (
    <Pressable onPress={_onPress} style={styles.btn}>
      <_VectorIcons
        name='plus'
        type='AntDesign'
        color={whiteThemeColors.white}
        size={26}
      />
    </Pressable>
  ) : null;
};

const styles = StyleSheet.create({
  btn: {
    width: 60,
    height: 60,
    backgroundColor: whiteThemeColors.primary,
    position: 'absolute',
    right: 15,
    bottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
  },
});
