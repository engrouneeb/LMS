import { StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';

export default StyleSheet.create({
  imgSize: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    color: whiteThemeColors.white,
    marginTop: 10,
    textAlign: 'center',
    width: '90%',
    fontSize: 18,
  },
  subTitle: {
    fontWeight: '600',
  },
  splashContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
