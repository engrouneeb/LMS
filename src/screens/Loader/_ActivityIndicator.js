import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _View } from '../../components';

const _ActivityIndicator = ({
  size = 'small',
  color = whiteThemeColors.primary,
  textColor = whiteThemeColors.greyDark,
  textSize = 11,
  showText = true,
  ...rest
}) => {
  return (
    <_View style={styles.container} {...rest}>
      <ActivityIndicator size={size} color={color} />
      {showText ? (
        <_Text
          style={[
            styles.loaderTxt,
            {
              fontSize: textSize,
              color: textColor,
            },
          ]}
        >
          Loading...
        </_Text>
      ) : null}
    </_View>
  );
};

export { _ActivityIndicator };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.background,
    width: '100%',
  },
  loaderTxt: {
    marginTop: 5,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
});
