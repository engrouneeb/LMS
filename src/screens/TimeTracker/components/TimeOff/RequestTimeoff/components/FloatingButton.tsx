import React, { FC } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { _VectorIcons } from '../../../../../../components';
import { whiteThemeColors } from '../../../../../../Utilities';
import { RequestTimeOffFloatingButtonInterface } from '../../../../../../interfaces';

export const FloatingButton: FC<RequestTimeOffFloatingButtonInterface> = ({
  onPress,
  isTimeOff,
}) => {
  return (
    <Pressable style={styles.floatingButton} onPress={onPress}>
      <_VectorIcons
        type={!isTimeOff ? 'FontAwesome5' : 'FontAwesome'}
        name={!isTimeOff ? 'plus' : 'pencil'}
        style={{ color: whiteThemeColors.icons.whiteIcon }}
        size={24}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    zIndex: 100,
    backgroundColor: whiteThemeColors.primary,
    width: 60,
    height: 60,
    position: 'absolute',
    right: 30,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
  },
});
