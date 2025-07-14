import { _View, _Text } from 'components';
import { StyleSheet } from 'react-native';
import CommonStyles from 'screens/CommonStyles';
import { whiteThemeColors } from 'utilities';
export const Row = ({ label1, value1, label2, value2 }: any) => {
  return (
    <_View style={styles.rowContainer}>
      <_View style={styles.rowSubContainer}>
        <_Text style={styles.titleTxt}>{label1}</_Text>
        <_Text numberOfLines={1} style={styles.valueTxt}>
          {value1}
        </_Text>
      </_View>
      <_View style={styles.rowSubContainer}>
        <_Text style={styles.titleTxt}>{label2}</_Text>
        <_Text
          numberOfLines={1}
          style={[
            styles.valueTxt,
            {
              textAlign: 'justify',
            },
          ]}
        >
          {value2}
        </_Text>
      </_View>
    </_View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  rowSubContainer: {
    width: '50%',
    justifyContent: 'center',
  },
  titleTxt: {
    fontSize: 11,
    color: whiteThemeColors.greyDark,
    marginBottom: 3,
    fontFamily: CommonStyles.fonts.medium,
  },
  valueTxt: {
    fontSize: 13,
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.medium,
  },
});
