import AsyncStorage from '@react-native-async-storage/async-storage';
import { ButtonIntefaces } from 'interfaces';
import React, { FC, useEffect, useState } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { scale, whiteThemeColors } from 'utilities';
import { _ActivityIndicator } from '../screens/Loader';
import { isPortrait } from './Portrait';
import { _Text } from './_Text';
import { Appstate } from '../reducers/Appstate';
export const _Button: FC<ButtonIntefaces> = (props) => {
  const { submittButton } = useSelector((state: Appstate) => state.language);
  const [dynamicWidth, setWidth] = useState(isPortrait() ? '94%' : '50%');
  const [selectedLanguage, setselectedLanguage] = useState('English');

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', (results) => {
      if (results.window.height > results.window.width) {
        setWidth('94%');
      } else {
        setWidth('50%');
      }
    });
    return () => subscription?.remove();
  }, [dynamicWidth]);
  useEffect(() => {
    AsyncStorage.getItem('@LanguageSettings').then((res) => {
      if (res !== '' && res !== undefined && res !== null) {
        setselectedLanguage(res);
      }
    });
  }, [props]);

  return (
    <TouchableOpacity
      disabled={props.isBlock}
      activeOpacity={0.8}
      style={[
        props.style,
        {
          width: props.width ? props.width : dynamicWidth,
          flexDirection: !props.submitting ? 'row' : 'column',
          borderRadius: props.borderRadius ? props.borderRadius : 0,
        },
      ]}
      onPress={props.callback}
    >
      <_Text
        {...props}
        style={props.BtnTxt}
        textAlign={selectedLanguage === 'English' ? 'left' : 'right'}
      >
        {!props.submitting ? submittButton.Submitting : `${props.btnText}`}
      </_Text>
      {!props.submitting ? (
        <_ActivityIndicator
          size='small'
          style={{ paddingLeft: scale(0.025) }}
          color={props.loaderColor || whiteThemeColors.white}
          showText={false}
        />
      ) : null}
    </TouchableOpacity>
  );
};
