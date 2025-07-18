import React from 'react';
import styles from '../style';
import { _Text, _VectorIcons, _View } from '../../../components';
import { whiteThemeColors } from '../../../Utilities';
interface props {
  icon: string;
  label: string;
  msg: string;
  height?: string;
  icontype?: string;
}
export const DetailSingleRow: React.FC<props> = ({
  icon,
  label,
  msg,
  height = '20%',
  icontype = 'MaterialCommunityIcons',
}) => {
  let color =
    label == 'Error' ? whiteThemeColors.red : whiteThemeColors.primary;
  return (
    <_View style={[styles.rowContainer, { height }]}>
      <_View style={styles.labelContainer}>
        <_VectorIcons type={icontype} name={icon} size={20} color={color} />

        <_Text style={styles.labelTxt}>{label}</_Text>
      </_View>
      <_View style={styles.valueContainer}>
        <_Text
          numberOfLines={2}
          style={[
            {
              color,
            },
            styles.valueTxt,
          ]}
        >
          {msg}
        </_Text>
      </_View>
    </_View>
  );
};
