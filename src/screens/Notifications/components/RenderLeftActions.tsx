import React from 'react';
import { whiteThemeColors } from '../../../Utilities';
import { _VectorIcons, _View } from '../../../components';
import { styles } from '../style';

const RenderLeftActions = () => {
  return (
    <_View style={styles.leftActionContainer}>
      <_VectorIcons
        type='FontAwesome5'
        name='trash-alt'
        color={whiteThemeColors.red}
        size={30}
      />
    </_View>
  );
};
export { RenderLeftActions };
