import { FC } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { whiteThemeColors } from '../../../../Utilities';
import {
  Title_DateTimePickerProps,
  _Text,
  _VectorIcons,
  _View,
} from '../../../../components';
import CommonStyles from '../../../CommonStyles';

export const Title_DateTimePicker: FC<Title_DateTimePickerProps> = ({
  title,
  value,
  handleOnPress,
  icon,
}) => {
  return (
    <_View width={'48%'}>
      <_Text style={styles.labelTxt}>{title}</_Text>
      <Pressable onPress={handleOnPress} style={styles.input}>
        <_Text onPress={handleOnPress} style={styles.dateTimeTxt}>
          {value}
        </_Text>
        <_View style={styles.iconContainer}>
          <_VectorIcons
            type={icon.type}
            name={icon.name}
            size={18}
            color={whiteThemeColors.white}
          />
        </_View>
      </Pressable>
    </_View>
  );
};

const styles = StyleSheet.create({
  labelTxt: {
    fontSize: 14,
    marginLeft: 5,
    color: whiteThemeColors.primaryTextColor,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  input: {
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    flexDirection: 'row',
    borderColor: whiteThemeColors.greyDark,
    backgroundColor: whiteThemeColors.makeupClass.inputBg,
    borderRadius: 8,
    marginBottom: 15,
  },
  dateTimeTxt: {
    flex: 1,
    fontSize: 12,
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.regular,
  },
  iconContainer: {
    width: 50,
    height: 45,
    backgroundColor: whiteThemeColors.primary + 40,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
  },
});
