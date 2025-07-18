const React = require('react-native');
const { Dimensions, Platform } = React;
import { Header } from '@react-navigation/stack';
import CommonStyles from '../CommonStyles';
import { whiteThemeColors } from '../../Utilities';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const ofSetVal = deviceWidth > 480 ? Header.HEIGHT + 20 : Header.HEIGHT;
export default {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderLeft: {
    left: deviceWidth / 2 - 25,
  },
  ofSetVal: ofSetVal,
  loaderTop: {
    top: deviceHeight / 2 - 25,
  },
  fullHeight: {
    height: deviceHeight,
  },
  fullWidth: {
    width: deviceWidth,
  },
  txt: {
    color: whiteThemeColors.white,
    fontWeight: '700',
    fontSize: 20,
  },
};
