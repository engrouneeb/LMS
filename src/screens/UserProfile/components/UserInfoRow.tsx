import React, { FC } from 'react';
import { whiteThemeColors } from '../../../Utilities';
import { _Text, _VectorIcons, _View } from '../../../components';
import { styles } from '../styles';
interface UserInfoRowProps {
  title: string;
  value: string;
  icon: string;
  type?: string;
}

export const UserInfoRow: FC<UserInfoRowProps> = ({
  title,
  value,
  icon,
  type = 'MaterialIcons',
}) => {
  return (
    <_View style={styles.userInfoRowContainer}>
      <_VectorIcons
        type={type}
        name={icon}
        color={whiteThemeColors.primary}
        size={20}
      />
      <_Text style={styles.userInfoTitle}>{`${title} :`}</_Text>
      <_Text numberOfLines={2} style={styles.userInfoValue}>
        {value}
      </_Text>
    </_View>
  );
};
