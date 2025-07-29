import {useFocusEffect} from '@react-navigation/native';
import {ScreenInterfaces} from '../interfaces';
import React, {FC} from 'react';
import {BackHandler, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {whiteThemeColors} from '../Utilities';
import {_View} from '.';

export const _Screen: FC<ScreenInterfaces> = ({
  background,
  hideTopSafeArea,
  hideBottomSafeArea,
  topSafeAreaColor,
  bottomSafeAreaColor,
  align,
  justify,
  margins,
  paddings,
  style,
  header,
  children,
  flex,
  disableAndroidBack,
  onAndroidBack,
  backgroundColor,
  ...rest
}) => {
  // On focus change, disable android back button (or not)
  useFocusEffect(() => {
    let callback = () => Boolean(disableAndroidBack);

    if (onAndroidBack) {
      callback = onAndroidBack;
    }

    BackHandler.addEventListener('hardwareBackPress', callback);

   // return () => BackHandler.removeEventListener('hardwareBackPress', callback);
  });
  return (
    <>
      {background && <_View style={styles.container}>{background}</_View>}
      {!hideTopSafeArea && (
        <SafeAreaView style={{backgroundColor: topSafeAreaColor}} />
      )}
      <_View
        // align={align}
        justify={justify}
        margins={margins}
        paddings={{
          ...paddings,
        }}
        flex={1}
        style={style}
        backgroundColor={backgroundColor}
        {...rest}>
        {header}
        {children}
      </_View>

      {!hideBottomSafeArea && (
        <SafeAreaView
          style={{
            backgroundColor: bottomSafeAreaColor
              ? bottomSafeAreaColor
              : whiteThemeColors.background,
          }}
          edges={['bottom']}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
});
