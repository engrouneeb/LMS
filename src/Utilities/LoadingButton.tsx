import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { _Text } from '../components';
import CommonStyles from '../screens/CommonStyles';
import { whiteThemeColors } from '../theme';
import { scale } from './';
import { isPortrait } from './';
import { Appstate } from 'reducers/Appstate';
import { loadingButtonInterface } from 'interfaces';
export const LoadingButton: React.FC<loadingButtonInterface> = ({
  isBlock,
  style,
  callback,
  btnText,
  submitting,
  rounded,
  fontSize,
}) => {
  const { submittButton } = useSelector((state: Appstate) => state.language);
  const [dynamicWidth, setWidth] = useState(isPortrait() ? '94%' : '50%');

  useEffect(() => {
    const subs = Dimensions.addEventListener('change', (results) => {
      if (results.window.height > results.window.width) {
        setWidth('94%');
      } else {
        setWidth('50%');
      }
    });
    return () => {
      subs.remove();
    };
  }, [dynamicWidth]);
  return (
    <TouchableOpacity
      disabled={isBlock}
      style={[
        style,
        {
          width: dynamicWidth,
          borderRadius: rounded ? 40 : 0,
        },
      ]}
      onPress={callback}
    >
      {!submitting ? (
        <ActivityIndicator
          size='small'
          style={{ paddingRight: scale(0.025) }}
          color={whiteThemeColors.white}
        />
      ) : null}
      <_Text
        style={[
          CommonStyles.BtnTxt,
          { paddingLeft: 0, fontSize: fontSize, color: 'white' },
        ]}
      >
        {!submitting ? submittButton.Submitting : `${btnText}`}
      </_Text>
    </TouchableOpacity>
  );
};
