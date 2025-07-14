import { memo } from 'react';

import { _View, _VectorIcons, _Text } from 'components';
import { styles } from '../style';
import { whiteThemeColors } from 'utilities';

export const EmptyList = memo(() => (
  <_View style={styles.noDataContainer}>
    <_VectorIcons
      type={'SimpleLineIcons'}
      name={'notebook'}
      size={80}
      color={whiteThemeColors.primary + 70}
    />
    <_Text style={styles.noDataTxt}>{`No Student Found`}</_Text>
  </_View>
));
