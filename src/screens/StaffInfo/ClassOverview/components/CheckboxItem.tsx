import { _Text, _VectorIcons, _View } from '../../../../components';
import { FC } from 'react';
import { whiteThemeColors } from '../../../../Utilities';
import { styles } from '../styles';

interface CheckboxItemProps {
  text: string;
  isChecked: boolean;
}
export const CheckboxItem: FC<CheckboxItemProps> = ({ text, isChecked }) => {
  let selectedColor = whiteThemeColors.primary + 90;
  let unSelectedColor = whiteThemeColors.greyDark + 90;
  return (
    <_View style={{ flexDirection: 'row' }}>
      <_VectorIcons
        type='MaterialCommunityIcons'
        name={isChecked ? 'checkbox-outline' : 'checkbox-blank-outline'}
        color={isChecked ? selectedColor : unSelectedColor}
      />
      <_View
        style={{
          ...styles.statusDot,
          backgroundColor: isChecked ? selectedColor : unSelectedColor,
        }}
      />
      <_Text style={[styles.value2]}>{text}</_Text>
    </_View>
  );
};
