import React from 'react';
import { _Text, _View } from '../components';
import { whiteThemeColors } from '../theme';
import { TouchableOpacity } from 'react-native';
import CommonStyles from '../screens/CommonStyles';
import { scale, verticalScale } from './';
import { labelledViewInterface } from '../interfaces';
export const LabelledView: React.FC<labelledViewInterface> = ({
  onPress,
  title,
  height,
  value,
}) => (
  <TouchableOpacity onPress={onPress} style={{ padding: 20 }}>
    <_Text
      style={[
        CommonStyles.className,
        {
          alignSelf: 'flex-start',
          marginLeft: scale(0.03),
        },
      ]}
    >
      {title}
    </_Text>
    <_View
      style={{
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 1,
        width: scale(0.9),
        height: height !== null ? height : verticalScale(0.09),
        backgroundColor: whiteThemeColors.white,
      }}
    >
      <_Text style={{ color: whiteThemeColors.primaryTextColor }}>
        {value}
      </_Text>
    </_View>
  </TouchableOpacity>
);
