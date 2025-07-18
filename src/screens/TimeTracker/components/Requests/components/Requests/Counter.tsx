import { CounterInterface } from '../../../../../../interfaces';
import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../../../Utilities';
import {
  _Screen,
  _Text,
  _VectorIcons,
  _View,
} from '../../../../../../components';
import CommonStyles from '../../../../../../screens/CommonStyles';

export const Counter: FC<CounterInterface> = ({ item }) => {
  return item?.badgeCount > 0 ? (
    <_View style={styles.badgeContainer}>
      <_Text style={styles.badgeText}>{item.badgeCount}</_Text>
    </_View>
  ) : null;
};

const styles = StyleSheet.create({
  badgeText: {
    fontSize: 10,
    color: whiteThemeColors.white,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  badgeContainer: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: whiteThemeColors.red,
    position: 'absolute',
    right: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
