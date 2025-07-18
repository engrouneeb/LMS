import React, { useState } from 'react';
import { Pressable } from 'react-native';
import {
  PercentageBar,
  _Text,
  _VectorIcons,
  _View,
  assesmentPercentageInterface,
} from '../../../../../../components';
import { styles } from './style';
import { whiteThemeColors, collapsiableAnimation } from '../../../../../../Utilities';

const ScoreStatus: React.FC<assesmentPercentageInterface> = ({
  reportData,
}) => {
  const [open, setOpen] = useState(false);

  const showPercentage = () => {
    collapsiableAnimation();
    setOpen(true);
  };
  const hidePercentage = () => {
    collapsiableAnimation();
    setOpen(false);
  };
  return (
    <Pressable
      onPress={open ? hidePercentage : showPercentage}
      style={styles.cardContainer}
    >
      <_View style={styles.innerContainer}>
        <_View width={'100%'}>
          <_Text style={[styles.headerText, styles.scoreStatusLabelTxt]}>
            Score & Status
          </_Text>
        </_View>
        {open && (
          <_View width={'100%'}>
            <_View width={'100%'} style={styles.scoredContainer}>
              <_Text style={styles.labelText} numberOfLines={1}>
                Scored :
              </_Text>
              <_Text style={styles.text}>
                {`${
                  reportData?.dataForReport?.getPassPercentage
                    ? reportData?.dataForReport?.getPassPercentage.toFixed(2)
                    : '0'
                }%`}
              </_Text>
            </_View>
            <PercentageBar
              percentage={
                reportData.dataForReport?.getPassPercentage
                  ? reportData?.dataForReport?.getPassPercentage.toFixed(2)
                  : 0
              }
              starTextDisplay={'none'}
              barColor={whiteThemeColors.primary}
              starText={''}
            />
            <_View style={styles.statusContainer}>
              <_Text style={styles.labelText} numberOfLines={1}>
                Status
              </_Text>
              <_View
                style={[
                  styles.statusIndicatorContainer,
                  {
                    backgroundColor: reportData?.dataForReport
                      ?.dataPointResultStatus
                      ? whiteThemeColors.primaryDark
                      : whiteThemeColors.greyDark + 'a0',
                  },
                ]}
              >
                <_Text style={styles.statusIndicatorTxt}>
                  {reportData?.dataForReport?.dataPointResultStatus
                    ? reportData?.dataForReport?.dataPointResultStatus
                    : 'Unavailable'}
                </_Text>
              </_View>
            </_View>
          </_View>
        )}
        <_View style={styles.CardToggleIconContainer}>
          <_VectorIcons
            name={open ? 'chevron-up' : 'chevron-down'}
            type={'MaterialCommunityIcons'}
            size={21}
            color={whiteThemeColors.white}
          />
        </_View>
      </_View>
    </Pressable>
  );
};

export { ScoreStatus };
