import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, FC } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import CommonStyles from 'screens/CommonStyles';

interface TextInputInterfaces extends TextInputProps {
  width?: string | number;
}
export const _TextInput: FC<TextInputInterfaces> = (props) => {
  const [selectedLanguage, setselectedLanguage] = useState<string>('English');
  useEffect(() => {
    AsyncStorage.getItem('@LanguageSettings').then((res) => {
      if (res !== '' && res !== undefined && res !== null)
        setselectedLanguage(res);
    });
  }, [props]);

  return (
    <TextInput
      {...props}
      placeholder={props.placeholder}
      value={props.value}
      placeholderTextColor={
        props.placeholderTextColor ? props.placeholderTextColor : 'grey'
      }
      style={[
        props.style,
        {
          paddingBottom: 0,
          textAlign: selectedLanguage === 'English' ? 'left' : 'right',
          width: props.width,
          fontFamily: CommonStyles.fonts.regular,
        },
      ]}
    />
  );
};
