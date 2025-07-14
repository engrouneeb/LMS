import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { _TextInput, _VectorIcons, _View } from '../../../../components';
import CommonStyles from 'screens/CommonStyles';

interface Props {
  value: number;
  setValue: (val: number) => void;
  placeholder: string;
  disabled: boolean;
}

const TextinptSpinner: FC<Props> = ({
  value,
  setValue,
  placeholder,
  disabled = false,
}) => {
  const onChange = (text: any) => {
    const re = /^[0-9\b]+$/;
    if (text === '' || re.test(text)) {
      setValue(text);
    }
  };
  return (
    <_View
      style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}
    >
      <_TextInput
        editable={!disabled}
        style={styles.inputText}
        placeholder={placeholder}
        value={value?.toString()}
        keyboardType='numeric'
        onChangeText={(text) => onChange(text)}
      />
      {!disabled && value >= 1 && (
        <_View style={{ marginRight: 20 }}>
          <TouchableOpacity
            disabled={disabled}
            onPress={() => setValue(+value + 1)}
          >
            <_VectorIcons
              type={'MaterialCommunityIcons'}
              name='arrow-up-drop-circle-outline'
              size={15}
              color={'gray'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={disabled}
            onPress={() => {
              value > 0 && setValue(+value - 1);
            }}
          >
            <_VectorIcons
              type={'MaterialCommunityIcons'}
              name='arrow-down-drop-circle-outline'
              size={15}
              color={'gray'}
            />
          </TouchableOpacity>
        </_View>
      )}
    </_View>
  );
};
export { TextinptSpinner };
const styles = StyleSheet.create({
  inputText: {
    fontSize: 12,
    fontFamily: CommonStyles.fonts.medium,
    flex: 1,
    marginTop: -2,
  },
});
