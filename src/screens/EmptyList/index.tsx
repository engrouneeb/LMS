import React from 'react';
import { StyleSheet } from 'react-native';
import { getHeight, whiteThemeColors } from '../../Utilities';
import { _Text, _View } from '../../components';
import CommonStyles from '../CommonStyles';
interface props {
  image?: any;
  text?: any;
}
const EmptyList: React.FC<props> = ({ image, text }) => {
  return (
    <_View style={styles.container}>
      {image}
      <_Text style={styles.txt}>{text}</_Text>
    </_View>
  );
};
export default React.memo(EmptyList);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: getHeight('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.background,
  },
  txt: {
    fontSize: 17,
    fontFamily: CommonStyles.fonts.medium,
    color: whiteThemeColors.primaryTextColor,
    marginBottom: '30%',
  },
});
