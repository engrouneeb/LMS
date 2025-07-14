import { _Text, _View, _VectorIcons, _TextInput } from 'components';
import { FC } from 'react';
import { StyleSheet } from 'react-native';
import CommonStyles from 'screens/CommonStyles';
import { whiteThemeColors } from 'utilities';

interface SingleTextInputProps {
  icon: { type: string; name: string };
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  isSecured?: boolean;
  type?: string;
}

const SingleTextInput: FC<SingleTextInputProps> = ({
  icon,
  placeholder,
  value,
  onChangeText,
  isSecured = false,
}) => {
  return (
    <_View style={styles.container}>
      <_VectorIcons
        type={icon.type}
        name={icon.name}
        size={18}
        color={whiteThemeColors.primary}
        style={{ alignSelf: 'center' }}
      />
      <_TextInput
        secureTextEntry={isSecured}
        textContentType='oneTimeCode'
        autoCorrect={false}
        placeholder={placeholder}
        clearButtonMode='while-editing'
        value={value}
        onChangeText={(value) => onChangeText(value)}
        style={styles.textInp}
        textAlign={undefined}
      />
    </_View>
  );
};

export { SingleTextInput };

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: whiteThemeColors.white + 90,
    paddingHorizontal: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  textInp: {
    width: '80%',
    height: 40,
    flexGrow: 1,
    marginLeft: 10,
    marginRight: 5,
    fontFamily: CommonStyles.fonts.regular,
    fontSize: 12,
  },
});
