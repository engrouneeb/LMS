import { StyleSheet } from 'react-native';
import CommonStyles from '../../CommonStyles';

export const styles = StyleSheet.create({
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    alignSelf: 'center',
    fontFamily: CommonStyles.fonts.medium,
    marginTop: 30,
  },
});
