import { _View, _Text } from '../../../../../../../../../components';
import { StyleSheet } from 'react-native';
import CommonStyles from '../../../../../../../../../screens/CommonStyles';
import { whiteThemeColors } from '../../../../../../../../../Utilities';
export const FullRow = ({ label, value }: any) => {
  return (
    <_View style={styles.fullRowContaienr}>
      <_View style={styles.fullRowSubContainer}>
        <_Text style={styles.fullRowTitle}>{label}</_Text>
        <_Text numberOfLines={2} style={styles.fullRowValue}>
          {value}
        </_Text>
      </_View>
    </_View>
  );
};

const styles = StyleSheet.create({
  fullRowContaienr: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  fullRowSubContainer: { width: '90%', justifyContent: 'center' },
  fullRowTitle: {
    fontSize: 11,
    color: whiteThemeColors.greyDark,
    marginBottom: 3,
    fontFamily: CommonStyles.fonts.medium,
  },
  fullRowValue: {
    fontSize: 12,
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.medium,
  },
});
