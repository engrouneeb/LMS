import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { _View } from '../components';
import { whiteThemeColors } from '../theme';
import ddStyles from './styles';
import { DropdownSaucesProps } from '../interfaces';

export const DropdownSauces: FC<DropdownSaucesProps> = ({
  hideIt,
  display,
  role_Name,
  top,
  left,
  children,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[ddStyles.ddOverly, { display: display }]}
      onPress={() => {
        hideIt();
      }}
    >
      <_View
        style={[
          role_Name == 'Student' || role_Name == 'Parent'
            ? ddStyles.ddContainer1
            : ddStyles.ddContainer,
          { top: top, left: left - ddStyles.ddContainer.width },
        ]}
      >
        <_View
          style={[
            {
              width: 12,
              height: 12,
              borderRightWidth: 12,
              borderBottomWidth: 12,
              borderLeftWidth: 12,
              borderTopColor: whiteThemeColors.transparent,
              borderRightColor: whiteThemeColors.transparent,
              borderBottomColor: whiteThemeColors.greyLite,
              borderLeftColor: whiteThemeColors.transparent,
              position: 'absolute',
              right: 10,
              top: -15,
            },
            { display: display },
          ]}
        />
        {children}
      </_View>
    </TouchableOpacity>
  );
};
