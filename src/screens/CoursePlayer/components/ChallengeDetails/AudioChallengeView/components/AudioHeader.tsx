import React from 'react';
import { TouchableOpacity } from 'react-native';
import { _Text, _VectorIcons, _View } from '../../../../../../components';
import { whiteThemeColors } from '../../../../../../Utilities';
import { styles } from '../styles';
import { AudioHeaderInterface } from '../../../../../../interfaces';

export const AudioHeader: React.FC<AudioHeaderInterface> = ({
  onPress,
  header,
}) => {
  return (
    <_View style={styles.headerContainer}>
      <_View style={styles.titleView}>
        <_Text numberOfLines={1} style={styles.title}>
          {header}
        </_Text>
      </_View>
      <TouchableOpacity onPress={onPress} style={styles.closeIcon}>
        <_VectorIcons
          type={'MaterialCommunityIcons'}
          name={'close'}
          color={whiteThemeColors.black}
          size={34}
        />
      </TouchableOpacity>
    </_View>
  );
};
