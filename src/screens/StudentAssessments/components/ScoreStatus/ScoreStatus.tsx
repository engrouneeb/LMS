import React, { useState } from 'react';
import { Pressable } from 'react-native';
import {
  PercentageBar,
  _Text,
  _VectorIcons,
  _View,
} from '../../../../components';
import { collapsiableAnimation, whiteThemeColors } from '../../../../Utilities';
import { Style } from './style';
interface props {
  reportData: any;
}
export const ScoreStatus: React.FC<props> = ({ reportData }) => {
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
      style={Style.cardContainer}
    >
      <_View style={Style.innerContainer}>
        <_View style={Style.infoContainer}>
          <_Text
            style={{ ...Style.headerText, marginBottom: 15, marginTop: 10 }}
          >
            {'Score & Status'}
          </_Text>
        </_View>
        {open && (
          <_View style={{ width: '100%' }}>
            <_View style={Style.infoContainer}>
              <_Text style={Style.labelText} numberOfLines={1}>
                {'Scored'}
              </_Text>
              <_Text style={Style.text}>
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
            />
            <_View style={{ marginBottom: 20 }} />
          </_View>
        )}
        <_View style={Style.circleBtn}>
          <_VectorIcons
            name={open ? 'chevron-up' : 'chevron-down'}
            type={'MaterialCommunityIcons'}
            size={28}
            color={whiteThemeColors.primary}
          />
        </_View>
      </_View>
    </Pressable>
  );
};
