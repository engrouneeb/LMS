import { _Text, _VectorIcons, _View } from 'components';
import React from 'react';
import { whiteThemeColors } from 'utilities';
import { styles } from '../styles';

export const RenderEmptyList = () => {
  return (
    <_View style={styles.emptyListContainer}>
      <_VectorIcons
        type={'Ionicons'}
        name={'document-attach'}
        size={60}
        color={whiteThemeColors.primary}
      />
      <_Text style={styles.emptyListText}>{`No Attachments`}</_Text>
    </_View>
  );
};
