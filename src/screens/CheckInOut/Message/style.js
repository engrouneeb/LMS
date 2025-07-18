const React = require('react-native');
const { Dimensions, Platform } = React;
const deviceWidth = Dimensions.get('window').width;
export default {
  bgColor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'white',
    width: '100%',
  },

  headerContainer: {
    width: deviceWidth - 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  UserInfo: {
    flex: 1,
  },
  CheckInTime: {
    flex: 1,
    justifyContent: 'center',
  },
  mTop20: {
    marginTop: 20,
  },
  fontSize: {
    fontSize: 16,
    fontWeight: '600',
  },
  imgResponsive: {
    width: deviceWidth - 150,
    height: 100,
  },
  backbtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    height: 45,
    width: 45,

    borderRadius: 45 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: 'center',
    margin: Platform.OS === 'ios' ? 10 : 10,
    marginTop: Platform.OS === 'ios' ? 35 : 10,
  },
};
