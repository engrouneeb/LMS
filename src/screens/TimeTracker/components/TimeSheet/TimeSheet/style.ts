import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../../Utilities';

export const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'android' ? 45 : 50,
    backgroundColor: whiteThemeColors.background,
    flex: 1,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  list: {
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 2,
    backgroundColor: whiteThemeColors.background,
  },
  CalendarStrip: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    zIndex: 10,
  },
});
