import { _Text, _VectorIcons, _View } from '../../../components';
import React, { memo } from 'react';
import { whiteThemeColors } from '../../../Utilities';
import { styles } from '../styles';

export const RenderEmptyList = memo(() => (
  <_View style={styles.emptyListContainer}>
    <_VectorIcons
      type={'Ionicons'}
      name={'document-attach'}
      size={70}
      color={whiteThemeColors.primary}
    />
    <_Text style={styles.emptyListText}>{`No Attachments`}</_Text>
  </_View>
));
