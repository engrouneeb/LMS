import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { whiteThemeColors } from '../../Utilities';
interface props {
  size?: any;
  bgColor?: string;
  color?: string;
}
const Loader: React.FC<props> = ({ size, bgColor, color }) => {
  return (
    <View
      style={[
        styles.mainView,
        {
          backgroundColor: bgColor ? bgColor : whiteThemeColors.greyDark + '20',
        },
      ]}
    >
      <ActivityIndicator
        size={size ? size : 'large'}
        color={color ? color : whiteThemeColors.primary}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  mainView: {
    height: '100%',
    width: '100%',
    zIndex: 1000,
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
