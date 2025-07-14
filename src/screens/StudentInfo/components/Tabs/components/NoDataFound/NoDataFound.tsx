import { _Text, _VectorIcons, _View } from 'components';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { whiteThemeColors } from 'utilities';
const { width, height } = Dimensions.get('screen');

const NoDataFound = () => {
  return (
    <_View style={styles.loaderContainer}>
      <_VectorIcons
        type='FontAwesome5'
        name='users-slash'
        size={65}
        color={whiteThemeColors.greyDark}
      />
      <_Text style={styles.noDataTxt}>No Data</_Text>
    </_View>
  );
};

export { NoDataFound };

const styles = StyleSheet.create({
  loaderContainer: {
    width,
    height: height - 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataTxt: {
    fontSize: 17,
    color: whiteThemeColors.greyDark,
    marginTop: 20,
  },
});
