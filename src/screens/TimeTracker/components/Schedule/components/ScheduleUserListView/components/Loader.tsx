import React from 'react';
import { _View } from '../../../../../../../components';
import CustomLoader from '../../../../../../Loader/loader';
import { whiteThemeColors } from 'utilities';

export const Loader = () => {
  return (
    <_View
      style={{
        height: '80%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 100,
      }}
    >
      <CustomLoader
        bgColor={whiteThemeColors.white}
        size={'large'}
        color={whiteThemeColors.primary}
      />
    </_View>
  );
};
