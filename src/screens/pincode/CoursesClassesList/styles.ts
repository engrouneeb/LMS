import { StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../Utilities';

export const styles = StyleSheet.create({
  container: {
    width: '98%',
    flex: 1,
    padding: 10,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: whiteThemeColors.primary,
    height: 40,
    alignSelf: 'center',
  },
  nextButtonText: {
    color: whiteThemeColors.white,
    alignSelf: 'center',
  },
  historyContainer: {
    width: 35,
    height: 35,
    backgroundColor: whiteThemeColors.primary + 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 5,
  },
});
