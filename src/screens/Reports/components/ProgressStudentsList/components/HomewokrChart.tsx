import React, { useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import {
  BarChartComponent,
  whiteThemeColors,
  collapsiableAnimation,
} from '../../../../../Utilities';
import { _Text, _VectorIcons, _View } from '../../../../../components';
import CommonStyles from '../../../../../screens/CommonStyles';
interface props {
  homeWorkChartData: any;
}
const HomeworkChart: React.FC<props> = ({ homeWorkChartData }) => {
  const [open, setOpen] = useState(true);
  const showChart = () => {
    collapsiableAnimation();
    setOpen(true);
  };
  const hideChart = () => {
    collapsiableAnimation();
    setOpen(false);
  };
  return (
    <TouchableOpacity
      activeOpacity={9}
      onPress={open ? hideChart : showChart}
      style={styles.innerContainer}
    >
      <_Text style={styles.headerText}>{'Homework'}</_Text>
      {open && (
        <_View width={'100%'}>
          {homeWorkChartData && (
            <BarChartComponent
              points={homeWorkChartData.data}
              labels={homeWorkChartData.labels}
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

export { HomeworkChart };

const styles = StyleSheet.create({
  innerContainer: {
    alignItems: 'flex-start',
    paddingTop: 15,
    paddingBottom: 30,
    width: '94%',
    borderRadius: 15,
    overflow: Platform.OS == 'android' ? 'hidden' : 'visible',
    backgroundColor: whiteThemeColors.white + 90,
    alignSelf: 'center',
    marginTop: 10,
  },

  headerText: {
    fontSize: 17,
    color: whiteThemeColors.primaryTextColor,
    marginTop: 20,
    textTransform: 'capitalize',
    fontFamily: CommonStyles.fonts.semiBold,
    marginBottom: 10,
    marginLeft: 20,
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
