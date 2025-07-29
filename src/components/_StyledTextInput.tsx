import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleTextBoxProps } from '../interfaces';
import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { whiteThemeColors } from '../Utilities';
import { _VectorIcons, _View } from '.';
import CommonStyles from '../screens/CommonStyles';

export const _StyledTextInput: FC<StyleTextBoxProps> = (props) => {
  const [selectedLanguage, setselectedLanguage] = useState<string>('English');
  useEffect(() => {
    AsyncStorage.getItem('@LanguageSettings').then((res) => {
      if (res !== '' && res !== undefined && res !== null)
        setselectedLanguage(res);
    });
  }, [props]);

  return (
    <_View style={[styles.container]}>
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
            textAlign: selectedLanguage === 'English' ? 'left' : 'right',
            width: props.width,
            fontFamily: CommonStyles.fonts.universalAppFont1,
            height: 50,
          },
        ]}
      />
      {props.showEyeIcon && (
        <TouchableOpacity
          onPress={props.onChangeSecureTextEntry}
          style={styles.button}
        >
          <_VectorIcons
            type={'Ionicons'}
            name={
              props.secureTextEntry ? 'eye' : 'eye-off'
            }
            size={25}
            color={whiteThemeColors.white}
          />
        </TouchableOpacity>
      )}
    </_View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 50,
    flexDirection: 'row',
    borderColor: whiteThemeColors.greyDark,
    backgroundColor: whiteThemeColors.primary + 10,
    borderRadius: 8,
  },
  shadow: {
    shadowColor: whiteThemeColors.greyDark,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  button: {
    backgroundColor: whiteThemeColors.greyDark + 40,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 35,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});
