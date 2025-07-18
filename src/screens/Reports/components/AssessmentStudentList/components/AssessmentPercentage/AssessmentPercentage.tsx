import React, { useState } from 'react';
import { Pressable } from 'react-native';
import {
  _Text,
  _VectorIcons,
  _View,
  assesmentPercentageInterface,
} from '../../../../../../components';
import { styles } from './style';
import { whiteThemeColors, collapsiableAnimation } from '../../../../../../Utilities';

const AssesmentPercentage: React.FC<assesmentPercentageInterface> = ({
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
          <_Text style={styles.headerText}>
            {'Attempts & Passing Percentage'}
          </_Text>
        </_View>
        {open && (
          <_View style={{ width: '100%' }}>
            <_View width={'100%'} style={{ flexDirection: 'row' }}>
              <_Text style={styles.labelText} numberOfLines={1}>
                {'Total Attempts : '}
              </_Text>
              <_Text style={styles.text}>
                {reportData.dataForReport &&
                  reportData.dataForReport.totalAttempts}
              </_Text>
            </_View>
            <_View width={'100%'} style={{ flexDirection: 'row' }}>
              <_Text style={styles.labelText} numberOfLines={1}>
                {'Passing Percentage : '}
              </_Text>
              <_Text style={styles.text}>
                {reportData.dataForReport &&
                  `${reportData.dataForReport.assessmentPassingPercentage}%`}
              </_Text>
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
export { AssesmentPercentage };
