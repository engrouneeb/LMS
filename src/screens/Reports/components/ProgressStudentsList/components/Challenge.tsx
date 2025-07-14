import React, { useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { _Text, _VectorIcons, _View } from '../../../../../components';
import {
  BarChartComponent,
  whiteThemeColors,
  collapsiableAnimation,
} from 'utilities';
import CommonStyles from 'screens/CommonStyles';
interface props {
  challengeData: any;
}
const Challenge: React.FC<props> = ({ challengeData }) => {
  const [open, setOpen] = useState(true);
  const showChallenge = () => {
    collapsiableAnimation();
    setOpen(true);
  };
  const hideChallenge = () => {
    collapsiableAnimation();
    setOpen(false);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={open ? hideChallenge : showChallenge}
      style={styles.innerContainer}
    >
      <_Text style={styles.headerText}>{'Challenge'}</_Text>
      {open && (
        <_View width={'100%'}>
          {challengeData && (
            <BarChartComponent
              points={challengeData.data}
              labels={challengeData.labels}
            />
          )}
        </_View>
      )}
      <_View style={styles.btn}>
        <_VectorIcons
          name={open ? 'chevron-up' : 'chevron-down'}
          type={'MaterialCommunityIcons'}
          size={20}
          color={whiteThemeColors.primary}
        />
      </_View>
    </TouchableOpacity>
  );
};

export { Challenge };

const styles = StyleSheet.create({
  innerContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 25,
    paddingBottom: 30,
    width: '94%',
    borderRadius: 15,
    overflow: Platform.OS == 'android' ? 'hidden' : 'visible',
    backgroundColor: whiteThemeColors.white + 90,
    alignSelf: 'center',
  },

  headerText: {
    fontSize: 16,
    color: whiteThemeColors.primaryTextColor,
    fontFamily: CommonStyles.fonts.semiBold,
    textTransform: 'capitalize',

    marginBottom: 10,
    marginLeft: 20,
    marginTop: 10,
  },
  btn: {
    position: 'absolute',
    top: 30,
    right: 18,
    zIndex: 1,

    borderRadius: 8,
    backgroundColor: whiteThemeColors.primary + 30,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
