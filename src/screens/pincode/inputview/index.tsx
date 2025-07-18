import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { _View } from '../../../components';
import { whiteThemeColors } from '../../../Utilities';
const pinViewCircle = Dimensions.get('window').width > 480 ? 17 : 13;

const KeyBoard = (props: any) => {
  const { pinCode } = props;
  return (
    <_View style={[styles.pinContainer]}>
      {pinCode.map((pin: any, key: any) => (
        <_View
          key={key}
          style={[
            styles.pinInput,
            pin && { backgroundColor: whiteThemeColors.white },
          ]}
        />
      ))}
    </_View>
  );
};
export default KeyBoard;

const styles = StyleSheet.create({
  pinContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  pinInput: {
    width: pinViewCircle,
    height: pinViewCircle,
    borderRadius: pinViewCircle / 2,
    borderColor: whiteThemeColors.white,
    // borderWidth: 1,
    marginHorizontal: 10,
    backgroundColor: whiteThemeColors.white + 30,
  },
});
