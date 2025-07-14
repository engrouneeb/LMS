import React from 'react';
import { _Text, _VectorIcons, _View } from '../../../../../../../components';
import { styles } from '../style';
import { whiteThemeColors } from 'utilities';
import { DropDownRowInterface } from 'interfaces';

export const DropDownRow: React.FC<DropDownRowInterface> = ({
  isSelected,
  option,
}) => {
  return (
    <_View style={styles.dropDownItemContainer}>
      <_VectorIcons
        name={isSelected ? 'radio-button-checked' : 'radio-button-unchecked'}
        type='MaterialIcons'
        size={20}
        color={
          isSelected ? whiteThemeColors.primary : whiteThemeColors.greyDark
        }
      />
      <_Text style={styles.dropDownItemTxt}>{option}</_Text>
    </_View>
  );
};
