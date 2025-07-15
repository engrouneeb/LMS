import NetInfo from '@react-native-community/netinfo';
import React, { useEffect, useState } from 'react';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { whiteThemeColors } from './Utilities/colors';
import { _Text, _VectorIcons, _View } from './components';
const { width } = Dimensions.get('window');

function OfflineToast() {
  return (
    <_View style={styles.toastContainer}>
      <_View style={styles.toastItemContainer}>
        <_VectorIcons
          type={'Feather'}
          name={'wifi-off'}
          size={20}
          color={whiteThemeColors.white}
        />
        <_Text style={styles.toastTxt}>No Internet Connection</_Text>
      </_View>
    </_View>
  );
}

const OfflineNotice = () => {
  const [connected, setConnected] = useState<boolean | null>(true);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) =>
      setConnected(state.isConnected),
    );
    return () => unsubscribe();
  }, [connected]);

  return !connected ? <OfflineToast /> : null;
};
const styles = StyleSheet.create({
  toastContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    position: 'absolute',
    bottom: Platform.OS == 'ios' && !isTablet() ? 30 : 0,
  },
  toastItemContainer: {
    width: '95%',
    height: '100%',
    backgroundColor: '#6c6c6c',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#6c6c6c',
    borderRadius: 7,
    paddingHorizontal: 10,
  },
  toastTxt: {
    color: whiteThemeColors.white,
    marginLeft: 10,
  },
});

export default OfflineNotice;
